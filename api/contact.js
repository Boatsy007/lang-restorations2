import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service || 'Not selected');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

    const brandHeader = `
      <div style="text-align:center;padding:28px 0 34px;">
        <div style="display:inline-block;border:2px solid #ffffff;border-radius:999px;padding:24px 20px;">
          <div style="color:#ffffff;font-size:16px;font-weight:900;letter-spacing:1px;text-transform:uppercase;">
            Lang Restorations
          </div>
          <div style="color:#dc2626;font-size:9px;font-weight:800;letter-spacing:3px;text-transform:uppercase;margin-top:6px;">
            Restore · Revive · Ride
          </div>
        </div>
      </div>
    `;

    const footer = `
      <div style="padding:26px 8px;text-align:center;">
        <p style="margin:0 0 8px;color:#ffffff;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:2px;">
          Lang Restorations
        </p>
        <p style="margin:0;color:#777;font-size:12px;line-height:1.7;">
          Traralgon, Victoria<br>
          info@langrestorations.com<br>
          Premium motorcycle restorations
        </p>
      </div>
    `;

    await resend.emails.send({
      from: 'Lang Restorations <info@langrestorations.com>',
      to: ['info@langrestorations.com'],
      replyTo: email,
      subject: `New Website Enquiry from ${safeName}`,
      html: `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:720px;margin:0 auto;padding:30px 18px;">
            ${brandHeader}

            <div style="border:1px solid #242424;background:#0a0a0a;padding:38px 34px;box-shadow:0 20px 60px rgba(0,0,0,0.45);">
              <p style="margin:0 0 12px;color:#dc2626;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
                New website enquiry
              </p>

              <h1 style="margin:0 0 20px;color:#ffffff;font-size:36px;line-height:1.05;font-weight:900;text-transform:uppercase;">
                ${safeName}
              </h1>

              <div style="height:2px;width:76px;background:#dc2626;margin:0 0 30px;"></div>

              <table style="width:100%;border-collapse:collapse;margin-bottom:30px;">
                <tr>
                  <td style="padding:15px 0;border-bottom:1px solid #222;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;width:140px;">Name</td>
                  <td style="padding:15px 0;border-bottom:1px solid #222;color:#ffffff;font-size:15px;font-weight:700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:15px 0;border-bottom:1px solid #222;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Email</td>
                  <td style="padding:15px 0;border-bottom:1px solid #222;color:#ffffff;font-size:15px;font-weight:700;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding:15px 0;border-bottom:1px solid #222;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Service</td>
                  <td style="padding:15px 0;border-bottom:1px solid #222;color:#ffffff;font-size:15px;font-weight:700;">${safeService}</td>
                </tr>
              </table>

              <p style="margin:0 0 12px;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
                Customer message
              </p>

              <div style="background:#111;border:1px solid #262626;padding:22px;color:#d4d4d4;font-size:15px;line-height:1.75;">
                ${safeMessage}
              </div>

              <div style="margin-top:30px;background:#160707;border-left:4px solid #dc2626;padding:18px 20px;">
                <p style="margin:0;color:#ffffff;font-size:14px;line-height:1.6;">
                  Reply directly to this email to respond to the customer.
                </p>
              </div>
            </div>

            ${footer}
          </div>
        </div>
      `
    });

    await resend.emails.send({
      from: 'Lang Restorations <info@langrestorations.com>',
      to: [email],
      replyTo: 'info@langrestorations.com',
      subject: 'We received your enquiry — Lang Restorations',
      html: `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:720px;margin:0 auto;padding:30px 18px;">
            ${brandHeader}

            <div style="border:1px solid #242424;background:#0a0a0a;padding:40px 34px;box-shadow:0 20px 60px rgba(0,0,0,0.45);">
              <p style="margin:0 0 12px;color:#dc2626;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
                Enquiry received
              </p>

              <h1 style="margin:0 0 22px;color:#ffffff;font-size:36px;line-height:1.05;font-weight:900;text-transform:uppercase;">
                Thanks for getting in touch, ${safeName}.
              </h1>

              <div style="height:2px;width:76px;background:#dc2626;margin:0 0 30px;"></div>

              <p style="margin:0 0 18px;color:#d4d4d4;font-size:16px;line-height:1.75;">
                Your enquiry has been received. We’ll review the details and get back to you shortly.
              </p>

              <p style="margin:0 0 30px;color:#a3a3a3;font-size:15px;line-height:1.75;">
                Lang Restorations specialises in proper vintage, classic and motocross restorations. No shortcuts. No cheap work. Just quality builds done right.
              </p>

              <div style="background:#111;border:1px solid #262626;padding:24px;margin:0 0 30px;">
                <p style="margin:0 0 16px;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
                  Your enquiry summary
                </p>

                <p style="margin:0 0 12px;color:#ffffff;font-size:15px;">
                  <strong>Service:</strong> ${safeService}
                </p>

                <p style="margin:18px 0 10px;color:#ffffff;font-size:15px;">
                  <strong>Your message:</strong>
                </p>

                <p style="margin:0;color:#cfcfcf;font-size:14px;line-height:1.75;">
                  ${safeMessage}
                </p>
              </div>

              <a
                href="https://www.langrestorations.com"
                style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:16px 26px;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;"
              >
                Visit Website
              </a>

              <p style="margin:30px 0 0;color:#777;font-size:13px;line-height:1.7;">
                Need to add more detail? Just reply to this email.
              </p>
            </div>

            ${footer}
          </div>
        </div>
      `
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to send enquiry' });
  }
}
