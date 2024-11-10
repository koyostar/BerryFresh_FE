import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utilities/UserContext";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";
import EditProduct from "./EditProduct";
import { MdEdit } from "react-icons/md";

const ProductStock = ({ toProperCase }) => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/product/all`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        const sortedProducts = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setProducts(sortedProducts);
        setError("");
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load product data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdate = () => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/product/all`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error refreshing products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div>
        <SyncLoader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="w-full p-4">
      <h3 className="text-2xl font-bold mb-4">Product Stock Management</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full mt-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-center p-2">Image</th>
              <th className="text-center p-2">Product</th>
              <th className="text-center p-2">Category</th>
              <th className="text-center p-2">Origin</th>
              <th className="text-center p-2">Price</th>
              <th className="text-center p-2">Stock</th>
              <th className="text-center p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="m-2 h-20 w-20"
                  />
                </td>
                <td className="p-2">{toProperCase(product.name)}</td>
                <td className="p-2">{product.category}</td>
                <td className="p-2">{product.origin}</td>
                <td className="p-2">${product.price.toFixed(2)}</td>
                <td className="p-2">{product.currentStock}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    <MdEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>{" "}
      {isEditModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <EditProduct
            product={selectedProduct}
            handleCloseModal={handleCloseModal}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
};

export default ProductStock;