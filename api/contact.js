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

    await resend.emails.send({
      from: 'Lang Restorations <noreply@langrestorations.com>',
      to: ['info@langrestorations.com'],
      replyTo: email,
      subject: `New Build Enquiry | ${safeName}`,
      html: `
        <div style="margin:0;padding:0;background:#050505;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
          <div style="max-width:720px;margin:0 auto;padding:30px 18px;">
            <div style="background:#0a0a0a;border:1px solid #242424;overflow:hidden;">
              
              <div style="background:#000000;text-align:center;padding:30px 20px;border-bottom:3px solid #dc2626;">
                <div style="color:#ffffff;font-size:22px;font-weight:900;text-transform:uppercase;letter-spacing:4px;margin-bottom:18px;">
                  Lang Restorations
                </div>
                <div style="height:2px;width:70px;background:#dc2626;margin:0 auto 20px;"></div>
                <div style="color:#ffffff;font-size:34px;font-weight:900;font-style:italic;line-height:0.95;text-transform:uppercase;letter-spacing:-1px;">
                  RESTORE<span style="color:#dc2626;">.</span><br>
                  REVIVE<span style="color:#dc2626;">.</span><br>
                  RIDE<span style="color:#dc2626;">.</span>
                </div>
              </div>

              <div style="padding:38px 32px;">
                <p style="margin:0 0 12px;color:#dc2626;font-size:11px;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
                  New website enquiry
                </p>

                <h1 style="margin:0 0 20px;color:#ffffff;font-size:34px;line-height:1.05;font-weight:900;text-transform:uppercase;">
                  ${safeName}
                </h1>

                <div style="height:2px;width:76px;background:#dc2626;margin:0 0 28px;"></div>

                <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
                  <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #222;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;width:140px;">Name</td>
                    <td style="padding:14px 0;border-bottom:1px solid #222;color:#ffffff;font-size:15px;font-weight:700;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #222;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Email</td>
                    <td style="padding:14px 0;border-bottom:1px solid #222;color:#ffffff;font-size:15px;font-weight:700;">${safeEmail}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 0;border-bottom:1px solid #222;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">Service</td>
                    <td style="padding:14px 0;border-bottom:1px solid #222;color:#ffffff;font-size:15px;font-weight:700;">${safeService}</td>
                  </tr>
                </table>

                <p style="margin:0 0 12px;color:#777;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;">
                  Customer message
                </p>

                <div style="background:#111111;border:1px solid #262626;padding:22px;color:#d4d4d4;font-size:15px;line-height:1.75;">
                  ${safeMessage}
                </div>

                <div style="margin-top:28px;background:#160707;border-left:4px solid #dc2626;padding:18px 20px;">
                  <p style="margin:0;color:#ffffff;font-size:14px;line-height:1.6;">
                    Reply directly to this email to respond to the customer.
                  </p>
                </div>
              </div>

              <div style="padding:26px 20px;text-align:center;background:#050505;border-top:1px solid #1f1f1f;">
                <p style="margin:0 0 8px;color:#ffffff;font-size:13px;font-weight:900;text-transform:uppercase;letter-spacing:2px;">
                  Lang Restorations
                </p>
                <p style="margin:0;color:#777777;font-size:12px;line-height:1.7;">
                  Traralgon, Victoria<br>
                  info@langrestorations.com<br>
                  Premium motorcycle restorations
                </p>
              </div>

            </div>
          </div>
        </div>
      `
    });

    await resend.emails.send({
      from: 'Lang Restorations <noreply@langrestorations.com>',
      to: [email],
      replyTo: 'info@langrestorations.com',
      subject: 'Lang Restorations | Enquiry Received',
      html: `
        <div style="margin:0;padding:20px;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
          <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e5e5;padding:40px;">

            <p style="margin:0 0 8px;color:#dc2626;font-size:11px;font-weight:900;letter-spacing:3px;text-transform:uppercase;">
              LANG RESTORATIONS
            </p>

            <h1 style="margin:0;color:#111111;font-size:42px;line-height:0.95;font-weight:900;font-style:italic;text-transform:uppercase;">
              Restore<span style="color:#dc2626;">.</span><br>
              Revive<span style="color:#dc2626;">.</span><br>
              Ride<span style="color:#dc2626;">.</span>
            </h1>

            <div style="height:2px;width:70px;background:#dc2626;margin:24px 0;"></div>

            <h2 style="margin:0 0 18px;color:#111111;font-size:28px;font-weight:900;">
              Thanks, ${safeName}
            </h2>

            <p style="margin:0 0 20px;color:#444444;font-size:16px;line-height:1.7;">
              We've received your enquiry and will review the details shortly.
            </p>

            <div style="background:#f7f7f7;border-left:4px solid #dc2626;padding:18px;margin-bottom:30px;">
              <p style="margin:0;color:#111111;font-size:14px;line-height:1.6;">
                <strong>Service:</strong> ${safeService}
              </p>
            </div>

            <a
              href="https://www.langrestorations.com"
              style="display:inline-block;background:#dc2626;color:#ffffff;text-decoration:none;padding:16px 28px;font-size:12px;font-weight:900;letter-spacing:2px;text-transform:uppercase;"
            >
              View Builds →
            </a>

            <div style="margin-top:35px;padding-top:25px;border-top:1px solid #eeeeee;">
              <p style="margin:0;color:#777777;font-size:13px;line-height:1.8;">
                Lang Restorations<br>
                Traralgon, Victoria<br>
                info@langrestorations.com
              </p>
            </div>

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
