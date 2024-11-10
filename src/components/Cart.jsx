import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../utilities/UserContext";

const Cart = ({
  cartItems,
  setCartItems,
  onUpdateQuantity,
  onRemoveItem,
  toProperCase,
}) => {
  const { user } = useContext(UserContext);

  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    onUpdateQuantity(productId, newQuantity);
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );

    if (user) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/user/cart`,
          { cart: updatedCart },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Cart Updated", {
          position: "bottom-center",
          autoClose: 3000,
        });
      } catch (error) {
        console.error("Error updating cart:", error);
        toast.error("Failed to update cart. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
        });
      }
    } else {
      saveCartToLocalStorage(updatedCart);
      toast.info("Added to Cart", {
        position: "bottom-center",
        autoClose: 3000,
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    onRemoveItem(productId);
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    if (user) {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/user/cart`,
          { cart: updatedCart },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Item removed from cart", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } catch (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to remove item. Please try again.", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } else {
      saveCartToLocalStorage(updatedCart);
      toast.info("Item removed", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    if (!user && localStorage.getItem("guestCart")) {
      onUpdateQuantity(JSON.parse(localStorage.getItem("guestCart")));
    }
  }, [user, onUpdateQuantity]);

  return (
    <div>
      <h2 className="font-bagel text-amber-500 text-3xl font-bold text-center mb-4 mt-10">
        Your Cart
      </h2>
      <div className="p-6 bg-white text-black shadow-md rounded ">
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
                          handleUpdateQuantity(item._id, newQuantity);
                        }}
                        className="bg-gray-400 border border-gray-400 rounded p-1 w-12 text-center"
                      />
                      <button
                        onClick={() => handleRemoveItem(item._id)}
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
              <Link to="/payment">
                <button className="mt-4 bg-amber-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition">
                  Proceed to Payment
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-xl font-bold text-center">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
