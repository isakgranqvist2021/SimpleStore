import { Product } from 'types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Organic Cotton T-Shirt',
    slug: 'unisex-organic-cotton-t-shirt-white',

    price: 3999,
    compareAtPrice: 4999,

    description: `Show off your developer pride with the granqvist.dev Unisex Organic Cotton T-Shirt. 
  
Made from 100% certified organic cotton, this premium tee combines comfort, sustainability, and minimalist style. 

The crisp white fabric serves as a clean canvas for the bold blue granqvist.dev print across the chest, making it the perfect conversation starter at meetups, hackathons, or casual hangouts.`,

    shortDescription:
      'Premium unisex t-shirt made from 100% organic cotton with a bold granqvist.dev print.',

    images: [
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/unisex-organic-cotton-t-shirt-white-front-68c1894c2e0da.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/unisex-organic-cotton-t-shirt-white-back-68c1c0576b9e6.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/unisex-organic-cotton-t-shirt-white-left-68c1894c2e622.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/unisex-organic-cotton-t-shirt-white-right-68c1894c2e9c6.png',
    ],

    options: [
      {
        id: 'size',
        name: 'Size',
        values: ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
      },
    ],

    reviews: [],
  },

  {
    id: '2',
    name: 'Trucker Cap ',
    slug: 'trucker-cap',

    price: 2999,
    compareAtPrice: null,

    description: `Show off your developer pride with the granqvist.dev Trucker Cap.

Made from 100% certified organic cotton, this premium cap combines comfort, sustainability, and minimalist style.

The crisp white fabric serves as a clean canvas for the bold blue granqvist.dev print across the chest, making it the perfect conversation starter at meetups, hackathons, or casual hangouts.`,
    shortDescription:
      'Premium unisex trucker cap made from 100% organic cotton with a bold granqvist.dev print.',

    images: [
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/retro-trucker-hat-white-front-68c32092c3e9e.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/retro-trucker-hat-white-left-front-68c32092c4624.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/retro-trucker-hat-white-left-68c32092c43be.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/retro-trucker-hat-white-back-68c32092c41c5.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/retro-trucker-hat-white-right-68c32092c482e.png',
      'https://storage.googleapis.com/public_cdn_bucket/product_images/granqvist-dev-shirt/retro-trucker-hat-white-right-front-68c32092c49fc.png',
    ],

    options: [
      {
        id: 'size',
        name: 'Size',
        values: ['One Size'],
      },
    ],
    reviews: [],
  },
];

export function getProductById(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProducts() {
  return products;
}
