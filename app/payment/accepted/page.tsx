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

  return <p>payment accepted</p>;
}
