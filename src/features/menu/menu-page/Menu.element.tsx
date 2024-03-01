import { useLoaderData } from 'react-router';
import { MenuData } from '../../../services/apiRestaurant';
import MenuItem from '../MenuItem';

function MenuPage() {
  const menu = useLoaderData() as MenuData;
  console.log(menu);
  return (
    <ul>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export default MenuPage;
