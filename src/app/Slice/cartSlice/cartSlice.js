
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cart: [],
};

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const productExists = state.cart.some((item) => item.id === action.payload.id);
//       if (productExists) {
//         toast.error('This product is already in the cart');
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 });
//         toast.success('Product added to cart');
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((_, i) => i !== action.payload);
//     },
//     incrementQuantity: (state, action) => {
//       const product = state.cart[action.payload];
//       if (product) {
//         product.quantity++;
//       }
//     },
//     decrementQuantity: (state, action) => {
//       const product = state.cart[action.payload];
//       if (product && product.quantity > 1) {
//         product.quantity--;
//       }
//     },
//   },
// });

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productExists = state.cart.some((item) => item.id === action.payload.id);
      if (productExists) {
        toast.error('This product is already in the cart');
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        toast.success('Product added to cart');
      }
    },
    removeFromCart: (state, action) => {
      // Identify product by its ID, not by index
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product) {
        product.quantity++;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity--;
      }
    },
  },
});


export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
