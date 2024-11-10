import React, { useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductStock from "../components/ProductStock";
import UsersList from "../components/UsersList";
import OrdersList from "../components/OrdersList";

const AdminPage = ({ toProperCase }) => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white text-black shadow-md rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-bold rounded ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 font-bold rounded ${
            activeTab === "users" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 font-bold rounded ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Product Stock
        </button>
        <button
          onClick={handleOpenModal}
          className="bg-blue-500 text-white px-4 py-2 font-bold rounded hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </div>

      {activeTab === "orders" && <OrdersList />}
      {activeTab === "users" && <UsersList />}
      {activeTab === "products" && <ProductStock toProperCase={toProperCase} />}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <AddProduct handleCloseModal={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
