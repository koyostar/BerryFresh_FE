import React from "react";
import { Link } from "react-router-dom";
import AvatarMenu from "./AvatarMenu";

const Navbar = ({ user }) => {
  return (
    <nav className="flex justify-around">
      <Link to="/shop" className=" text-white font-bold hover:text-gray-300">
        Shop
      </Link>
      <Link to="/cart" className=" text-white font-bold hover:text-gray-300">
        Cart
      </Link>
      <Link to="/admin" className=" text-white font-bold hover:text-gray-300">
        Admin
      </Link>
      <AvatarMenu user={user} />
    </nav>
  );
};

export default Navbar;
