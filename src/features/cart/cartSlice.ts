import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store.ts';

export interface CartItemType {
  pizzaId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface CartState {
  cart: CartItemType[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<string>) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action: PayloadAction<string>) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action: PayloadAction<string>) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item && item.quantity > 0) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;

        if (item?.quantity === 0)
          cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// export const selectTotalCartQuantity = (state: RootState): number => {
//   return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
// };

// export const selectTotalCartPrice = (state: RootState): number => {
//   return state.cart.cart.reduce((total, item) => total + item.totalPrice, 0);
// };

// export const selectCurrentQuantityById = (id: string) => {
//   return (state: RootState): number => {
//     return state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
//   };
// };

export const selectCartItems = (state: RootState) => state.cart.cart;

export const selectTotalCartQuantity = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }
);

export const selectTotalCartPrice = createSelector(
  [selectCartItems],
  (cartItems) => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }
);

export const selectCurrentQuantityById = (id: string) =>
  createSelector(
    (state: RootState) => state.cart.cart,
    (cart: CartItemType[]) => {
      const item = cart.find((item) => item.pizzaId === id);
      return item ? item.quantity : 0;
    }
  );
