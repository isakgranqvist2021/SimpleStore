import { storeConfig } from 'config/store-config';
import { Metadata } from 'next';
import { getPageTitle } from 'config/store-config';

export const metadata: Metadata = {
  title: getPageTitle('Contact us'),
};

export default function ContactPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-bold text-3xl mb-4">Contact us</h1>

      <p>
        For any inquiries, please email us at{' '}
        <a className="link" href={`mailto:${storeConfig.contactEmail}`}>
          {storeConfig.contactEmail}
        </a>
      </p>
    </div>
  );
}
