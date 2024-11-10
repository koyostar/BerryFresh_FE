import { createContext, useState } from "react";
import api from "./api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const loginUser = async (email, password) => {
    try {
      const response = await api.post("/user/login", { email, password });
      const userData = response.data;
      setUser(userData);

      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);

      return {
        success: false,
        message: error.response?.data?.error || "Login failed",
      };
    }
  };

  const registerUser = async (userData) => {
    try {
      const response = await api.post("/user/register", userData);
      setUser(response.data);

      localStorage.setItem("user", JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, loginUser, registerUser, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
