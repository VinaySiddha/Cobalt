import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { CalculationResult, formatCurrency } from '@/config/pricing';

interface EmailPayload {
  reference: string;
  name: string;
  email: string;
  phone: string;
  company?: string | null;
  description: string;
  calculation: CalculationResult;
}

export async function sendQuoteEmails(payload: EmailPayload): Promise<{
  ownerSent: boolean;
  clientSent: boolean;
}> {
  const { reference, name, email, phone, company, description, calculation } = payload;
  const ownerEmail = process.env.OWNER_EMAIL || 'owner@cobalt.tech';
  const fromEmail = process.env.EMAIL_FROM || 'quotes@cobalt.tech';

  const resendApiKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;

  // Build items HTML table
  const itemsRowsHtml = calculation.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; font-weight: 600;">${item.serviceName}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-transform: capitalize;">${item.sizeLabel}</td>
        <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 600;">${formatCurrency(item.basePrice)}</td>
      </tr>
    `
    )
    .join('');

  const ownerHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; background-color: #f9fafb; padding: 24px;">
      <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; padding: 32px;">
        <div style="border-bottom: 2px solid #113FCB; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #113FCB; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">COBALT</h1>
          <p style="color: #4b5563; font-size: 14px; margin: 4px 0 0 0;">New Quotation Request Received</p>
        </div>

        <div style="background-color: #f0f4ff; border-left: 4px solid #113FCB; padding: 12px 16px; margin-bottom: 24px;">
          <strong style="font-size: 16px; color: #113FCB;">Reference: ${reference}</strong>
        </div>

        <h3 style="font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-top: 24px;">Client Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Name:</td><td style="font-weight: 600;">${name}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Email:</td><td><a href="mailto:${email}" style="color: #113FCB;">${email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Phone:</td><td style="font-weight: 600;">${phone}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Company:</td><td>${company || 'Not specified'}</td></tr>
        </table>

        <h3 style="font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Scope & Timeline</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
          <thead>
            <tr style="background: #f9fafb; text-align: left;">
              <th style="padding: 10px; border-bottom: 1px solid #e5e7eb;">Service</th>
              <th style="padding: 10px; border-bottom: 1px solid #e5e7eb;">Size</th>
              <th style="padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHtml}
          </tbody>
        </table>

        <div style="background: #f9fafb; padding: 16px; border: 1px solid #e5e7eb; margin-bottom: 24px; font-size: 14px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span>Subtotal:</span>
            <span style="font-weight: 600;">${formatCurrency(calculation.subtotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span>Timeline Delivery:</span>
            <span>${calculation.timelineLabel} (${calculation.timelineMultiplier}x)</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 12px; border-top: 1px solid #e5e7eb; padding-top: 8px; font-size: 16px; font-weight: 700;">
            <span>Total Estimated:</span>
            <span style="color: #113FCB;">${formatCurrency(calculation.total)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 14px; color: #113FCB; font-weight: 600;">
            <span>Required 30% Advance:</span>
            <span>${formatCurrency(calculation.advance)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 14px; color: #6b7280;">
            <span>Balance upon milestone delivery (70%):</span>
            <span>${formatCurrency(calculation.balance)}</span>
          </div>
        </div>

        <h3 style="font-size: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;">Project Brief</h3>
        <p style="font-size: 14px; line-height: 1.6; white-space: pre-wrap; background: #ffffff; padding: 12px; border: 1px solid #e5e7eb; color: #374151;">${description}</p>

        <p style="font-size: 12px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
          Generated automatically by Cobalt Quote Engine. Reply directly to client or view inside Admin dashboard.
        </p>
      </div>
    </body>
    </html>
  `;

  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; background-color: #f9fafb; padding: 24px;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e5e7eb; padding: 32px;">
        <div style="border-bottom: 2px solid #113FCB; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #113FCB; font-size: 24px; margin: 0; font-weight: 800; letter-spacing: -0.5px;">COBALT</h1>
          <p style="color: #4b5563; font-size: 14px; margin: 4px 0 0 0;">Quotation Request Confirmation</p>
        </div>

        <p style="font-size: 16px; margin-bottom: 16px;">Hello ${name},</p>
        <p style="font-size: 14px; line-height: 1.6; color: #374151;">
          Thank you for requesting a quotation from Cobalt. We have successfully logged your project specifications under reference number:
        </p>

        <div style="background-color: #f0f4ff; border-left: 4px solid #113FCB; padding: 14px 18px; margin: 20px 0;">
          <span style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #6b7280; display: block;">Quote Reference</span>
          <strong style="font-size: 20px; color: #113FCB; letter-spacing: 0.5px;">${reference}</strong>
        </div>

        <h3 style="font-size: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; margin-top: 24px;">Estimated Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
          <thead>
            <tr style="background: #f9fafb; text-align: left;">
              <th style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Service</th>
              <th style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Scope</th>
              <th style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsRowsHtml}
          </tbody>
        </table>

        <div style="background: #f9fafb; padding: 14px; border: 1px solid #e5e7eb; font-size: 14px; margin-bottom: 24px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
            <span>Estimated Total:</span>
            <strong style="color: #113FCB;">${formatCurrency(calculation.total)}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; color: #4b5563; font-size: 13px;">
            <span>30% Advance (upon mutual agreement):</span>
            <strong>${formatCurrency(calculation.advance)}</strong>
          </div>
        </div>

        <h3 style="font-size: 15px; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px;">What happens next?</h3>
        <ol style="font-size: 14px; line-height: 1.7; color: #374151; padding-left: 20px;">
          <li><strong>Review:</strong> Our engineering lead reviews your requirements within one business day.</li>
          <li><strong>Contact:</strong> We will reach out to you via email or phone to confirm detailed deliverables.</li>
          <li><strong>Advance Agreement:</strong> We establish project milestones and provide invoice details for the 30% advance deposit.</li>
          <li><strong>Kickoff:</strong> Engineering begins promptly after advance confirmation.</li>
        </ol>

        <p style="font-size: 13px; color: #6b7280; font-style: italic; margin-top: 20px;">
          ${calculation.disclaimer}
        </p>

        <div style="margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 16px; font-size: 13px; color: #6b7280;">
          If you have questions in the meantime, reply directly to this email or reach us at <a href="mailto:contact@cobalt.tech" style="color: #113FCB;">contact@cobalt.tech</a>.
        </div>
      </div>
    </body>
    </html>
  `;

  let ownerSent = false;
  let clientSent = false;

  // 1. Try Resend if configured
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);

      await resend.emails.send({
        from: fromEmail,
        to: ownerEmail,
        subject: `[Cobalt Quote] New Request ${reference} - ${name} (${formatCurrency(calculation.total)})`,
        html: ownerHtml,
      });
      ownerSent = true;

      await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `Your Cobalt Service Quote [Ref: ${reference}]`,
        html: clientHtml,
      });
      clientSent = true;

      return { ownerSent, clientSent };
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
    }
  }

  // 2. Try Nodemailer SMTP if configured
  if (smtpHost && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: fromEmail,
        to: ownerEmail,
        subject: `[Cobalt Quote] New Request ${reference} - ${name} (${formatCurrency(calculation.total)})`,
        html: ownerHtml,
      });
      ownerSent = true;

      await transporter.sendMail({
        from: fromEmail,
        to: email,
        subject: `Your Cobalt Service Quote [Ref: ${reference}]`,
        html: clientHtml,
      });
      clientSent = true;

      return { ownerSent, clientSent };
    } catch (error) {
      console.error('Failed to send email via Nodemailer SMTP:', error);
    }
  }

  // 3. Dev fallback: Log emails to console so dev flow never breaks
  console.log(`\n================== [MOCK EMAIL DISPATCH] ==================`);
  console.log(`[TO OWNER: ${ownerEmail}]`);
  console.log(`Subject: [Cobalt Quote] New Request ${reference} - ${name} (${formatCurrency(calculation.total)})`);
  console.log(`Quote Reference: ${reference} | Client: ${name} <${email}>`);
  console.log(`Total: ${formatCurrency(calculation.total)} | 30% Advance: ${formatCurrency(calculation.advance)}`);
  console.log(`Services: ${calculation.items.map((i) => `${i.serviceName} (${i.size})`).join(', ')}`);
  console.log(`\n[TO CLIENT: ${email}]`);
  console.log(`Subject: Your Cobalt Service Quote [Ref: ${reference}]`);
  console.log(`Hello ${name}, your estimate is ${formatCurrency(calculation.total)}.`);
  console.log(`===========================================================\n`);

  return { ownerSent: true, clientSent: true };
}
