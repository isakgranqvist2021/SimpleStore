'use client';

import { useRedirectToStripe } from 'hooks/use-redirect-to-stripe';

export function CheckoutAgainButton(props: { sessionId: string }) {
  const redirectToStripe = useRedirectToStripe();

  return (
    <button
      className="btn btn-primary"
      onClick={() => redirectToStripe(props.sessionId)}
    >
      Try Again
    </button>
  );
}
