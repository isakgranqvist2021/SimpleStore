import { ReviewType } from 'models/review';

interface ProductRatingProps {
  reviews: ReviewType[];
  starClassName?: string;
  className?: string;
}

function Star(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function ProductRating({
  className,
  starClassName = 'size-6',
  reviews,
}: ProductRatingProps) {
  const averageRating =
    (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length ||
      0) + 0.6;

  const numberOfFullStars = Math.floor(averageRating);

  return (
    <div className={`flex items-center ${className}`}>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          className={[
            starClassName,
            index < numberOfFullStars ? 'text-yellow-400' : 'text-gray-200',
          ].join(' ')}
        >
          <Star />
        </span>
      ))}

      <span className="ml-1">({reviews.length})</span>
    </div>
  );
}
