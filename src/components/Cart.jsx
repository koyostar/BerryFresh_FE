import React from "react";
import { toast } from "react-toastify";

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, toProperCase }) => {
  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="w-full p-4">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full mt-4 ">
            <thead>
              <tr className="">
                <th className="text-center p-2 ">image</th>
                <th className="text-center columns-3xs p-2 ">Item</th>
                <th className="text-center p-2 ">Unit Price</th>
                <th className="text-center p-2 ">Stock</th>
                <th className="text-center p-2 ">Quantity</th>
                <th className="text-center p-2">Sub-Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="">
                  <td className="p-2 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="m-2 h-20 w-20"
                    />
                  </td>
                  <td className="p-2 text-left">{toProperCase(item.name)}</td>
                  <td>
                    <p>${item.price.toFixed(2)}</p>
                  </td>
                  <td>
                    <p>{item.currentStock}</p>
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      min="1"
                      max={item.currentStock}
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value) || 1;
                        if (newQuantity > item.currentStock) {
                          toast.error("Quantity exceeds available stock!", {
                            position: "bottom-center",
                            autoClose: 3000,
                            hideProgressBar: true,
                            closeOnClick: true,
                          });
                          return;
                        }
                        onUpdateQuantity(item._id, newQuantity);
                      }}
                      className="bg-gray-400 border border-gray-400 rounded p-1 w-12 text-center"
                    />
                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="bg-red-400 text-sm m-2  text-white py-1 px-2 rounded hover:bg-red-600 transition"
                    >
                      X
                    </button>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)} </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <h3 className="text-xl font-bold pr-4">
              Total: ${calculateTotal()}
            </h3>
          </div>
        </div>
      ) : (
        <p className="text-xl font-bold text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
