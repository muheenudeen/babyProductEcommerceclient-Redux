import React, { useState } from 'react';

const UpdateModal = ({ show, onClose, product, onUpdate }) => {
  const [imageSrc, setImageSrc] = useState(product ? product.imageSrc : '');
  const [title, setTitle] = useState(product ? product.title : '');
  const [price, setPrice] = useState(product ? product.price : '');

  if (!show) {
    return null;
  }

  const handleSubmit = () => {
    onUpdate({
      ...product,
      imageSrc,
      title,
      price
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <div>
          <label className="block mb-2">
            URL:
            <input type="text" value={imageSrc} onChange={(e) => setImageSrc(e.target.value)} className="border p-2 w-full" />
          </label>
          
          <label className="block mb-2">
            <title></title>:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
          </label>
          <label className="block mb-2">
            Price:
            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 w-full" />
          </label>
        </div>


        <div className="mt-4 flex justify-end">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}> Update</button>
          <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose} > Close</button>
        </div>
      </div>
    </div>
  );
};



export default UpdateModal;
