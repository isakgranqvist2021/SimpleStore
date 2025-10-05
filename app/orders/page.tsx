import { auth0 } from 'lib/auth0';
import { Metadata } from 'next';
import React from 'react';
import { formatCurrency, formatDate } from 'utils';
import { getPageTitle } from 'config/store-config';
import { models } from 'models/models';
import { ProductType } from 'models/product';
import { connectDB } from 'lib/mongodb';
import Link from 'next/link';

export const metadata: Metadata = {
  title: getPageTitle('My Orders'),
};

async function OrdersTable() {
  await connectDB();

  const session = await auth0.getSession();

  if (!session?.user?.email) {
    return (
      <div>
        <p>
          Please{' '}
          <a className="link" href="/auth/login">
            log in
          </a>{' '}
          to see your orders.
        </p>
      </div>
    );
  }

  const orders = await models.order
    .find({
      email: session.user.email,
    })
    .populate<typeof models.product & { product: ProductType }>('product')
    .exec();

  if (!orders.length) {
    return (
      <div className="mt-36 max-w-md mx-auto">
        <p className="text-center text-muted-foreground">
          You have no orders yet. Once you make a purchase, your order will
          appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Created</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id.toString()}>
              <td>
                <Link className="link" href={`/products/${order.product.slug}`}>
                  {order.product.name}
                </Link>
              </td>
              <td>{formatDate(order.createdAt)}</td>
              <td>{formatCurrency(order.amountTotal ?? 0)}</td>
              <td className="capitalize">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function Orders() {
  return (
    <section className="container mx-auto px-2 py-8">
      <OrdersTable />
    </section>
  );
}
