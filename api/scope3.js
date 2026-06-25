module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });
  const { fileData, mimeType } = req.body || {};
  if (!fileData || !mimeType) return res.status(400).json({ error: 'fileData and mimeType required' });
  const content = [];
  if (mimeType === 'application/pdf') {
    content.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: fileData } });
  } else {
    content.push({ type: 'image', source: { type: 'base64', media_type: mimeType, data: fileData } });
  }
  content.push({ type: 'text', text: `Analyse this supplier document. Extract carbon-relevant data. Return ONLY valid JSON:\n{"extracted":{"company_name":null,"country":null,"industry":null,"reporting_period":null,"electricity_kwh":null,"fuel_type":null,"fuel_quantity":null,"production_volume":null,"product_type":null,"existing_emissions_data":null},"confidence":"HIGH","confidence_reason":"reason","data_gaps":[],"summary":"2-3 sentence summary","methodology_note":"activity-based, spend-based, or hybrid"}` });
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json', 'HTTP-Referer': 'https://bholi-pi.vercel.app', 'X-Title': 'TCA Scope 3' },
      body: JSON.stringify({ model: 'anthropic/claude-sonnet-4-5', max_tokens: 1500, messages: [{ role: 'user', content }] })
    });
    if (!r.ok) return res.status(502).json({ error: 'AI service error' });
    const d = await r.json();
    const raw = d?.choices?.[0]?.message?.content || '';
    const clean = raw.replace(/^```json\s*/i,'').replace(/^```\s*/i,'').replace(/```\s*$/i,'').trim();
    return res.status(200).json(JSON.parse(clean));
  } catch(e) {
    return res.status(500).json({ error: e.message });
  }
};
