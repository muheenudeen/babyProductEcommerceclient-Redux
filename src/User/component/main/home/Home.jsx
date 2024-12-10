import React, { useEffect, useState } from 'react';
import Navbar from '../../../navbar/NavbarLink';
import Footer from '../../../Pages/footers/Footer';
import api from '../../../../../utis/axios';
import HomeModal from '../../../../admin/compoent/componants/modal/homeModal';
import Slider from "react-slick"; // Import react-slick for carousel functionality
import "slick-carousel/slick/slick.css"; // Slick CSS
import "slick-carousel/slick/slick-theme.css"; // Slick Theme CSS

function Home() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    api.get('/user/products')
      .then((response) => {
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('There was an error fetching the product data!', error);
      });
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      <Navbar />

      {/* Banner Section */}
      <div className="h-150px bg-stone-100 mt-3">
        <Slider {...sliderSettings} className="h-full">
          <div className="h-full">
            <img
              src="https://www.menmoms.in/cdn/shop/files/Baby-Fashion-Clothes-Category-Page-Banner-Desktop.jpg?v=1727780797"
              alt="Baby Fashion"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-full">
            <img
              src="https://www.menmoms.in/cdn/shop/files/Sale-Category-Page-Banner-Desktop.jpg?v=1727779570"
              alt="Baby Sale"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-full">
            <img
              src="https://www.menmoms.in/cdn/shop/files/The_biggest_Festive_Sale_-1st-banner_12_nov.jpg?v=1731399204&width=1500"
              alt="Baby Sale 70% Off"
              className="w-full h-full object-cover"
            />
          </div>
        </Slider>
      </div>

      {/* Product Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-stone-100">
        {products.map((product) => (
          <div
            key={product._id}
            className="p-4 bg-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => openModal(product)}
          >
            <img
              src={product.imageSrc}
              className="w-full h-48 object-cover rounded-t-lg"
              alt={product.description}
            />
            <div className="p-2">
              <p className="text-lg font-semibold">{product.title}</p>
              <p className="text-gray-700">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      <HomeModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedProduct={selectedProduct}
      />

      <Footer />
    </>
  );
}

export default Home;
