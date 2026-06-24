export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fileData, mimeType, fileName } = req.body;

  if (!fileData || !mimeType) {
    return res.status(400).json({ error: 'Missing file data' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Build content array — text + image/document
  const userContent = [];

  if (mimeType === 'application/pdf' || mimeType.startsWith('image/')) {
    userContent.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: mimeType,
        data: fileData
      }
    });
  }

  userContent.push({
    type: 'text',
    text: `You are a Scope 3 carbon emissions analyst. Analyse this supplier document carefully.

Extract ALL of the following if present:
- Supplier name
- Document type (invoice / utility bill / delivery note / other)
- Reporting period or date
- Electricity consumption (kWh)
- Fuel type and consumption (litres / m3 / kg)
- Distance travelled (km) and transport mode
- Weight of goods shipped (kg / tonnes)
- Production volume or units
- Country or region of supplier
- Any stated emissions figures (tCO2e)

Return your response as a JSON object with two fields:
1. "extracted": an object with snake_case keys for each data point found (use null for not found)
2. "summary": a 2-3 sentence plain English summary of what this document tells us about the supplier's carbon footprint

Return ONLY valid JSON. No markdown, no explanation outside the JSON.`
  });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bholi-pi.vercel.app',
        'X-Title': 'Climate Architects Scope 3 Engine'
      },
      body: JSON.stringify({
        model: 'anthropic/claude-sonnet-4-5',
        max_tokens: 1000,
        messages: [{ role: 'user', content: userContent }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data.error?.message || 'OpenRouter API error' });
    }

    const rawText = data.choices?.[0]?.message?.content || '';

    // Safely parse JSON response
    let parsed;
    try {
      const clean = rawText.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      parsed = { extracted: {}, summary: rawText };
    }

    return res.status(200).json(parsed);

  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
