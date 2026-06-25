module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { fileData, mimeType } = req.body || {};
  if (!fileData || !mimeType) {
    return res.status(400).json({ error: 'fileData and mimeType required' });
  }

  const allowed = ['application/pdf','image/jpeg','image/jpg','image/png'];
  if (!allowed.includes(mimeType)) {
    return res.status(400).json({ error: 'Unsupported file type' });
  }

  const prompt = `You are a carbon accounting analyst for ASEAN supply chains.
Analyse this supplier document and extract carbon-relevant data.
The document may be in any language — analyse it regardless.

Return ONLY valid JSON, no markdown, no explanation:

{
  "extracted": {
    "company_name": "value or null",
    "country": "value or null",
    "industry": "value or null",
    "reporting_period": "value or null",
    "electricity_kwh": "value with unit or null",
    "fuel_type": "value or null",
    "fuel_quantity": "value with unit or null",
    "production_volume": "value with unit or null",
    "product_type": "value or null",
    "existing_emissions_data": "value or null"
  },
  "confidence": "HIGH or MEDIUM or LOW",
  "confidence_reason": "one sentence",
  "data_gaps": ["missing", "fields"],
  "summary": "2-3 sentence summary of findings for Scope 3 calculation",
  "methodology_note": "activity-based, spend-based, or hybrid — and why"
}

Confidence: HIGH = energy/fuel data found. MEDIUM = production volumes only. LOW = company/country only.`;

  try {
    const content = [];
    if (mimeType === 'application/pdf') {
      content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: fileData } });
    } else {
      content.push({ type: 'image', source: { type: 'base64', media_type: mimeType, data: fileData } });
    }
    content.push({ type: 'text', text: prompt });

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bholi-pi.vercel.app',
        'X-Title': 'TCA Scope 3 Engine'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4-5',
        max_tokens: 1500,
        messages: [{ role: 'user', content }]
      })
    });

    if (!orRes.ok) {
      const t = await orRes.text();
      console.error('OpenRouter error:', orRes.status, t);
      return res.status(502).json({ error: 'AI service error. Try again.' });
    }

    const orData = await orRes.json();
    const raw = orData?.choices?.[0]?.message?.content;
    if (!raw) return res.status(502).json({ error: 'No AI response. Try again.' });

    let parsed;
    try {
      const clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/```\s*$/i,'').trim();
      parsed = JSON.parse(clean);
    } catch(e) {
      console.error('Parse error:', e.message, 'Raw:', raw);
      return res.status(200).json({
        extracted: {},
        confidence: 'LOW',
        confidence_reason: 'Could not parse structured data',
        data_gaps: ['all fields'],
        summary: raw,
        methodology_note: 'Manual review required'
      });
    }

    return res.status(200).json(parsed);

  } catch(err) {
    console.error('scope3 error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
