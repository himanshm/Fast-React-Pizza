import Button from '../../UI/Button';
import { useAppDispatch } from '../../store/hooks';
import { deleteItem } from './cartSlice';

type DeleteItemProps = {
  itemId: string;
};

function DeleteItem({ itemId }: DeleteItemProps) {
  const dispatch = useAppDispatch();
  return (
    <Button btntype='small' onClick={() => dispatch(deleteItem(itemId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
