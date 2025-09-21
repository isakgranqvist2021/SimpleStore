import { storeConfig } from 'config/store-config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(
  email: string,
  options: { subject: string; html: string },
) {
  return resend.emails.send({
    from: 'updates@granqvist.dev',
    to: [email],
    ...options,
  });
}

export async function sendOrderSuccessfulEmail(email: string) {
  return await sendEmail(email, {
    subject: 'Your order was successful – thank you for shopping with us!',
    html: `
      <p>Hi there,</p>

      <p>Good news — your order has been successfully placed! 🎉</p>

      <p>
        Thank you for your purchase. We’re preparing your items and will keep you
        updated every step of the way.
      </p>

      <p>
        <strong>Order updates</strong> — You’ll receive notifications by email as
        soon as your order is processed and when it’s on its way to you.
      </p>

      <p>If you have any questions, simply send your question to ${storeConfig.contactEmail} and we’ll be happy to help.</p>

      <p>Best regards,<br/>
      ${storeConfig.name}</p>
    `,
  });
}
