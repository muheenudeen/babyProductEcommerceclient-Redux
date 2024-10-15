
// import { createSlice } from "@reduxjs/toolkit";
// import toast from "react-hot-toast";
// import api from "../../../../utis/axios";

// const initialState = {
//   cart: [],
//   status: 'idle',
// };

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const productExists = state.cart.some((item) => item.title === action.payload.title);
//       if (productExists) {
//         toast.error('This product is already in the cart');
//       } else {
//         state.cart.push({ ...action.payload, quantity: 1 });
//         toast.success('Product added to cart');
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//     },
//     incrementQuantity: (state, action) => {
//       const product = state.cart.find((item) => item.id === action.payload);
//       if (product) {
//         product.quantity++;
//       }
//     },
//     decrementQuantity: (state, action) => {
//       const product = state.cart.find((item) => item.id === action.payload);
//       if (product && product.quantity > 1) {
//         product.quantity--;
//       }
//     },
//     setCart: (state, action) => {
//       state.cart = action.payload;
//     },
//   },
// });

// export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, setCart } = cartSlice.actions;

// export const fetchCart = (userId) => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await api.get(`/user/cart/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (response.data.success) {
//       dispatch(setCart(response.data.data.products));
//     } else {
//       console.error(response.data.message);
//     }
//   } catch (error) {
//     console.error("There was an error fetching the cart data!", error);
//   }
// };

// export const addProductToCart = (userId, productId) => async (dispatch) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await api.post(`/user/cart/${userId}`,
//       { productId, quantity: 1 },
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     if (response.data.success) {
//       dispatch(addToCart(productId));
//     } else {
//       toast.error(response.data.message);
//     }
//   } catch (error) {
//     toast.error("Error adding product to cart!");
//   }
// };

// export default cartSlice.reducer;



import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../../../utis/axios";

const initialState = {
  cart: [],
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    
    
 addToCart: (state, action) => {
      const productExists = state.cart.some((item) => item.title === action.payload.title);
      if (productExists) {
        toast.error('This product is already in the cart');
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
        toast.success('Product added to cart');
      }
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find(item => item.productId === action.payload);
      if (product) product.quantity++;
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find(item => item.productId === action.payload);
      if (product && product.quantity > 1) product.quantity--;
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.productId !== action.payload);
    }
  }
});

export const { setCart, addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;

export const fetchCart = (userId) => async (dispatch) => {
  try {
    const response = await api.get(`/user/cart/${userId}`, {
     
    });
    if (response.data.success) {
      dispatch(setCart(response.data.data.products));
    }
  } catch (error) {
    toast.error("Error fetching cart data");
  }
};

export const addProductToCart = (userId, productId) => async (dispatch) => {
  try {
    const response = await api.post(`/user/cart/${userId}`, { productId }, {
    });
    if (response.data.success) {
      dispatch(addToCart(productId));
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error("Error adding product to cart");
  }
};

export const incrementCartQuantity = (userId, productId) => async (dispatch) => {
  try {
    const response = await api.put(`/user/cart/${userId}`, { productId }, {
    });
    if (response.data.cart) {
      dispatch(incrementQuantity(productId));
    }
  } catch (error) {
    toast.error("Error incrementing product quantity");
  }
};

export const decrementCartQuantity = (userId, productId) => async (dispatch) => {
  try {
    const response = await api.put(`/user/cart/${userId}`, { productId }, {
    });
    if (response.data.success) {
      dispatch(decrementQuantity(productId));
    }
  } catch (error) {
    toast.error("Error decrementing product quantity");
  }
};

export const removeProductFromCart = (userId, productId) => async (dispatch) => {
  try {
    const response = await api.delete(`/user/cart/${userId}`, {
      data: { productId }
    });
    if (response.data.success) {
      dispatch(removeFromCart(productId));
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error("Error removing product from cart");
  }
};

export default cartSlice.reducer;
