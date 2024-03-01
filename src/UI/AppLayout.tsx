import { Outlet, useNavigation } from 'react-router';
import CartOverview from '../features/cart/CartOverview.tsx';
import Header from './Header.tsx';
import LoadingIndicator from './LoadingIndicator.tsx';

function AppLayoutPage() {
  const navigation = useNavigation();

  const isLoading = navigation.state === 'loading';
  return (
    <div className='layout'>
      {isLoading && <LoadingIndicator />}
      <Header />

      <main>
        <Outlet />
      </main>

      <CartOverview />
    </div>
  );
}

export default AppLayoutPage;
