import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utis/axios";

const initialState ={
    order : [],
    status:'idle',
}

export const fetchOrders = createAsyncThunk('order/fetchOrders', async () =>{

    const response = await api.get(`admin/orders/`)
    return response.data.order;
})

const orderSlice = createSlice ({
    name:'order',
    initialState,
    reducers:{

        addOrder: (state, action) => {
            state.order.push(action.payload);
        },
        clearOrders: (state) => {
            state.order = [];
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchOrders.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state,action)=>{
            state.status =('succeeded')
            state.order = action.payload;
        })
        .addCase(fetchOrders.rejected, (state) =>{
            state.status= 'failed'
        })
    }
})

export const {addOrder,clearOrders} = orderSlice.actions

export default orderSlice.reducer