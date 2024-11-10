import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utilities/UserContext";
import { SyncLoader } from "react-spinners";

const OrdersList = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/allorders`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setOrders(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load order data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <SyncLoader color="#3498db" size={20} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">All Orders</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">
                {order.user?.name || "Guest"}
              </td>
              <td className="border px-4 py-2">
                ${order.totalAmount.toFixed(2)}
              </td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
