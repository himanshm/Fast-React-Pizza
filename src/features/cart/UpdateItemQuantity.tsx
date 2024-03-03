import Button from '../../UI/Button';
import { useAppDispatch } from '../../store/hooks';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

type UpdateItemQuantityProps = {
  itemId: string;
  currentQuantity: number;
};

function UpdateItemQuantity({
  itemId,
  currentQuantity,
}: UpdateItemQuantityProps) {
  const dispatch = useAppDispatch();

  return (
    <div className='flex gap-2 items-center md:gap-3'>
      <Button
        btntype='round'
        onClick={() => dispatch(decreaseItemQuantity(itemId))}
      >
        -
      </Button>
      <span className='text-sm font-medium'>{currentQuantity}</span>
      <Button
        btntype='round'
        onClick={() => dispatch(increaseItemQuantity(itemId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
