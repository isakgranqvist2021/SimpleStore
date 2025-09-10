import { auth0 } from 'lib/auth0';
import React from 'react';
import { stripe } from 'services/payment';
import Stripe from 'stripe';
import { formatCurrency, formatDate } from 'utils';

export const metadata = {
  title: 'Account',
};

async function getTransactionsByEmail(email: string) {
  try {
    // Step 1: Find customers by email
    const customers = await stripe.customers.list({
      email,
      limit: 100, // in case multiple customers exist with the same email
    });

    if (customers.data.length === 0) {
      console.log('No customers found with that email.');
      return [];
    }

    let allTransactions: Stripe.Charge[] = [];

    // Step 2: For each customer, list charges (or payment intents)
    for (const customer of customers.data) {
      const charges = await stripe.charges.list({
        customer: customer.id,
        limit: 100, // adjust if you need pagination
      });

      allTransactions = allTransactions.concat(charges.data);
    }

    return allTransactions;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

async function OrdersTable() {
  const session = await auth0.getSession();

  if (!session?.user?.email) {
    return <p>Please log in to see your orders.</p>;
  }

  const orders = await getTransactionsByEmail(session.user.email);

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
            <th>Created</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{formatDate(order.created * 1000)}</td>
              <td>{formatCurrency(order.amount)}</td>
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
