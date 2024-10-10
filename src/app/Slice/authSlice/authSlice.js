import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../../../utis/axios";

const initialState = {
    isLoggedIn: false,
    userId:localStorage.getItem('id') || "",
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginSuccess : (state, action) =>{
            state.isLoggedIn = true;
            state.userId = action.payload;
        },

        logoutSuccess : (state) =>{
            state.isLoggedIn = false;
            state.userId=""
            localStorage.removeItem("id")
        }
    }
})

export const {loginSuccess, logoutSuccess} = authSlice.actions

export const login = (email, password, navigate) => async (values) => {
    try {
        const res = await api.get("/user/login", values);
        const adminData = email === 'admin@gmail.com' && password === '12345';
        const findData = res.data.find((item) => item.email === email && item.password === password);
        const exitData = res.data.find((item) => item.email === email && item.password !== password);

        if (adminData) {
            toast.success('Welcome admin');
            localStorage.setItem('id', 'admin');
            dispatch(loginSuccess(email));
            setTimeout(() => navigate("/adminhome"), 1000);
        } else if (findData) {
            if (findData.isBlocked) {
                toast.error("You are blocked");
            } else {
                toast.success('Login successful');
                localStorage.setItem('id', findData.id);
                localStorage.setItem('token', findData.token);
                dispatch(loginSuccess(findData.id));
                setTimeout(() => navigate("/"), 1000);
            }
        } else if (exitData) {
            toast.error('Enter your password correctly');
        } else {
            toast('You don\'t have an account');
            setTimeout(() => navigate("/signup"), 1000);
        }

    } catch (error) {
        console.error("Login error:", error);
        toast.error("Something went wrong, please try again.");
    }
};


export const logout = ()=>(dispatch) =>{
    dispatch(logoutSuccess())
}

export default authSlice.reducer