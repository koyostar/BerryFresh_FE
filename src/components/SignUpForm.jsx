import { useContext, useState } from "react";
import { UserContext } from "../utilities/UserContext";
import { useNavigate } from "react-router";

const SignUpForm = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const result = await registerUser(formData);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Registration failed, please try again.");
    }
  };

  return (
    <div className="mt-4">
      <form
        onSubmit={handleSignup}
        className="max-w-sm mx-auto bg-white text-black p-6 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded hover:bg-blue-600 transition w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
