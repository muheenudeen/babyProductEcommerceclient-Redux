import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    order : [],
    status:'idle',
}

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () =>{

    const response = await axios.get("")
    return response.data.order;
})

const orderSlice = createSlice ({
    name:'order',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchOrders.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state,action)=>{
            state.status('succeeded')
            state.order = action.payload;
        })
        .addCase(fetchOrders.rejected, (state) =>{
            state.status= 'failed'
        })
    }
})

export default orderSlice.reducer