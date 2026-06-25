function extractTextFromPDFBase64(base64Data) {
  try {
    const buffer = Buffer.from(base64Data, 'base64');
    const pdfString = buffer.toString('latin1');
    const textParts = [];
    const btRegex = /BT([\s\S]*?)ET/g;
    let match;
    while ((match = btRegex.exec(pdfString)) !== null) {
      const btContent = match[1];
      const tjRegex = /\(([^)]{1,500})\)\s*(?:Tj|TJ|'|")/g;
      let tjMatch;
      while ((tjMatch = tjRegex.exec(btContent)) !== null) {
        const text = tjMatch[1].replace(/\\n/g,'\n').replace(/\\t/g,' ').trim();
        if (text.length > 1) textParts.push(text);
      }
    }
    const streamRegex = /stream([\s\S]*?)endstream/g;
    while ((match = streamRegex.exec(pdfString)) !== null) {
      const textRegex = /\(([^)]{2,200})\)/g;
      let tMatch;
      while ((tMatch = textRegex.exec(match[1])) !== null) {
        const text = tMatch[1].replace(/\\n/g,'\n').trim();
        if (text.length > 2) textParts.push(text);
      }
    }
    return [...new Set(textParts)].join(' ').substring(0, 8000);
  } catch(e) { return ''; }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  const { fileData, mimeType, model } = req.body || {};
  if (!fileData || !mimeType) return res.status(400).json({ error: 'fileData and mimeType required' });

  const allowed = ['application/pdf','image/jpeg','image/jpg','image/png'];
  if (!allowed.includes(mimeType)) return res.status(400).json({ error: 'Unsupported file type' });

  // Model selection — frontend passes model string, fallback to free default
  const MODELS = {
    'qwen-free':    'qwen/qwen2.5-vl-72b-instruct:free',
    'llama-free':   'meta-llama/llama-3.2-11b-vision-instruct:free',
    'gemini-flash': 'google/gemini-2.0-flash-001',
    'claude':       'anthropic/claude-sonnet-4-5'
  };
  const selectedModel = MODELS[model] || MODELS['qwen-free'];

  const prompt = `You are an expert carbon accounting analyst specialising in Scope 3 supply chain emissions for ASEAN manufacturing suppliers.

Analyse this supplier document carefully and extract every carbon-relevant data point you can find. Look for electricity consumption (kWh), fuel types and quantities, production volumes, company name, country, reporting period, and any stated emissions figures.

Return ONLY valid JSON with no markdown and no text outside the JSON:

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
  "confidence_reason": "one sentence explaining confidence level",
  "data_gaps": ["list", "of", "missing", "fields"],
  "summary": "2-3 sentence professional summary of findings for Scope 3 calculation",
  "methodology_note": "activity-based, spend-based, or hybrid and why"
}

Confidence: HIGH = direct energy or fuel consumption data found. MEDIUM = production volumes found but no energy data. LOW = only company or country found.`;

  try {
    const messageContent = [];

    if (mimeType === 'application/pdf') {
      const extractedText = extractTextFromPDFBase64(fileData);
      const docText = extractedText.length > 50
        ? `SUPPLIER DOCUMENT (extracted from PDF):\n\n${extractedText}\n\n${prompt}`
        : `Analyse this supplier document for carbon data.\n\n${prompt}`;
      messageContent.push({ type: 'text', text: docText });
    } else {
      messageContent.push({ type: 'image', source: { type: 'base64', media_type: mimeType, data: fileData } });
      messageContent.push({ type: 'text', text: prompt });
    }

    const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bholi-pi.vercel.app',
        'X-Title': 'TCA Scope 3 Engine'
      },
      body: JSON.stringify({
        model: selectedModel,
        max_tokens: 1500,
        messages: [{ role: 'user', content: messageContent }]
      })
    });

    if (!orRes.ok) {
      const errText = await orRes.text();
      console.error('OpenRouter error:', orRes.status, errText);
      return res.status(502).json({ error: 'AI service error. Try again.' });
    }

    const orData = await orRes.json();
    const raw = orData?.choices?.[0]?.message?.content;
    if (!raw) return res.status(502).json({ error: 'No AI response. Try again.' });

    const clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/```\s*$/i,'').trim();
    let parsed;
    try {
      parsed = JSON.parse(clean);
    } catch(e) {
      console.error('Parse error:', e.message);
      return res.status(200).json({
        extracted: {},
        confidence: 'LOW',
        confidence_reason: 'Could not parse structured data',
        data_gaps: ['all fields'],
        summary: raw,
        methodology_note: 'Manual review required'
      });
    }

    return res.status(200).json({ ...parsed, model_used: selectedModel });

  } catch(err) {
    console.error('scope3 error:', err.message);
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
};
