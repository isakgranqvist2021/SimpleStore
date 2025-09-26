import { ProductRating } from 'components/product-rating';
import { productRepository } from 'database/product/product.repository';
import Link from 'next/link';
import { formatCurrency } from 'utils';

export default async function HomePage() {
  const products = await productRepository.findAll();

  return (
    <section className="container mx-auto px-2 py-8">
      <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {products.map((product) => (
          <Link
            href={`/products/${product.slug}`}
            className="card bg-base-100 shadow-xl"
            key={product._id.toString()}
          >
            <figure>
              <img
                className="md:height-auto max-h-48"
                src={product.images[0]}
                alt={product.name}
              />
            </figure>
            <div className="card-body">
              <div className="flex">
                <span>{formatCurrency(product.price)}</span>

                {product.compareAtPrice && (
                  <span className="line-through text-muted-foreground ml-2">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                )}
              </div>

              <h2 className="card-title">{product.name}</h2>

              <p>{product.shortDescription}</p>

              <ProductRating starClassName="size-4" reviews={product.reviews} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
