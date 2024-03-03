import { CartItemType } from './cartSlice.ts';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem.tsx';

type CartItemProps = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProps) {
  const { name, quantity, totalPrice, pizzaId } = item;

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>

        <DeleteItem ItemId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
