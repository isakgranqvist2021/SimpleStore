import { type Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

function getStripe() {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }

  return stripePromise;
}

export function useRedirectToStripe() {
  return async (sessionId: string) => {
    const stripe = await getStripe();

    if (!stripe) {
      throw new Error('Stripe.js failed to load.');
    }

    await stripe.redirectToCheckout({ sessionId });
  };
}
