import { redirect, type ActionFunction } from 'react-router-dom';

import { Pizza, createOrder } from '../../../services/apiRestaurant';

interface FormData {
  customer: string;
  phone: string;
  priority: boolean;
  address: string;
  cart: Pizza[];
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// whenever this form here will be submitted, behind the scenes, React Router will then call this action function and it will pass in the request that was submitted.

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const cartData = formData.get('cart');

  if (!cartData) {
    throw new Error('Cart data is missing');
  }

  const cartString = typeof cartData === 'string' ? cartData : '';
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(cartString),
    priority: data.priority === 'on',
  };

  const errors: Partial<Record<keyof FormData, string>> = {}; // each property in errors is optional and matches the keys of FormData, with values being strings.

  if (!isValidPhone(data.phone.toString())) {
    errors.phone =
      'Please give us your correct phone number! We might need it to contact you!';
  }
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  return redirect(`/order/${newOrder.id}`);
};
