import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../../../utis/axios";


export const settingWishList = createAsyncThunk(
  "wishlists/settingWishList",
  async (_, { rejectWithValue }) => {
    try {
      const id = localStorage.getItem("id");
      const response = await api.get(`/user/wishlists/${id}`);
      
      return response.data.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch wishlist");
    }
  }
);

export const clearWishListAsync = createAsyncThunk(
  "wishlist/clearWishListAsync",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const id = localStorage.getItem("id");
      await api.delete(`/user/wishlists/${id}`);
      dispatch(settingWishList()); // Fetch updated wishlist after clearing
      toast.success("Wishlist cleared successfully");
    } catch (error) {
      toast.error("Failed to clear wishlist");
      return rejectWithValue("Failed to clear wishlist");
    }
  }
);

export const addToWishListAsync = createAsyncThunk(
  "wishlists/addToWishListAsync",
  async (product, { rejectWithValue, dispatch }) => {
    try {
      const id = localStorage.getItem("id");
      await api.post(`/user/wishlists/${id}`, { productId: product._id });
      dispatch(settingWishList());
      return product;
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("Product already in wishlist");
      } else {
        toast.error("Failed to add to wishlist");
      }
      return rejectWithValue("Failed to add to wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(settingWishList.pending, (state) => {
        state.loading = true;
      })
      .addCase(settingWishList.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(settingWishList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
