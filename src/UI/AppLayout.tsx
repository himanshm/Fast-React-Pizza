import { Outlet } from 'react-router';
import CartOverview from '../features/cart/CartOverview.tsx';
import Header from './Header.tsx';

function AppLayoutPage() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayoutPage;
