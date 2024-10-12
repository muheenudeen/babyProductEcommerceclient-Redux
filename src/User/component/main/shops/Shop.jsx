import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Navbar from "../../../navbar/NavbarLink"; 
import Footer from "../../../Pages/footers/Footer";  
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../app/Slice/cartSlice/cartSlice";
import api from "../../../../../utis/axios";
// import { AuthContext } from "../../../AuthContext/AuthContext";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("");
  // const { addToCart, isLoggedIn } = useContext(AuthContext);


  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

  useEffect(() => {
    api.get("/user/products")
      .then((response) => {
        if(response.data.success)
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product data!", error);
      });
  }, []);

  const handleSearchChange = (searchValue) => {
    setSearchItem(searchValue);
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart(product))
      // addToCart(product);
    } else {
      alert('Please loging.');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.description?.toLowerCase().includes(searchItem.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar onSearch={handleSearchChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-stone-100">
        {filteredProducts.map((product) => (
          // <div key={product.id} className="p-4 bg-white rounded-lg shadow-lg">
          //   <img src={product.url} className="w-full h-48 object-cover rounded-t-lg" alt={product.description} />
          //   <div className="p-2">
          //     <p className="text-lg font-semibold">{product.description}</p>
          //     <p>{product.name}</p>
          //     <p className="text-gray-700">${product.price}</p>
          //     <button onClick={() => handleAddToCart(product)} className="bg-blue-950 text-white p-3 rounded-2xl mt-4">
          //       Add to cart
          //     </button>
          //   </div>
          // </div>

          <div key={product.id || product.name + product.price} className="p-4 bg-white rounded-lg shadow-lg">
  <img src={product.imageSrc} className="w-full h-48 object-cover rounded-t-lg" alt={product.description} />
  <div className="p-2">
    <p className="text-lg font-semibold">{product.title}</p>
    <p>{product.category}</p>
    <p className="text-gray-700">${product.price}</p>
    <button onClick={() => handleAddToCart(product)} className="bg-blue-950 text-white p-3 rounded-2xl mt-4">
      Add to cart
    </button>
  </div>
          </div>

        ))}
      </div>
      <Footer />
    </>
  );
}

export default Shop;
