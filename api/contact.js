import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    await resend.emails.send({
      from: 'Lang Restorations <info@langrestorations.com>',
      to: ['info@langrestorations.com'],
      replyTo: email,
      subject: `New Website Enquiry from ${name}`,
      html: `
        <h2>New Lang Restorations Enquiry</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || 'Not selected'}</p>

        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    await resend.emails.send({
      from: 'Lang Restorations <onboarding@resend.dev>',
      to: [email],
      subject: 'Thanks for your enquiry — Lang Restorations',
      html: `
        <h2>Thanks for getting in touch, ${name}.</h2>

        <p>We’ve received your enquiry and will review the details shortly.</p>

        <p><strong>Service requested:</strong> ${service || 'Not selected'}</p>

        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>

        <br>

        <p>Lang Restorations</p>
        <p>Traralgon, Victoria</p>
        <p>info@langrestorations.com</p>
      `
    });

    return res.status(200).json({
      success: true
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Failed to send enquiry'
    });
  }
}
