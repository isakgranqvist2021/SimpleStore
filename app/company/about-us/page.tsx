import { Metadata } from 'next';
import { getPageTitle } from 'config/store-config';

export const metadata: Metadata = {
  title: getPageTitle('About us'),
};

export default function AboutUsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-bold text-3xl mb-4">About us</h1>

      <div className="max-w-prose flex flex-col gap-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex nam vitae
          reiciendis qui architecto iusto nisi fuga optio. Praesentium,
          expedita?
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, iusto!
          Perferendis quia animi est. Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Hic ullam laudantium minima alias corrupti sequi
          laborum placeat obcaecati, quidem, ipsa magnam ipsam vel at eligendi.
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum incidunt
          veritatis libero ipsum modi possimus rerum!
        </p>
      </div>
    </div>
  );
}
