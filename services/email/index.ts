import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(
  email: string,
  options: { subject: string; html: string },
) {
  return resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    ...options,
  });
}

export async function sendOrderSuccessfulEmail(email: string) {
  return await sendEmail(email, {
    subject: 'Good news — your order was successful 🎉',
    html: `Your order was successful!`,
  });
}
