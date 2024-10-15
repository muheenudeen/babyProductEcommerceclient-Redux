import { configureStore } from "@reduxjs/toolkit";
import authSlice from '../Slice/authSlice/authSlice.jsx'
import cartSlice from '../Slice/cartSlice/cartSlice.jsx'
import orderSlice from '../Slice/orderSlice/orderSlice.js'
import wishlistSlice from '../Slice/wishSlice/wishalistSlice.jsx'


export const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice, 
    order: orderSlice,
    wishlist:wishlistSlice,
  },
});
