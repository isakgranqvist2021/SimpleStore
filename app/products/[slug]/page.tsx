import { ImagePicker } from 'components/image-picker';
import { getProductBySlug } from 'data';
import React from 'react';
import { formatCurrency, getPageTitle } from 'utils';
import { PickProductOptions } from 'components/pick-product-options';
import { auth0 } from 'lib/auth0';
import { ProductRating } from 'components/product-rating';
import Link from 'next/link';
import { PageProps } from 'types/page';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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
          </div>
        </div>
      </section>

      <section className="container mx-auto px-2 py-8">
        <h3 className="font-bold text-2xl mb-6">Frequently Asked Questions</h3>

        <div className="join join-vertical bg-base-100 w-full">
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold">
              What is the return policy?
            </div>
            <div className="collapse-content text-sm">
              We offer a no questions asked return policy within 30 days of
              purchase. If you are not completely satisfied with your purchase,
              you can return the item for a full refund.
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              How long does shipping take?
            </div>
            <div className="collapse-content text-sm">
              Shipping times vary depending on your location. You can see all
              shipping times here:
              <Link className="link ml-2" href="/company/shipping">
                Shipping Policy
              </Link>
            </div>
          </div>
          <div className="collapse collapse-arrow join-item border-base-300 border">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Do you use cookies on the website?
            </div>
            <div className="collapse-content text-sm">
              Yes, we use cookies to enhance your experience. You can read more
              about our use of cookies here:
              <Link className="link ml-2" href="/legal/cookie-policy">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
