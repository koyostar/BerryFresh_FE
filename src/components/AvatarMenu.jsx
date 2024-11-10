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
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="text-gray-700">
            {user ? (
              <>
                <h3>Hi {user.name}</h3>
                <li className="p-2 hover:bg-gray-100">
                  <Link to="/account">Account</Link>
                </li>
                <li className="p-2 hover:bg-gray-100">
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
                <li className="p-2 hover:bg-gray-100">
                  <Link to="/login">Login</Link>
                </li>
                <li className="p-2 hover:bg-gray-100">
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
