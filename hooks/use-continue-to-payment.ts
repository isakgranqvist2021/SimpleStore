import React from 'react';
import getStripe from 'services/stripe';
import { toast } from 'sonner';

export function useContinueToPayment() {
  const [isLoading, setIsLoading] = React.useState(false);

  const continueToPayment = async (options: Record<string, string>) => {
    setIsLoading(true);

    const stripe = await getStripe();
    if (!stripe) {
      toast.error('Something went wrong, please try again later.');
      setIsLoading(false);
      return;
    }

    const res = await fetch('/api/cart/checkout', {
      body: JSON.stringify({ options }),
      method: 'POST',
    }).then((res) => res.json());

    if (!res.sessionId) {
      toast.error("Couldn't create checkout session");
      setIsLoading(false);
      return;
    }

    await stripe.redirectToCheckout({ sessionId: res.sessionId });

    setIsLoading(false);
  };

  return { continueToPayment, isLoading };
}
