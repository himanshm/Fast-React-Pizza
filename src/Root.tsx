import { ReactElement } from 'react';
import { type LoaderFunction, ActionFunction } from 'react-router-dom';

import RootLayoutPage from './UI/AppLayout.tsx';
import ErrorPage from './UI/Error.tsx';
import HomePage from './UI/Home.tsx';
import MenuPage from './features/menu/menu-page/Menu.element.tsx';
import { loader as menuLoader } from './features/menu/menu-page/Menu.loader.ts';
import CartPage from './features/cart/Cart.tsx';
import CreateOrderPage from './features/order/create-order-page/CreateOrder.element.tsx';
import { action as createOrderAction } from './features/order/create-order-page/CreateOrder.action.ts';
import OrderPage from './features/order/order-page/Order.element.tsx';
import { action as UpdateOrderAction } from './features/order/update-order/UpdateOrder.action.ts';
import { loader as orderLoader } from './features/order/order-page/Order.loader.ts';

type Route = {
  path?: string;
  element: ReactElement;
  errorElement?: ReactElement;
  children?: Route[];
  loader?: LoaderFunction;
  action?: ActionFunction;
};

type RootRoutes = Route[];

const Root: RootRoutes = [
  {
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/menu',
        element: <MenuPage />,
        loader: menuLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
      {
        path: '/order/new',
        element: <CreateOrderPage />,
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <OrderPage />,
        loader: orderLoader,
        action: UpdateOrderAction,
        errorElement: <ErrorPage />,
      },
    ],
  },
];

export default Root;
