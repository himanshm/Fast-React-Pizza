import { ActionFunction } from 'react-router-dom';
import { updateOrder } from '../../../services/apiRestaurant';

export const action: ActionFunction = async ({ params }) => {
  const orderId = params.orderId;
  const data = { priority: true };
  if (orderId) {
    await updateOrder(orderId, data);
  }

  return null;
};
