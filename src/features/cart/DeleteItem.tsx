import Button from '../../UI/Button';
import { useAppDispatch } from '../../store/hooks';
import { deleteItem } from './cartSlice';

type DeleteItemProps = {
  ItemId: string;
};

function DeleteItem({ ItemId }: DeleteItemProps) {
  const dispatch = useAppDispatch();
  return (
    <Button btntype='small' onClick={() => dispatch(deleteItem(ItemId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
