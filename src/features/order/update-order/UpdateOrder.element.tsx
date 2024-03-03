import { useFetcher } from 'react-router-dom';
import Button from '../../../UI/Button';
// import { Order } from '../../../services/apiRestaurant';

// type UpdateOrderProps = {
//   order: Order;
// };

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button btntype='primary'>Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;
