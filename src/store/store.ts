import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice.ts';
import cartReducer from '../features/cart/cartSlice.ts';

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
