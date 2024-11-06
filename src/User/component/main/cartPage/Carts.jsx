import { useNavigate } from "react-router-dom";
import Navbar from "../../../navbar/NavbarLink";
import Footer from "../../../Pages/footers/Footer";
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart, incrementQuantity, decrementQuantity,settingCart } from "../../../../app/Slice/cartSlice/cartSlice";
import { useEffect } from "react";


const Carts = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id=localStorage.getItem("id")

  
  useEffect(() => {
    if(id)
    dispatch(settingCart());
  
  }, [dispatch,id]);



  const totalAmount = cart.reduce((total, product) => total + product.productId.price * product.quantity,0);

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
    
  };
  

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };
const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };


  const handleCheckout = () => {
    navigate("/paymentform", {
      state: { amount: totalAmount, orderDetails: cart },
      
    });
  };


console.log('heloo');


  return (
    <>
      <Navbar />


      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-full bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">{cart.length} Items</h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center"> Quantity</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center"> Price</h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center"> Total</h3>
            </div>




            {cart.map((product) => (
  <div key={product.productId._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
    <div className="flex w-2/5">
      <div className="w-20">
        <img className="h-24" src={product.productId.imageSrc} alt={product.productId.description} />
      </div>
      <div className="flex flex-col justify-between ml-4 flex-grow">
        <span className="font-bold text-sm">{product.productId.title}</span>
        <button onClick={() => handleRemove(product.productId._id)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">
          Remove
        </button>
      </div>
    </div>
    <div className="flex justify-center w-1/5">
      <button onClick={() => handleDecrement(product)}>
        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32C448 222.3 433.7 208 416 208z" />
        </svg>
      </button>
      <input className="mx-2 border text-center w-8" type="text" value={product.quantity} readOnly />
      <button onClick={() => handleIncrement(product)}>
        <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32H208c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32C448 222.3 433.7 208 416 208z" />
        </svg>
      </button>
    </div>
    <span className="text-center w-1/5 font-semibold text-sm">${product.productId.price}</span>
    <span className="text-center w-1/5 font-semibold text-sm">${product.productId.price * product.quantity}</span>
  </div>
))}

            <div className="flex justify-end mt-10">
              <h1 className="font-semibold text-2xl">Total: ${totalAmount} </h1>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-orange-600"
            >


              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Carts;












