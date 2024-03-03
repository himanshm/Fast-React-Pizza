import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem.tsx';
import UpdateItemQuantity from './UpdateItemQuantity.tsx';
import { RootState } from '../../store/store.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { selectCurrentQuantityById, CartItemType } from './cartSlice.ts';

type CartItemProps = {
  item: CartItemType;
};

function CartItem({ item }: CartItemProps) {
  const { name, quantity, totalPrice, pizzaId } = item;

  const currentQuantity = useAppSelector((state: RootState) =>
    selectCurrentQuantityById(pizzaId)(state)
  );

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          itemId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem itemId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
