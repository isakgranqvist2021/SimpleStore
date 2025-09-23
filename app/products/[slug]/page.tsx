import { ImagePicker } from 'components/image-picker';
import { getProductBySlug } from 'data';
import React from 'react';
import { formatCurrency } from 'utils';
import { PickProductOptions } from 'components/pick-product-options';
import { auth0 } from 'lib/auth0';
import { ProductRating } from 'components/product-rating';
import { PageProps } from 'types/page';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPageTitle } from 'config/store-config';

export async function generateMetadata(
  props: PageProps<{ slug: string }>,
): Promise<Metadata> {
  const params = await props.params;
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {};
  }

  return {
    title: getPageTitle(product.name),
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      url: `${process.env.APP_BASE_URL}/products/${product.slug}`,
    },
    twitter: {
      title: product.name,
      description: product.description,
      images: product.images,
      card: 'summary_large_image',
    },
  };
}

export default async function ProductPage(props: PageProps<{ slug: string }>) {
  const params = await props.params;
  const session = await auth0.getSession();

  const product = getProductBySlug(params.slug);
  if (!product) {
    return redirect('/');
  }

  return (
    <div>
      <section className="container mx-auto px-2 py-8">
        <div className="flex gap-4 flex-col md:flex-row justify-center">
          <div>
            <ImagePicker images={product.images} />
          </div>

          <div className="w-full flex flex-col gap-4 py-6 px-2 md:px-12 max-w-lg">
            <h1 className="font-bold text-3xl">{product.name}</h1>

            <div className="flex">
              <span>{formatCurrency(product.price)}</span>
              {product.compareAtPrice && (
                <span className="line-through text-muted-foreground ml-2">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              )}
            </div>

            <div className="flex gap-1">
              <ProductRating reviews={product.reviews} />
            </div>

            <p className="whitespace-pre-wrap text-sm">{product.description}</p>

            <PickProductOptions
              email={session?.user?.email}
              options={product.options}
              productId={product.id}
            />

            <ul className="list bg-base-100 border rounded">
              <li className="list-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  />
                </svg>

                <div>
                  <div className="text-xs uppercase font-semibold">
                    Free delivery and free returns on all orders!
                  </div>
                </div>
              </li>
              <li className="list-row items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs uppercase font-semibold">
                    30 days no questions asked return policy
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
