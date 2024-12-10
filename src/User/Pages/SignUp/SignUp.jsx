import React, { useState } from 'react';
import { useFormik } from 'formik';
import 'tailwindcss/tailwind.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../../utis/axios';
import toast from 'react-hot-toast';

function SignUp() {
  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fname: '',
      email: '',
      password: '',
      confirmPassword: '',
      cart: [],
      order: [],
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await api.post('/user/signup', values);
        if (response.status === 200) {
          setNotification('Signup successful!');
          toast.success('Signup successful!');
          resetForm();
          setTimeout(() => navigate('/login'), 1000);
        }
      } catch (error) {
        console.error('There was an error!', error);
        toast.error('Signup failed! Please try again.');
      }
    },
    validate: (values) => {
      let errors = {};
      if (!values.fname) errors.fname = 'First Name is required';
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Invalid email format';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(values.password)
      ) {
        errors.password =
          'Password must include uppercase, lowercase, a number, and a special character';
      }
      if (!values.confirmPassword) {
        errors.confirmPassword = 'Confirm Password is required';
      } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords must match';
      }
      return errors;
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
        {notification && (
          <div className="mb-4 p-3 text-center bg-green-500 text-white rounded">
            {notification}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="John"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fname}
            />
            {formik.touched.fname && formik.errors.fname && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.fname}</div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="example@mail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
