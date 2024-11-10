import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utilities/UserContext";
import { SyncLoader } from "react-spinners";
import OrderDetails from "./OrderDetails";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const OrdersList = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState("");

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

  const handleOrderClick = async (order) => {
    if (!isEditing) {
      setSelectedOrder(order);
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsEditing(true);
    setNewStatus(order.status);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveStatus = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/order-status/${
          selectedOrder._id
        }`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: newStatus }
            : order
        )
      );
      setSelectedOrder((prevOrder) => ({ ...prevOrder, status: newStatus }));
      setIsEditing(false);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
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
      <h3 className="text-xl font-bold text-amber-500 mb-2">All Orders</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">User</th>
            <th className="border px-4 py-2">Total Amount</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">
                {order.user?.name || "Guest"}
              </td>
              <td className="border px-4 py-2">
                ${order.totalAmount.toFixed(2)}
              </td>
              <td className="border px-4 py-2">
                {isEditing && selectedOrder?._id === order._id ? (
                  <select
                    value={newStatus}
                    onChange={handleStatusChange}
                    className="w-full border bg-amber-300 border-gray-300 p-2 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  order.status
                )}
              </td>
              <td className="border px-4 py-2">
                {isEditing && selectedOrder?._id === order._id ? (
                  <>
                    <button
                      onClick={handleSaveStatus}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(order);
                    }}
                    className="bg-amber-500 text-white px-2 py-1 rounded hover:bg-amber-600"
                  >
                    <MdEdit />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-3xl">
            <OrderDetails order={selectedOrder} />

            <button
              onClick={closeModal}
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

export default OrdersList;
