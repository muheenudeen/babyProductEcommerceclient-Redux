
import React, { useEffect, useState } from 'react';
import Admin from '../navbarAdmin/Admin';
import UpdateModal from '../componants/modal/UpdateModal';
import AddModal from '../componants/modal/AddModal';
import api from '../../../../utis/axios';

const AdminProduct = () => {
    const [products, setProducts] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        api.get("/user/products")
            .then((res) => {
                if (res.data.success) 
                    setProducts(res.data.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleDelete = (productId) => {
        api.delete(`/admin/products/${productId}`)
            .then(response => {
                if (response.data.success) {
                    setProducts(products.filter(product => product._id !== productId));
                    alert('Product deleted successfully');
                } else {
                    alert('Failed to delete product');
                }
            })
            .catch(error => console.error("Error deleting product:", error));
    };

    const handleUpdate = (product) => {
        setSelectedProduct(product);
        setShowUpdateModal(true);
    };

    const handleAddProduct = (newProduct) => {
        api.post("/admin/products", newProduct)
            .then(response => {
                if (response.data.success) {
                    setProducts([...products, response.data.newProduct]);
                    alert('Product added successfully');
                } else {
                    alert('Failed to add product');
                }
            })
            .catch(error => console.error("Error adding product:", error));
    };

    const handleUpdateProduct = (updatedProduct) => {
        api.put(`/admin/products/${updatedProduct._id}`, updatedProduct)
            .then(response => {
                if (response.data.success) {
                    setProducts(products.map(product =>
                        product._id === updatedProduct._id ? updatedProduct : product
                    ));
                    alert('Product updated successfully');
                    setShowUpdateModal(false);
                } else {
                    alert('Failed to update product');
                }
            })
            .catch(error => console.error("Error updating product:", error));
    };

    return (
        <>
            <Admin />
            <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded m-4"
                onClick={() => setShowAddModal(true)}
            >
                Add Product
            </button>
            <div className="p-4 space-y-4">
                {products.map((item) => (
                    <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden border-4 border-gray-400 flex flex-col sm:flex-row items-center">
                        <img
                            className="w-full sm:w-1/4 h-20 object-contain mt-8 sm:mt-0"
                            src={item.imageSrc}
                            alt={item.imageAlt}
                        />
                        <div className="p-4 flex-1">
                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                            <p className="text-gray-700">{item.category}</p>
                            <p className="text-gray-900 text-lg font-bold">₹{item.price}</p>
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between p-5'>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mb-2 sm:mb-0 sm:mr-2"
                                onClick={() => handleUpdate(item)}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={() => handleDelete(item._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {showUpdateModal && (
                <UpdateModal
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                    product={selectedProduct}
                    onUpdate={handleUpdateProduct}
                />
            )}

            {showAddModal && (
                <AddModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddProduct}
                />
            )}
        </>
    );
};

export default AdminProduct;
