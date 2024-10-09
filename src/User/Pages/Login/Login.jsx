// src/components/Login.js
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../app/Slice/authSlice/authSlice';
import React from 'react';
const Login = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: (values) => {
      const { email, password } = values;
       dispatch(login(email, password,navigate ))
    }
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-6">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-600 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-600 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">Login</button>
        <div className="mt-4 text-center">
          <Link to="/signup" className="text-blue-600">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
