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

export const removeFromWishListAsync = createAsyncThunk(
  "wishlists/removeFromWishListAsync",
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      const id = localStorage.getItem("id");
      if (!id) {
        throw new Error("User ID not found in local storage");
      }
      await api.delete(`/user/wishlists/${id}`, { data: { productId } });
      dispatch(settingWishList());
      return productId;
    } catch (error) {
      toast.error("Failed to remove from wishlist");
      return rejectWithValue(
        error.response?.data?.errors || "Failed to remove from wishlist"
      );
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
      if (error.response.status === 400) {
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
      })

     
      .addCase(addToWishListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishListAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

         .addCase(addToWishListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromWishListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishListAsync.fulfilled, (state) => {
        state.loading = false;
        state.items = []; 
      })
      .addCase(removeFromWishListAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default wishlistSlice.reducer;
