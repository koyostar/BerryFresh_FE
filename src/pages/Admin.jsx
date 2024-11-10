import React, { useState } from "react";
import AddProduct from "../components/AddProduct";
import ProductStock from "../components/ProductStock";
import UsersList from "../components/UsersList";
import OrdersList from "../components/OrdersList";

const AdminPage = ({ toProperCase }) => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="mt-10">
      <h2 className="font-bagel text-amber-500 text-3xl font-bold text-center mb-4 mt-10">
        Admin Dashboard
      </h2>
      <div className="flex mb-0">
        <button
          onClick={() => setActiveTab("orders")}
          className={`w-1/3 px-4 py-2 font-bold  rounded-t-lg mr-1 ${
            activeTab === "orders"
              ? "bg-amber-500 text-white"
              : "bg-amber-100 text-amber-400"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`w-1/3 px-4 py-2 font-bold  rounded-t-lg mr-1 ${
            activeTab === "users"
              ? "bg-amber-500 text-white"
              : "bg-amber-100 text-amber-400"
          }`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={`w-1/3 px-4 py-2 font-bold  rounded-t-lg mr-1 ${
            activeTab === "products"
              ? "bg-amber-500 text-white"
              : "bg-amber-100 text-amber-400"
          }`}
        >
          Product Stock
        </button>
      </div>
      <div className="bg-white p-6">
        {activeTab === "orders" && <OrdersList />}
        {activeTab === "users" && <UsersList />}
        {activeTab === "products" && (
          <ProductStock toProperCase={toProperCase} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
