import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../../../utis/axios";

// Helper to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Helper to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  cart: loadCartFromLocalStorage(),
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
      saveCartToLocalStorage(state.cart); // Save cart to localStorage
    },
    addToCart: (state, action) => {
      const productExists = state.cart.some((item) => item.productId === action.payload.productId);
      if (productExists) {
        toast.error('This product is already in the cart');
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        toast.success('Product added to cart');
        saveCartToLocalStorage(state.cart); // Save cart to localStorage
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.productId === action.payload);
      if (product) {
        product.quantity++;
        saveCartToLocalStorage(state.cart); // Save cart to localStorage
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.productId === action.payload);
      if (product && product.quantity > 1) {
        product.quantity--;
        saveCartToLocalStorage(state.cart); // Save cart to localStorage
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.productId !== action.payload);
      saveCartToLocalStorage(state.cart); // Save cart to localStorage
    }
  }
});

export const { setCart, addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

// Fetch cart from API and save to local state and localStorage
export const fetchCart = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/user/cart/${userId}`);
    if (response.data.success) {
      dispatch(setCart(response.data.data.products));
    }
  } catch (error) {
    toast.error("Error fetching cart data");
  }
};

export default cartSlice.reducer;
