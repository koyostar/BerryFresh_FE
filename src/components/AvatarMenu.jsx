import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utilities/UserContext";

const AvatarMenu = () => {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && !event.target.closest(".avatar-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative avatar-menu">
      <button
        onClick={handleToggleMenu}
        className="flex items-center space-x-2"
      >
        <FaUserCircle className="text-3xl" />
      </button>

      {isOpen && (
        <div className="font-roboto absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg text-base text-nowrap">
          <ul className="text-gray-700 p-4">
            {user ? (
              <>
                <h3 className="mb-2">Hi {user.name}</h3>
                <li className="text-sm p-2 rounded-md  hover:bg-amber-500 hover:text-yellow-100">
                  <Link to="/account">My Account</Link>
                </li>
                <li className="text-sm p-2 rounded-md hover:bg-amber-500 hover:text-yellow-100">
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="text-sm p-2 rounded-md hover:bg-amber-500 hover:text-yellow-100">
                  <Link to="/login">Login</Link>
                </li>
                <li className="text-sm p-2 rounded-md hover:bg-amber-500 hover:text-yellow-100">
                  <Link to="/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvatarMenu;
