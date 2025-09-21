import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { sendOrderSuccessfulEmail } from 'services/email';
import { getCheckoutSession } from 'services/payment';
import type { PageProps } from 'types/page';

export const metadata = {
  title: 'Payment Accepted',
};

export default async function Accepted(
  props: PageProps<undefined, { checkoutSessionId: string }>,
) {
  const searchParams = await props.searchParams;

  const checkoutSessionId = searchParams.checkoutSessionId;
  if (typeof checkoutSessionId !== 'string') {
    throw new Error('Invalid checkout session id');
  }

  const checkoutSession = await getCheckoutSession(checkoutSessionId);
  if (checkoutSession.payment_status !== 'paid') {
    return redirect('/payment/rejected');
  }

  if (checkoutSession.customer_details?.email) {
    await sendOrderSuccessfulEmail(checkoutSession.customer_details?.email);
  }

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
