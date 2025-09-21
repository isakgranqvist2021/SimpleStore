import Stripe from 'stripe';

export const storeConfig = {
  name: 'One Product Store',
  slogan: 'The best product in the world',
  title: 'One Product Store - Buy the best product in the world',
  description: 'One product store selling the best product in the world.',

  contactEmail: 'support@example.com',

  socialMedia: {
    twitter: 'https://www.twitter.com/yourstore',
    youtube: 'https://www.youtube.com/yourstore',
    facebook: 'https://www.facebook.com/yourstore',
    instagram: 'https://www.instagram.com/yourstore',
    pinterest: 'https://www.pinterest.com/yourstore',
  },
};

const shipping: Partial<
  Record<
    Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry,
    {
      country: string;
      price: number;
      delivery: string;
      return: number;
    }
  >
> = {
  SE: {
    country: 'Sweden',
    price: 0,
    delivery: '3-4 business days',
    return: 0,
  },
  DK: {
    country: 'Denmark',
    price: 0,
    delivery: '2-6 business days',
    return: 0,
  },
  NO: {
    country: 'Norway',
    price: 0,
    delivery: '2-6 business days',
    return: 0,
  },
  FI: {
    country: 'Finland',
    price: 0,
    delivery: '2-6 business days',
    return: 0,
  },
  DE: {
    country: 'Germany',
    price: 0,
    delivery: '3 business days',
    return: 0,
  },
  NL: {
    country: 'Netherlands',
    price: 0,
    delivery: '1-3 business days',
    return: 0,
  },
  BE: {
    country: 'Belgium',
    price: 0,
    delivery: '2-3 business days',
    return: 0,
  },
  FR: {
    country: 'France',
    price: 0,
    delivery: '2-3 business days',
    return: 0,
  },
  ES: {
    country: 'Spain',
    price: 0,
    delivery: '2-6 business days',
    return: 0,
  },
  IT: {
    country: 'Italy',
    price: 0,
    delivery: '2-4 business days',
    return: 0,
  },
};

export const shippingFees = Object.values(shipping);
export const allowedCountries = Object.keys(
  shipping,
) as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[];
