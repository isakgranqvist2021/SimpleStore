import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import type { PageProps } from 'types/page';
import { getPageTitle, storeConfig } from 'config/store-config';
import { models } from 'models/models';
import { sendEmail } from 'lib/resend';
import { stripe } from 'lib/stripe';
import { connectDB } from 'lib/mongodb';

export const metadata: Metadata = {
  title: getPageTitle('Payment Accepted'),
};

export default async function Accepted(
  props: PageProps<undefined, { orderId?: string }>,
) {
  const searchParams = await props.searchParams;

  await acceptOrder(searchParams.orderId);

  return (
    <section className="container mx-auto px-2 py-16">
      <div className="flex flex-col gap-4 items-center mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-32 text-green-700"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
            clipRule="evenodd"
          />
        </svg>

        <h1 className="text-3xl font-bold text-center">Payment accepted</h1>

        <Link href="/orders" className="btn btn-neutral mt-4">
          Continue to my orders
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

async function acceptOrder(orderId?: string) {
  await connectDB();

  if (typeof orderId !== 'string') {
    throw new Error('Invalid order id');
  }

  const order = await models.order.findById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(
    order.checkoutSessionId,
  );
  if (checkoutSession.payment_status !== 'paid') {
    throw new Error('Order not paid');
  }

  const email = order.email || checkoutSession.customer_details?.email;
  if (!email) {
    throw new Error('No email associated with order');
  }

  if (order.status === 'unpaid') {
    await sendOrderSuccessfulEmail(email);
  }

  order.email = email;
  order.status = 'paid';

  await order.save();

  return order;
}

async function sendOrderSuccessfulEmail(email: string) {
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
