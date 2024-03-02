import { useLoaderData } from 'react-router';
import { MenuData } from '../../../services/apiRestaurant';
import MenuItem from '../MenuItem';

function MenuPage() {
  const menu = useLoaderData() as MenuData;
  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default MenuPage;
