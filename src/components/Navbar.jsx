import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex justify-around">
      <Link to="/shop" className=" text-white font-bold hover:text-gray-300">
        Shop
      </Link>
      <Link to="/cart" className=" text-white font-bold hover:text-gray-300">
        Cart
      </Link>
      <Link to="/account" className=" text-white font-bold hover:text-gray-300">
        Account
      </Link>
      <Link to="/admin" className=" text-white font-bold hover:text-gray-300">
        Admin
      </Link>
    </nav>
  );
};

export default Navbar;
