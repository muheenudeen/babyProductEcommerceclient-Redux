import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    order : [],
    status:'idle',
}

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () =>{

    const response = await axios.get(`admin/orders/`)
    return response.data.order;
})

const orderSlice = createSlice ({
    name:'order',
    initialState,
    reducers:{

        addOrder: (state, action) => {
            state.order.push(action.payload); // Add the new order to the existing orders
        },
        clearOrders: (state) => {
            state.order = []; // Clear all orders
        },
    },
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

export const {addOrder,clearOrders} = orderSlice.actions

export default orderSlice.reducer