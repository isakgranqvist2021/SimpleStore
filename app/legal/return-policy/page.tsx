import { Metadata } from 'next';
import { getPageTitle } from 'config/store-config';

export const metadata: Metadata = {
  title: getPageTitle('Return Policy'),
};

export default function ReturnPolicyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-bold text-3xl mb-4">Return Policy</h1>

      <div className="max-w-prose flex flex-col gap-4">
        <p>
          We offer a no questions asked return policy within 30 days of
          purchase. If you are not completely satisfied with your purchase, you
          can return the item for a full refund.
        </p>
      </div>
    </div>
  );
}
