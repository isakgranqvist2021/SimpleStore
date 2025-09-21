import { getProducts } from 'data';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.APP_BASE_URL!,
      lastModified: new Date(),
    },
    {
      url: `${process.env.APP_BASE_URL}/company/about-us`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.APP_BASE_URL}/company/contact`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.APP_BASE_URL}/company/shipping`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.APP_BASE_URL}/legal/return-policy`,
      lastModified: new Date(),
    },
    ...getProducts().map((product) => ({
      url: `${process.env.APP_BASE_URL}/products/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
