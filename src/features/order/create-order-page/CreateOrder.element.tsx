import { useState } from 'react';
import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../../UI/Button';
import { useAppSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { selectCartItems } from '../../cart/cartSlice';
import EmptyCart from '../../cart/EmptyCart';
import { selectTotalCartPrice } from '../../cart/cartSlice';
import { formatCurrency } from '../../../utils/helpers';

interface FormErrors {
  phone?: string;
}

function CreateOrderPage() {
  const [withPriority, setWithPriority] = useState(false);
  const username = useAppSelector((state) => state.user.username);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const formErrors = useActionData() as FormErrors;
  const cart = useAppSelector((state: RootState) => selectCartItems(state));
  const totalCartPrice = useAppSelector((state: RootState) =>
    selectTotalCartPrice(state)
  );

  const priorityPrice: number = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice: number = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      {/* <Form method='POST' action='/order/new'> */}
      <Form method='POST'>
        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='text-sm mt-2 text-red-700 bg-red-100 p-2 rounded-md'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              required
              className='input w-full'
            />
          </div>
        </div>

        <div className='mb-12 flex gap-5 items-center'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} btntype='primary'>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrderPage;
