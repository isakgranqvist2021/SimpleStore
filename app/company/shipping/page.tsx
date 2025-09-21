import { shippingFees } from 'config';
import { Metadata } from 'next';
import { getPageTitle } from 'utils';

export const metadata: Metadata = {
  title: getPageTitle('Shipping'),
};

export default function ShippingPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="font-bold text-3xl mb-4">Shipping</h1>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Country</th>
              <th>Delivery time</th>
              <th>Shipping price</th>
              <th>Return price</th>
            </tr>
          </thead>
          <tbody>
            {shippingFees.map((item) => (
              <tr key={item.country}>
                <td>{item.country}</td>
                <td>{item.delivery}</td>
                <td>{item.price || 'Free'}</td>
                <td>{item.return || 'Free'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
