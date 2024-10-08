import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
            state.userId = action.payload
        },

        logoutSuccess : (state,action) =>{
            state.isLoggedIn = false;
            state.userId=""
            localStorage.removeItem("id")
        }
    }
})

export const {loginSuccess, logoutSuccess} = authSlice.actions

export const login = (email, password) => async (dispatch) =>{
    const navigate = useNavigate()

    try {
        
        const res = await axios.get("")
        const adminData = email==='admin@gmail.com' && password==='12345';
        const findData = res.data.find((item)=> item.email ===email && item.password===password)
        const exitData = res.data.find((item)=> item.email === email && item.password !==password)

        if(adminData){
            toast.success('welcome admin')
            localStorage.setItem('id',email)
            dispatch(loginSuccess(email))
            setTimeout(()=>navigate("/adminhome"),1000)
        }else if (findData){
            if(findData.isBlocked){
                toast.error("you are blocked")
            }else{
                toast.success('login successful')
                localStorage.setItem('id',findData.id)
                localStorage.setItem('user',JSON.stringify(findData))
                dispatch(loginSuccess(findData.id))
                setTimeout(()=>navigate("/"),1000)
            }
        }else if (exitData){
            toast.error('enter your password correctly')
        }else{
            toast('you dont have an account')
            setTimeout(()=>navigate("/signup"),1000);

        }

    } catch (error) {
        console.log("error",error);
        
        
    }
}

export const logout = ()=>(dispatch) =>{
    dispatch(logoutSuccess())
}

export default authSlice.reducer