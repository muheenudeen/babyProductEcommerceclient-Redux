import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import api from '../../../../utis/axios';
import { fetchOrders } from '../../../app/Slice/orderSlice/orderSlice';



const PaymentForm = () => {
    const location = useLocation();
    const { state } = location; 
    const { amounts, orderDetails } = state || { amounts: 0, orderDetails: [] };
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.cart);
    const id = localStorage.getItem('id');
    const user = useSelector((state) => state.auth.userId);

    const [formData, setFormData] = useState({
        firstName: '',
        location: '',
        phone: '',
        pincode: '',
        amount: amounts
    });


    const Subtotal = cart?.reduce((total, product) => {
        if (product?.productId && product.productId.price) {
            return total + product.productId.price * product.quantity;
        }
        return total;
    }, 0);
    
    console.log(Subtotal);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);



    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckout = async (e) => {
        e.preventDefault(); 
        
        try {
            const response = await api.post(`/user/payments/${id}`, {
                currency: "INR",
                amount: Subtotal * 100,
            });
            console.log(response);

            if (response.data.success) {
                const options = {
                    key: "rzp_test_wL1B6IUAUSnQqu", // Replace with live key in production
                    amount: Subtotal * 100,
                    currency: "INR",
                    name: "BabyKu-ecommerce",
                    description: "Test Transaction",
                    image: "https://your-domain.com/path-to-your-image/logo.png", // Use absolute path for image
                    order_id: response.data.data.id,
                    handler: async function (response) {
                        const verificationResponse = await api.post(
                            `/user/paymentverification/${id}`,
                            {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        );
                        if (verificationResponse?.data?.success) {
                          
                            toast.success(`You Paid ₹${Subtotal} Successfully`);
                            navigate("/shop");
                        } else {
                            toast.error("Payment verification failed");
                        }
                    },
                    prefill: {
                        name: user?.username,
                        email: user?.email,
                        contact: user?.contact,
                    },
                    notes: {
                        address: user?.address,
                        pincode: user?.pincode,
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.on("payment.failed", function (response) {
                    alert(`Payment failed: ${response.error.description}`);
                });
                rzp1.open();
            } else {
                toast.error("Failed to create payment order");
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("Cart is empty");
            } else {
                console.error("Payment Creation Failed:", error);
                toast.error("Payment Creation Failed. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Select a Delivery Address</h2>
            <form onSubmit={handleCheckout}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required/>
                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required/>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Phone</label>
                    <input type="text"  name="phone"  value={formData.phone}  onChange={handleChange}  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"  required  />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Pincode</label>
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300" required  />
                </div>
         
                <button onClick={handleCheckout} type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300" >  Continue </button>
               
                <Link to="/" className="w-full text-center bg-lime-900 text-white mt-4 py-2 px-4 rounded-lg hover:bg-lime-800 transition duration-300 block"  >
                    To Home
                </Link>
            </form>
        </div>
    );
};

export default PaymentForm;
