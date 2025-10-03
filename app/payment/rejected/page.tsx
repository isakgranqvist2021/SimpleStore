import { CheckoutAgainButton } from 'components/checkout-again-button';
import { getPageTitle } from 'config/store-config';
import models from 'database/models';
import { Metadata } from 'next';
import React from 'react';
import { getCheckoutSession } from 'services/payment';
import { PageProps } from 'types/page';

export const metadata: Metadata = {
  title: getPageTitle('Payment Rejected'),
};

export default async function Rejected(
  props: PageProps<undefined, { orderId?: string }>,
) {
  const searchParams = await props.searchParams;

  const order = await rejectOrder(searchParams.orderId);

  return (
    <section className="container mx-auto px-2 py-16">
      <div className="flex flex-col gap-4 items-center mt-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-32 text-red-700"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
            clipRule="evenodd"
          />
        </svg>

        <h1 className="text-3xl font-bold text-center">Payment rejected</h1>
        <p className="text-center max-w-prose">
          Your payment was not successful. Please try again or contact support
          if the problem persists.
        </p>

        <CheckoutAgainButton sessionId={order.checkoutSessionId} />
      </div>
    </section>
  );
}

async function rejectOrder(orderId?: string) {
  if (typeof orderId !== 'string') {
    throw new Error('Invalid order id');
  }

  const order = await models.order.findById(orderId);
  if (!order) {
    throw new Error('Order not found');
  }

  const checkoutSession = await getCheckoutSession(order.checkoutSessionId);

  if (checkoutSession.customer_details?.email && !order.email) {
    order.email = checkoutSession.customer_details.email;
    await order.save();
  }

  return order;
}
