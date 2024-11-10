import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../utilities/UserContext";
import { SyncLoader } from "react-spinners";

const UsersList = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user || !user.token) {
        setError("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/allusers`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUsers(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <SyncLoader color="#3498db" size={20} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-10">{error}</p>;
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-2">All Users</h3>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">User ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
