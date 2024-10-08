import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart : [],
};

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers :{
        addToCart:(state,action) =>{
            const productExists = state.cart.some((item)=>item.id === action.payload.id);
            if(productExists) {
                toast.error('this product is already added to the cart');
            }else{
                state.cart.push({...action.payload,quantity:1})
                toast.success('product added to cart')
            }
        },

        removeFromeCart:(state,action) =>{
            state.cart = state.cart.filter((_,i)=>i !== action.payload)
        },

        incrementQuantity : (state,action) =>{
            state.cart[action,payload].quantity++
        },

        decrementQuantity : (state,action) =>{
            if(state.cart[action,payload].quantity>1){
                state.cart[action,payload].quantity--
            }
        },

    },
})

export const {addToCart, removeFromeCart, incrementQuantity, decrementQuantity} = cartSlice.actions

export default cartSlice.reducer;