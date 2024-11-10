import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utilities/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import OrderHistory from "../components/OrderHistory";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const updatedUser = {
        ...response.data,
        token: user.token,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
      toast.success("Profile updated successfully!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  if (!user) {
    return <p>Please log in to view your account details.</p>;
  }

  return (
    <div className="flex text-black">
      <div className="w-1/2 mx-auto bg-white p-6 shadow-md rounded mt-10">
        <OrderHistory user={user} />
      </div>
      <div className="w-1/3 mx-auto bg-white p-6 shadow-md rounded mt-10">
        {" "}
        <h2 className="text-2xl text-black font-bold mb-4">Account Details</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block font-bold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 text-white p-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-black mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 text-white p-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-black mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 text-white p-2 rounded"
              disabled={!isEditing}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-black mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 text-white p-2 rounded"
              disabled={!isEditing}
            />
          </div>
          {isEditing ? (
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="ml-2 bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition"
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Account;
