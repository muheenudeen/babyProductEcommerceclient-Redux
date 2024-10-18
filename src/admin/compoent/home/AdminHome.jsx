
import React, { useEffect, useState } from 'react';
import Admin from '../navbarAdmin/Admin';
import api from '../../../../utis/axios';

function AdminHome() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders,setorders]=useState([])

  useEffect(() => {
    api.get("/user/products")
      .then(res => {
        if (res.data.success) {
          setProducts(res.data.data);
        } else {
          console.error(res.data.message);
        }
      })
      .catch(err => {
        console.error("There was an error fetching the product data!", err);
      });
  }, []);

  useEffect(() => {
    api.get("/admin/users")
      .then(res => {
        if (res.data.success) {
          setUsers(res.data.data);
        } else {
          console.error("Error fetching users:", res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  useEffect(() => {
    api.get("/admin/orders")
      .then(res => {
        if (res.data.success) {
          setorders(res.data.data);
        } else {
          console.error("Error fetching users:", res.data.message);
        }
      })
      .catch(err => {
        console.error(err);
      });
  }, []);


  return (
    <>
      <Admin />
      <div className="bg-white min-h-screen flex flex-col items-center p-12">
        <div className="w-full max-w-4xl">
    


          <div className="bg-blue-100 p-8 mb-12 rounded shadow-md hover:shadow-lg transition-shadow">
            <p className="text-xl font-semibold text-center">Total Users: {users.length}</p>
          </div>
        


          <div className="bg-green-100 p-8 mb-12 rounded shadow-md hover:shadow-lg transition-shadow">
            <p className="text-xl font-semibold text-center">Total Products: {products.length}</p>
          </div>

          <div className="bg-red-100 p-8 mb-4 rounded shadow-md hover:shadow-lg transition-shadow">
            <p className="text-xl font-semibold text-center">Total orders: {orders.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
