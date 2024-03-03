import { formatCurrency } from '../../utils/helpers';
import { PizzaType } from '../../services/apiRestaurant';
import Button from '../../UI/Button';
import { RootState } from '../../store/store.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks.ts';
import { addItem, selectCurrentQuantityById } from '../cart/cartSlice.ts';
import DeleteItem from '../cart/DeleteItem.tsx';
import UpdateItemQuantity from '../cart/UpdateItemQuantity.tsx';

type MenuItemProps = {
  pizza: PizzaType;
};
function MenuItem({ pizza }: MenuItemProps) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useAppSelector((state: RootState) =>
    selectCurrentQuantityById(id)(state)
  );
  const dispatch = useAppDispatch();

  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'grayscale opacity-70' : ''}`}
      />
      <div className='flex flex-col grow pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm italic text-stone-500 capitalize'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm uppercase font-medium text-stone-500'>
              Sold out
            </p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity
                itemId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem itemId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button btntype='small' onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
