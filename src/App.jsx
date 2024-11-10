import { useEffect, useState } from "react";
import "./App.css";
import Shop from "./pages/Shop";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Payment from "./pages/Payment";
import UserProvider from "./utilities/UserCOntext";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignupForm";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const toProperCase = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        if (existingItem.quantity + 1 > product.currentStock) {
          toast.error("Cannot add more to cart, stock limit reached", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
          return prevItems;
        }
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      );
      return updatedItems;
    });
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    toast.success("Item removed from cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  return (
    <div>
      <ToastContainer />
      <UserProvider>
        <Router>
          <div className="w-full">
            <h1 className="font-bagel text-7xl text-amber-500">Berry Fresh</h1>
            <Navbar />
            <Routes>
              <Route
                path="/shop"
                element={
                  <Shop
                    onAddToCart={handleAddToCart}
                    toProperCase={toProperCase}
                  />
                }
              />
              <Route
                path="/cart"
                element={
                  <Cart
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    toProperCase={toProperCase}
                  />
                }
              />
              <Route
                path="/payment"
                element={
                  <Payment
                    cartItems={cartItems}
                    setCartItems={setCartItems}
                    toProperCase={toProperCase}
                  />
                }
              />
              <Route path="/account" element={<Account />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<SignUpForm />} />
              <Route
                path="/admin"
                element={<Admin toProperCase={toProperCase} />}
              />
              <Route
                path="/"
                element={
                  <Shop
                    onAddToCart={handleAddToCart}
                    toProperCase={toProperCase}
                  />
                }
              />
            </Routes>
          </div>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
