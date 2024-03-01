const API_URL = 'https://react-fast-pizza-api.onrender.com/api';
interface PizzaIngredient {
  name: string;
}

export interface Pizza {
  id: string;
  name: string;
  unitPrice: number;
  imageUrl: string;
  ingredients: PizzaIngredient[];
  soldOut: boolean;
}

type OrderedPizza = {
  addIngredients: string[];
  removeIngredients: string[];
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type Order = {
  customer: string;
  status: string;
  priority: boolean;
  cart: OrderedPizza[];
  id: string;
  estimatedDelivery: string;
  orderPrice: number;
  priorityPrice: number;
};

// Define an array type for the menu data
export type MenuData = Pizza[];

export async function getMenu(): Promise<MenuData> {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data as MenuData;
}

export async function getOrder(id: string) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw Error(`Couldn't find order #${id}`);

  const { data } = await res.json();
  return data as Order;
}

export async function createOrder(newOrder: string) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: 'POST',
      body: JSON.stringify(newOrder),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    const { data } = await res.json();
    return data;
  } catch {
    throw Error('Failed creating your order');
  }
}

export async function updateOrder(id: string, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
