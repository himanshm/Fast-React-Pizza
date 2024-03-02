import LinkButton from '../../UI/LinkButton';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { CartItemType } from '../../services/apiRestaurant';
import { useAppSelector } from '../../store/hooks';

const fakeCart: CartItemType[] = [
  {
    pizzaId: '12',
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: '6',
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: '11',
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CartPage() {
  const username = useAppSelector((state) => state.user.username);
  const cart = fakeCart;

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
        <Button btntype='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default CartPage;
