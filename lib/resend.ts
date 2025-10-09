import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(
  email: string,
  options: { subject: string; html: string },
) {
  return resend.emails.send({
    from: 'updates@granqvist.dev',
    to: [email],
    ...options,
  });
}
