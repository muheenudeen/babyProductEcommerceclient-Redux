// import React, { useEffect, useState } from "react";
// import Navbar from "../../../navbar/NavbarLink";
// import Footer from "../../../Pages/footers/Footer";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../../../app/Slice/cartSlice/cartSlice";
// import { settingWishList, addToWishListAsync, removeFromWishListAsync } from "../../../../app/Slice/wishSlice/wishalistSlice";
// import WishalistModal from "../../../../admin/compoent/componants/modal/wishalistModal";
// import api from "../../../../../utis/axios";

// function Shop() {
//   const [products, setProducts] = useState([]);
//   const [searchItem, setSearchItem] = useState("");
//   const [category, setCategory] = useState("");
//   const [wishlistModalOpen, setWishlistModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const wishlistItems = useSelector((state) => state.wishlist.items);

//   useEffect(() => {
//     api
//       .get("/user/products")
//       .then((response) => {
//         if (response.data.success) setProducts(response.data.data)})
//       .catch((error) => {
//         console.error("Error fetching products", error)});

//     if (isLoggedIn) {
//       dispatch(settingWishList())}

//   }, [dispatch, isLoggedIn]);

//   const handleSearchChange = (searchValue) => {
//     setSearchItem(searchValue);
//   };

//   const handleAddToCart = (product) => {
//     if (isLoggedIn) {
//       dispatch(addToCart(product));
//     } else {
//       alert("Please login.");
//     }
//   };



//   const handleAddToWishlist = (product) => {
//     if (isLoggedIn) {
//       dispatch(addToWishListAsync(product));
//     } else {
//       alert("Please login to add to wishlist.");
//     }
//   };

//   const handleShowWishlist = () => {
//     setWishlistModalOpen(true)};

//   const handleCloseWishlistModal = () => {
//     setWishlistModalOpen(false)};

//   const handleRemoveFromWishlist = (product) => {
//     if (isLoggedIn) {
//       dispatch(removeFromWishListAsync(product));
//     } else {
//       alert("Please login and remove product from wishlist");
//     }
//   };

//   const filteredProducts = products.filter((product) => {
//     const matchesSearch = product.title?.toLowerCase().includes(searchItem.toLowerCase());
//     const matchesCategory = category ? product.category === category : true;
//     return matchesSearch && matchesCategory;
//   });

//   const wishlistCount = wishlistItems?.length || 0;

//   return (
//     <>
//       <Navbar onSearch={handleSearchChange} />

//       <div className="flex justify-end mr-4 mt-6">
//         <button onClick={handleShowWishlist} className="relative text-blue-600">
//           <img
//             src="src/assets/favourite.png"
//             className="w-[50px] h-[50px] mb-3"
//             alt="Wishlist"
//           />
//           {wishlistCount > 0 && (
//             <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
//               {wishlistCount}
//             </span>
//           )}
//         </button>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-stone-100">
//         {filteredProducts.map((product) => {
//           const isInWishlist = wishlistItems?.some(item => item?.productId?._id === product._id);
//           {console.log(filteredProducts)}

//           return (

//             <div key={product._id} className="p-4 bg-white rounded-lg shadow-lg">
//               <img src={product.imageSrc} className="w-full h-48 object-cover rounded-t-lg" alt={product.description}/>
//               <div className="p-2">
//                 <p className="text-lg font-semibold">{product.title}</p>
//                 <p>{product.category}</p>
//                 <p className="text-gray-700">${product.price}</p>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="bg-blue-950 text-white p-3 rounded-2xl mt-4">  Add to cart</button>
//                 <button
//                   onClick={() => handleAddToWishlist(product)}
//                   className={`p-3 rounded-2xl mt-4 ml-7 ${isInWishlist ? "bg-blue-500" : "bg-yellow-500"} text-white`}
//                 >
//                   {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
//                 </button>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {wishlistModalOpen && (
//         <WishalistModal onClose={handleCloseWishlistModal}>
//           <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
//           {wishlistItems?.length > 0 ? (
//             <ul>
//               {wishlistItems.map((item) => (
//                 <li key={item?.productId?._id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
//                   <div className="flex items-center space-x-4">
//                     <img src={item?.productId?.imageSrc} className="w-24 h-24 object-cover rounded-lg" alt={item?.productId?.description} />
//                     <div>
//                       <h3 className="text-lg font-semibold">{item?.productId?.title}</h3>
//                       <p className="text-gray-600">{item?.productId?.category}</p>
//                       <p className="text-blue-500 font-semibold">${item?.productId?.price}</p>
//                     </div>
//                   </div>
//                   <button onClick={() => handleRemoveFromWishlist(item?.productId?._id)} className="text-red-600">Remove</button>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>Your wishlist is empty.</p>
//           )}
//         </WishalistModal>
//       )}

//       <Footer />
//     </>
//   );
// }

// export default Shop;


import React, { useEffect, useState } from "react";
import Navbar from "../../../navbar/NavbarLink";
import Footer from "../../../Pages/footers/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../app/Slice/cartSlice/cartSlice";
import { settingWishList, addToWishListAsync, removeFromWishListAsync } from "../../../../app/Slice/wishSlice/wishalistSlice";
import WishalistModal from "../../../../admin/compoent/componants/modal/wishalistModal";
import api from "../../../../../utis/axios";
import { toast } from "react-toastify";

function Shop() {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [category, setCategory] = useState("");
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false);

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cart = useSelector((state) => state.cart.cart);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    api
      .get("/user/products")
      .then((response) => {
        if (response.data.success) setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products", error);
      });

    if (isLoggedIn) {
      dispatch(settingWishList());
    }
  }, [dispatch, isLoggedIn]);

  // useEffect(() => {
  //   dispatch(calculateTotal());
  // }, [cart, dispatch]);

  const handleSearchChange = (searchValue) => {
    setSearchItem(searchValue);
  };

  const handleAddToCart = (product) => {
    if (isLoggedIn) {
      dispatch(addToCart(product));
    } else {
      toast.error("Please login.");
    }
  };

  const handleAddToWishlist = (product) => {
    if (isLoggedIn) {
      dispatch(addToWishListAsync(product));
    } else {
      toast.error("Please login to add to wishlist.");
    }
  };

  const handleShowWishlist = () => {
    setWishlistModalOpen(true);
  };

  const handleCloseWishlistModal = () => {
    setWishlistModalOpen(false);
  };

  const handleRemoveFromWishlist = (product) => {
    if (isLoggedIn) {
      dispatch(removeFromWishListAsync(product));
    } else {
      toast.error("Please login and remove product from wishlist");
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title?.toLowerCase().includes(searchItem.toLowerCase());
    const matchesCategory = category ? product.category === category : true;
    return matchesSearch && matchesCategory;
  });

  const wishlistCount = wishlistItems?.length || 0;

  return (
    <>
      <Navbar onSearch={handleSearchChange} />

      <div className="flex justify-end mr-4 mt-6">
        <button onClick={handleShowWishlist} className="relative text-blue-600">
          <img
            src="src/assets/favourite.png"
            className="w-[50px] h-[50px] mb-3"
            alt="Wishlist"
          />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {wishlistCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-stone-100">
        {filteredProducts.map((product) => {
          const isInWishlist = wishlistItems?.some((item) => item?.productId?._id === product._id);

          return (
            <div key={product._id} className="p-4 bg-white rounded-lg shadow-lg">
              <img src={product.imageSrc} className="w-full h-48 object-cover rounded-t-lg" alt={product.description} />
              <div className="p-2">
                <p className="text-lg font-semibold">{product.title}</p>
                <p>{product.category}</p>
                <p className="text-gray-700">${product.price}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-950 text-white p-3 rounded-2xl mt-4"
                >
                  Add to cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className={`p-3 rounded-2xl mt-4 ml-7 ${isInWishlist ? "bg-blue-500" : "bg-yellow-500"} text-white`}
                >
                  {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {wishlistModalOpen && (
        <WishalistModal onClose={handleCloseWishlistModal}>
          <h2 className="text-xl font-semibold mb-4">Your Wishlist</h2>
          {wishlistItems?.length > 0 ? (
            <ul>
              {wishlistItems.map((item) => (
                <li key={item?.productId?._id} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img src={item?.productId?.imageSrc} className="w-24 h-24 object-cover rounded-lg" alt={item?.productId?.description} />
                    <div>
                      <h3 className="text-lg font-semibold">{item?.productId?.title}</h3>
                      <p className="text-gray-600">{item?.productId?.category}</p>
                      <p className="text-blue-500 font-semibold">${item?.productId?.price}</p>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFromWishlist(item?.productId?._id)} className="text-red-600">Remove</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your wishlist is empty.</p>
          )}
        </WishalistModal>
      )}

      <div className="bg-gray-100 p-4">
        <h2 className="text-xl font-semibold">Cart Total</h2>
        <p>Total Amount: ${totalAmount}</p>
      </div>

      <Footer />
    </>
  );
}

export default Shop;



