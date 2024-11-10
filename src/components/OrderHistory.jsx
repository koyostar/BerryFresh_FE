import React, { useState, useEffect } from "react";
import axios from "axios";
import { SyncLoader } from "react-spinners";
import OrderDetails from "./OrderDetails";

const OrderHistory = ({ user }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/order/user`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setOrderHistory(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching order history:", error);
        setError(
          error.response && error.response.status === 404
            ? "No orders found."
            : "Failed to load order history."
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrderHistory();
    }
  }, [user]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div>
        <SyncLoader />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mt-8 mb-4">Order History</h3>
      {orderHistory.length > 0 ? (
        <ul className="border-t border-gray-300 mt-4">
          {orderHistory.map((order) => (
            <li
              key={order._id}
              className="py-2 border-b border-gray-300 cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-black">No order history found.</p>
      )}
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-3xl">
            <OrderDetails order={selectedOrder} />
            <button
              onClick={handleCloseModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
