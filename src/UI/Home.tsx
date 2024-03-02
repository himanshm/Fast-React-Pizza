import CreateUser from '../features/user/CreateUser';
import { useAppSelector } from '../store/hooks';
import Button from './Button';

function HomePage() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <div className='my-10 sm:my-16 text-center px-4'>
      <h1 className='text-xl font-semibold mb-8 md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to='/menu' btntype='primary'>
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default HomePage;
