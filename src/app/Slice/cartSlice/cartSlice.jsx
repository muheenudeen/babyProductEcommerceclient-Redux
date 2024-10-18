import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../../../utis/axios";
import toast from "react-hot-toast";



const INITIAL_STATE = {
  cart:[],
  totalAmount: 0,
};




export const settingCart = createAsyncThunk(
  "cartSlice/settingCart",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");
      if (!id) {
        return rejectWithValue("User ID not found");
      }


      const res = await api.get(`/user/cart/${id}`);
      return res.data.data.products;
    } catch (error) {
      console.error("Something went wrong!", error.message);
      return rejectWithValue(error.message);
    }
  }
);




export const addToCart = createAsyncThunk(
  "cartSlice/addToCart",
  async (products, { getState }) => {
    try {
      const id = localStorage.getItem("id");

      const cart = getState().cart.cart;
      const existingProduct = cart.find(item => item.productId._id === products._id);

      if (existingProduct) {
        await api.post(`/user/cart/${id}`, {
          productId: products._id,
          quantity: existingProduct.quantity + 1, 
        });
      } else {
        await api.post(`/user/cart/${id}`, {
          productId: products._id,
          quantity: products.quantity || 1,
        });
      }

      const res = await api.get(`/user/cart/${id}`);
      toast.success(`${products.title} added to cart!`);
      return res.data.data.products;
    } catch (error) {
      console.error("Something went wrong!", error.message);
      toast.error("product alredy added");
      throw error;
    }
  }
);




export const removeFromCart = createAsyncThunk(
  "cartSlice/removeFromCart",
  async (productId, { getState }) => {
    try {
      const id = localStorage.getItem("id");

      const deleteProduct = await api.delete(`/user/cart/${id}`, {
        data: { productId: productId },
      });
     
      


      if (deleteProduct) {
        const res = await api.get(`/user/cart/${id}`);
      
        return res.data.data.products;
      }
    } catch (error) {
      toast.error("something went wrong!");
      throw error;
    }
  }
);




export const incrementQuantity = createAsyncThunk(
  "cartSlice/incrementQuantity",
  async (products, { getState }) => {
    try {
      const id = localStorage.getItem("id");

      await api.post(`user/cart/${id}`, {
        productId: products.productId._id,
        quantity: 1,
        action: "increment",
      });

      const res = await api.get(`/user/cart/${id}`);
      return res.data.data.products;
    } catch (error) {
      console.log("Something went wrong!");
      throw error;
    }
  }
);
export const decrementQuantity = createAsyncThunk(
  "cartSlice/decrementQuantity",
  async (product, { getState }) => {
    try {
      const id = localStorage.getItem("id");

      if (product.quantity > 1) {
        await api.post(`/user/cart/${id}`, {
          productId: product.productId._id,
          action: "decrement",
        });
      
      }

      const res = await api.get(`/user/cart/${id}`);
      return res.data.data.products;
    } catch (error) {
      console.log("Something went wrong!", error);
      throw error;
    }
  }
);


const cartSlice = createSlice({
  name: "cartSlice",
  initialState: INITIAL_STATE,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
     
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(settingCart.pending, (state) => {
        console.log("cart is loading");
      })
      .addCase(settingCart.rejected, (state) => {
        console.log("Error in fetching cart");
      })
      .addCase(settingCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        console.log("Cart updated successfully");
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(incrementQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decrementQuantity.fulfilled, (state, action) => {
        state.cart = action.payload;
      });
  },
});

export default cartSlice.reducer;
