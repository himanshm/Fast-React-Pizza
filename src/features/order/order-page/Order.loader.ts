import { getOrder } from '../../../services/apiRestaurant';
import type {
  LoaderFunction,
  Params,
  LoaderFunctionArgs,
  ParamParseKey,
} from 'react-router-dom';

const PathNames = { findOrder: '/order/:orderId' } as const;

interface Args extends LoaderFunctionArgs {
  params: Params<ParamParseKey<typeof PathNames.findOrder>>;
}

export const loader: LoaderFunction = async ({ params }: Args) => {
  if (!params.orderId) {
    throw new Error('Order ID is undefined');
  }
  const order = await getOrder(params.orderId);
  console.log(order);
  return order;
};

// import type { Params } from "react-router-dom";
// export async function loader({ params }: { params: Params<"todoId"> }) {
//   return await fetchData(params.todoId);
// };
