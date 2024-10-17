import React, { useEffect, useState } from 'react';
import api from '../../../../../utis/axios';

const UserModal = ({ isOpen, onClose, user }) => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    if (user?._id) {
      //details
      api.get(`/user/orders/${user._id}`)
        .then(res => {
          console.log(res);
          setOrderList(res.data.data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
    }
  }, [user?._id]);

  if (!isOpen || !user) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl mb-4">User Details</h2>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Name:</strong> {user.fname}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <h3 className="text-xl mt-4 mb-2">Orders</h3>

        {orderList.length > 0 ? (
          orderList.map((item, index) => (
            <div key={index} className="mb-2 border border-gray-400 p-3">
              <p><strong>Order ID:</strong> {item.Payment_Id}</p>
              <p><strong>Total Amount:</strong> ₹{item.Total_Amount}</p>
              <p><strong>Total Items:</strong> {item.Total_Items}</p>
              <p><strong>Order Date:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>

             
            </div>
          ))
        ) : (
          <p>No orders found for this user.</p>
        )}

        <button  onClick={onClose} className="mt-4 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700" > Close </button>
      </div>
    </div>
  );
};

export default UserModal;
