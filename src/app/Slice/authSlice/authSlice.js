
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import api from "../../../../utis/axios";
const initialState = {
  isLoggedIn: false,
  userId: localStorage.getItem('id') || "",};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.userId = "";
      localStorage.removeItem("id");
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    const res = await api.post("/user/login", { email, password });
    const userData = res.data.data;

    if (userData.role === 'admin') {
      toast.success('Welcome admin');
      localStorage.setItem('id', userData._id);
      localStorage.setItem('token', res.data.token);
      dispatch(loginSuccess(userData._id));
      setTimeout(() => navigate("/adminhome"), 1000);
    } else if (userData.isBlocked) {
      toast.error("You are blocked");
    } else {
      toast.success('Login successful');
      localStorage.setItem('id', userData._id);
      localStorage.setItem('token', res.data.token);
      dispatch(loginSuccess(userData._id));
      setTimeout(() => navigate("/"), 1000);
    }
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error('Incorrect password');
    } else if (error.response?.status === 400) {
      toast.error("No user found. Please create a new account.");
      setTimeout(() => navigate("/signup"), 1000);
    } else {
      toast.error("Something went wrong, please try again.");
    }
    console.error("Login error:", error);
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logoutSuccess());
};

export default authSlice.reducer;
