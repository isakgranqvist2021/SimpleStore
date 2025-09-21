import React from 'react';
import { toast } from 'sonner';
import { useRedirectToStripe } from './use-redirect-to-stripe';

export function useContinueToPayment(productId: string) {
  const [isLoading, setIsLoading] = React.useState(false);

  const redirectToStripe = useRedirectToStripe();

  const continueToPayment = async (options: Record<string, string>) => {
    setIsLoading(true);

    const res = await fetch('/api/cart/checkout', {
      body: JSON.stringify({ options, productId }),
      method: 'POST',
    }).then((res) => res.json());

    if (!res.sessionId) {
      toast.error("Couldn't create checkout session");
      setIsLoading(false);
      return;
    }

    try {
      await redirectToStripe(res.sessionId);
    } catch (err) {
      toast.error('Something went wrong, please try again later.');
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  return { continueToPayment, isLoading };
}
