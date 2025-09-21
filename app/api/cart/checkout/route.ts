import { allowedCountries } from 'config/shipping';
import { getProductById } from 'data';
import { auth0 } from 'lib/auth0';
import { createCheckoutSession } from 'services/payment';
import Stripe from 'stripe';
import { Product } from 'types/product';
import z from 'zod';

function getStripeCheckoutParams(params: {
  product: Product;
  options: Record<string, string>;
  email?: string;
  redirectUrl?: string;
}): Stripe.Checkout.SessionCreateParams {
  return {
    mode: 'payment',
    submit_type: 'pay',
    payment_method_types: ['card'],
    customer_email: params.email,
    line_items: [
      {
        price_data: {
          currency: 'EUR',
          unit_amount: params.product.price,
          product_data: {
            name: params.product.name,
            images: params.product.images,
            metadata: params.options,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${params.redirectUrl}/payment/accepted?checkoutSessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${params.redirectUrl}/payment/rejected?checkoutSessionId={CHECKOUT_SESSION_ID}`,

    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          display_name: 'Standard shipping',
          fixed_amount: {
            amount: 0,
            currency: 'EUR',
          },
        },
      },
    ],
    shipping_address_collection: {
      allowed_countries: allowedCountries,
    },
  };
}

const checkoutSchema = z.object({
  options: z.record(z.string(), z.string()),
  productId: z.string(),
});

export async function POST(req: Request) {
  try {
    const parsedCheckoutParams = checkoutSchema.parse(await req.json());
    const product = getProductById(parsedCheckoutParams.productId);

    if (!product) {
      return new Response(
        JSON.stringify({
          statusCode: 400,
          message: 'Product not found',
        }),
        { status: 400 },
      );
    }

    const session = await auth0.getSession();

    const redirectUrl = req.headers.get('origin') || 'http://localhost:3000';

    const checkoutSessionParams = getStripeCheckoutParams({
      email: session?.user?.email,
      redirectUrl,
      options: parsedCheckoutParams.options,
      product,
    });

    const checkoutSession = await createCheckoutSession(checkoutSessionParams);

    return Response.json({ sessionId: checkoutSession.id });
  } catch (err) {
    console.error('Error during checkout:', err);

    return new Response(
      JSON.stringify({
        statusCode: 500,
        message: err instanceof Error ? err.message : 'Internal server error',
      }),
      { status: 500 },
    );
  }
}
