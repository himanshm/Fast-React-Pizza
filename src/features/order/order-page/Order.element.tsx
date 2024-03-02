// Test ID: IIDSAT
import { useLoaderData } from 'react-router-dom';
import { Order } from '../../../services/apiRestaurant';

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../../utils/helpers';
import OrderItem from '../OrderItem';

function OrderPage() {
  const order = useLoaderData() as Order;
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className='px-4 py-6 space-y-8'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h2 className='text-xl font-semibold'>Order #{id} status</h2>

        <div className='space-x-2'>
          {priority && (
            <span className='bg-red-500 text-sm uppercase font-semibold text-red-50 tracking-wide rounded-full py-1 px-3'>
              Priority
            </span>
          )}
          <span className='bg-green-500 text-sm uppercase font-semibold text-green-50 tracking-wide rounded-full py-1 px-3'>
            {status} order
          </span>
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5'>
        <p className='font-medium'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='text-sm text-stone-500'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='divide-stone-500 divide-y border-y border-stone-500'>
        {cart.map((item) => (
          <OrderItem key={item.pizzaId} item={item} />
        ))}
      </ul>

      <div className='space-y-2 bg-stone-200 px-6 py-5'>
        <p className='text-sm font-medium text-stone-600'>
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className='text-sm font-medium text-stone-600'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='font-bold'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export default OrderPage;
