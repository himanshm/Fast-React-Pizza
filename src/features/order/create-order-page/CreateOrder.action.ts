import { redirect, type ActionFunction } from 'react-router-dom';
import { CartItemType, clearCart } from '../../cart/cartSlice.ts';
import { createOrder } from '../../../services/apiRestaurant';
import store from '../../../store/store.ts';

interface FormData {
  customer: string;
  phone: string;
  priority: boolean;
  address: string;
  cart: CartItemType[];
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

  store.dispatch(clearCart()); // Do not overuse

  return redirect(`/order/${newOrder.id}`);
};
