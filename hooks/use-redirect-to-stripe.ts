import { type Stripe, loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

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
      toast.error('Could not connect to payment provider.');
      throw new Error('Stripe.js failed to load.');
    }

    await stripe.redirectToCheckout({ sessionId });
  };
}
