import { ImagePicker } from 'components/image-picker';
import { product } from 'data/products';
import React from 'react';
import { formatCurrency } from 'utils';
import { PickProductOptions } from 'components/pick-product-options';
import { auth0 } from 'lib/auth0';

export const metadata = {
  title: product.name,
  description: product.description,
};

const numberOfReviews = 47;

function Star() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="size-6 text-yellow-400"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
export default async function Home() {
  const session = await auth0.getSession();

  return (
    <section className="container mx-auto px-2 py-8">
      <div className="flex gap-4 flex-col md:flex-row justify-center">
        <div>
          <ImagePicker images={product.images} />
        </div>

        <div className="w-full flex flex-col gap-4 py-6 px-2 md:px-12 max-w-lg">
          <h2 className="font-bold text-3xl">{product.name}</h2>

          <div className="flex">
            <span>{formatCurrency(product.price)}</span>
            {product.compareAtPrice && (
              <span className="line-through text-muted-foreground ml-2">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
          </div>

          <div className="flex gap-1">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />({numberOfReviews})
          </div>

          <p className="whitespace-pre-wrap text-sm">{product.description}</p>

          <PickProductOptions
            email={session?.user?.email}
            options={product.options}
          />
        </div>
      </div>
    </section>
  );
}
