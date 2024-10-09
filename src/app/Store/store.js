import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slice/authSlice/authSlice.js'
import cartSlice from '../Slice/cartSlice/cartSlice.js'
import orderSlice from '../Slice/orderSlice/orderSlice.js'
export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice, 
    order: orderSlice,
  },
});
