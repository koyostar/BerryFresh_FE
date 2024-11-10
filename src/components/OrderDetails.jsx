import React from "react";

const OrderDetails = ({ order }) => {
  if (!order) {
    return <div className="text-center mt-5">Order not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="flex border p-4 rounded shadow-md">
        <div className="w-1/2">
          <h3 className="text-xl font-bold mt-4 mb-2"></h3>
          <ul>
            <li className="mb-4">
              <strong>Order ID:</strong> <br />
              {order._id}
            </li>
            <li>
              <strong>Status:</strong> {order.status}
            </li>
            <li>
              <strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}
            </li>
            <li>
              <strong>Order Date:</strong>
              {new Date(order.createdAt).toLocaleDateString()}
            </li>
          </ul>
        </div>
        <div className="w-1/2">
          <h3 className="text-xl font-bold mt-4 mb-2">Shipping Information</h3>
          <ul>
            <li>
              <strong>Recipient Name:</strong>{" "}
              {order.shippingInfo?.recipientName}
            </li>
            <li>
              <strong>Email:</strong> {order.shippingInfo?.email}
            </li>
            <li>
              <strong>Address:</strong> {order.shippingInfo?.address}
            </li>
            <li>
              <strong>Postal Code:</strong> {order.shippingInfo?.postalCode}
            </li>
            <li>
              <strong>Phone Number:</strong> {order.shippingInfo?.phoneNumber}
            </li>
          </ul>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-4 mb-2">Items</h3>
      <table className="w-full border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Product Name</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Price at Purchase</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.productId._id} className="border-b">
              <td className="p-2">{item.productId.name}</td>
              <td className="p-2">{item.quantity}</td>
              <td className="p-2">${item.priceAtPurchase.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
