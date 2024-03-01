import { ReactElement } from 'react';

import HomePage from './UI/Home.tsx';
import MenuPage from './features/menu/Menu.tsx';
import CartPage from './features/cart/Cart.tsx';
import CreateOrderPage from './features/order/CreateOrder';
import OrderPage from './features/order/Order';

type Route = {
  path: string;
  element: ReactElement;
};

type RootRoutes = Route[];

const Root: RootRoutes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/menu',
    element: <MenuPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/order/new',
    element: <CreateOrderPage />,
  },
  {
    path: '/order/:orderId',
    element: <OrderPage />,
  },
];

export default Root;
