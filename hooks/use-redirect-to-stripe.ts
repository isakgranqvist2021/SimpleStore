import getStripe from 'services/stripe';

export function useRedirectToStripe() {
  return async (sessionId: string) => {
    const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Stripe.js failed to load.');
    }

    await stripe.redirectToCheckout({ sessionId });
  };
}
