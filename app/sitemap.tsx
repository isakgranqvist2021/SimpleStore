import { productRepository } from 'database/product/product.repository';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await productRepository.findAll();

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
    ...products.map((product) => ({
      url: `${process.env.APP_BASE_URL}/products/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
