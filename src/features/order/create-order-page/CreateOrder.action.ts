import { redirect, type ActionFunction } from 'react-router-dom';

import { createOrder } from '../../../services/apiRestaurant';

// whenever this form here will be submitted, behind the scenes, React Router will then call this action function and it will pass in the request that was submitted.

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const cartData = formData.get('cart');

  if (!cartData) {
    throw new Error('Cart data is missing');
  }

  const cartString = typeof cartData === 'string' ? cartData : '';
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(cartString),
    priority: data.priority === 'on',
  };

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
};
