import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'reCAPTCHA token is required'
    })
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    const response = await fetch(verificationUrl, { method: 'POST' });
    const data = await response.json();

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data);
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed',
        details: data['error-codes']
      });
    }

    return res.status(200).json({
      success: true,
      score: data.score,
      action: data.action
    });

  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}