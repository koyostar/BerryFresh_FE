import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AvatarMenu from "./AvatarMenu";
import { UserContext } from "../utilities/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="flex justify-around mt-5 font-bagel text-amber-500 text-xl font-bold underline decoration-wavy">
      <Link
        to="/shop"
        className="px-4 rounded-md hover:text-white hover:bg-amber-500"
      >
        Fresh Fruits
      </Link>
      <Link
        to="/cart"
        className="px-4 rounded-md hover:text-white hover:bg-amber-500"
      >
        Shopping Cart
      </Link>
      {user && user.userType === "Admin" && (
        <Link
          to="/admin"
          className="px-4 rounded-md hover:text-white hover:bg-amber-500"
        >
          Admin
        </Link>
      )}

      <AvatarMenu />
    </nav>
  );
};

export default Navbar;
