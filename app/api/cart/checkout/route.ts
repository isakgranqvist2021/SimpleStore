import { allowedCountries } from 'config/shipping';
import { storeConfig } from 'config/store-config';
import models from 'database/models';
import { auth0 } from 'lib/auth0';
import { ObjectId } from 'mongodb';
import { createCheckoutSession } from 'services/payment';
import z from 'zod';

const checkoutSchema = z.object({
  options: z.record(z.string(), z.string()),
  productId: z.string(),
});

export async function POST(req: Request) {
  try {
    const parsedCheckoutParams = checkoutSchema.parse(await req.json());
    const product = await models.product
      .findById(parsedCheckoutParams.productId)
      .lean();

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

    const orderId = new ObjectId();

    const checkoutSession = await createCheckoutSession({
      mode: 'payment',
      submit_type: 'pay',
      payment_method_types: [
        'card',
        'revolut_pay',
        'klarna',
        'mobilepay',
        'paypal',
      ],
      customer_email: session?.user.email,
      line_items: [
        {
          price_data: {
            currency: storeConfig.defaultCurrency,
            unit_amount: product.price,
            product_data: {
              name: product.name,
              images: product.images,
              metadata: parsedCheckoutParams.options,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${redirectUrl}/payment/accepted?orderId=${orderId}`,
      cancel_url: `${redirectUrl}/payment/rejected?orderId=${orderId}`,

      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            display_name: 'Standard shipping',
            fixed_amount: {
              amount: 0,
              currency: storeConfig.defaultCurrency,
            },
          },
        },
      ],
      shipping_address_collection: {
        allowed_countries: allowedCountries,
      },
    });

    const order = await models.order.insertOne({
      _id: orderId,
      product: product._id,
      checkoutSessionId: checkoutSession.id,
      email: session?.user.email,
      amountTotal: checkoutSession.amount_total ?? 0,
    });
    if (!order) {
      throw new Error('Failed to create order');
    }

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
