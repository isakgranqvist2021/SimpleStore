import { Resend } from 'resend';

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
