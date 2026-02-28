import Mailgun from "mailgun.js";
import FormData from "form-data";

function getMailgunClient() {
  const mailgun = new Mailgun(FormData);
  return mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "",
  });
}

const FROM = process.env.EMAIL_FROM || "noreply@hexonasystems.com";
const DOMAIN = process.env.MAILGUN_DOMAIN || "hexonasystems.com";

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await getMailgunClient().messages.create(DOMAIN, {
    from: FROM,
    to: [email],
    subject: "Reset your Hexona GPT password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #00C4CC; margin-bottom: 16px;">Password Reset</h2>
        <p style="color: #333; line-height: 1.6;">
          You requested a password reset for your Hexona GPT account. Click the button below to set a new password.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #00C4CC, #0095A8); color: #0D1117; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 24px 0;">
          Reset Password
        </a>
        <p style="color: #666; font-size: 14px;">
          This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  await getMailgunClient().messages.create(DOMAIN, {
    from: FROM,
    to: [email],
    subject: "Welcome to Hexona GPT",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <h2 style="color: #00C4CC; margin-bottom: 16px;">Welcome, ${name || "there"}!</h2>
        <p style="color: #333; line-height: 1.6;">
          Your Hexona GPT account is ready. You now have access to a full suite of AI tools designed to help you run, grow, and scale your automation agency.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display: inline-block; background: linear-gradient(135deg, #00C4CC, #0095A8); color: #0D1117; font-weight: 600; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin: 24px 0;">
          Go to Dashboard
        </a>
      </div>
    `,
  });
}
