module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { full_name, email, company, topic, form_type } = req.body || {};

  if (!full_name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  console.log('Contact form submission:', {
    form_type: form_type || 'book_call',
    full_name,
    email,
    company: company || null,
    topic: topic || null,
    timestamp: new Date().toISOString()
  });

  return res.status(201).json({
    success: true,
    message: 'Thank you! We will be in touch within one business day.'
  });
};
