import LinkButton from '../../UI/LinkButton';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { clearCart, selectCartItems } from './cartSlice.ts';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store.ts';
import EmptyCart from './EmptyCart.tsx';

function CartPage() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);

  const cart = useAppSelector((state: RootState) => selectCartItems(state));

  if (!cart.length) return <EmptyCart />;
  return (
    <div className='px-4 py-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, {username}</h2>

      <ul className='mt-3 divide-y divide-stone-200 border-b'>
        {cart.map((cartItem) => (
          <CartItem key={cartItem.pizzaId} item={cartItem} />
        ))}
      </ul>

      <div className='mt-6 space-x-2'>
        <Button btntype='primary' to='/order/new'>
          Order pizzas
        </Button>
        <Button btntype='secondary' onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
