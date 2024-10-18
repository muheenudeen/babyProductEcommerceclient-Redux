import React from 'react';
import { Link } from 'react-router-dom';

const HomeModal = ({ isOpen, onClose, selectedProduct }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{selectedProduct.title}</h2>
        <img
          src={selectedProduct.imageSrc}
          className="w-full h-64 object-cover rounded"
          alt={selectedProduct.description}
        />
        <p className="mt-4 text-gray-600">{selectedProduct.description}</p>
        <p className="mt-2 text-xl text-gray-800 font-semibold">
          ${selectedProduct.price}
        </p>
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
        <Link to="/shop">
        <button className='mt-4 bg-green-500 text-white py-2 px-4 rounded ml-64'>
          shop
        </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeModal;
