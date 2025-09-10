export const product = {
  id: '1',
  name: 'Organic Cotton T-Shirt',

  price: 3999,
  compareAtPrice: 4999,

  description: `Show off your developer pride with the granqvist.dev Unisex Organic Cotton T-Shirt. 
  
Made from 100% certified organic cotton, this premium tee combines comfort, sustainability, and minimalist style. 

The crisp white fabric serves as a clean canvas for the bold blue granqvist.dev print across the chest, making it the perfect conversation starter at meetups, hackathons, or casual hangouts.`,

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
};

export type ProductOptions = typeof product.options;
