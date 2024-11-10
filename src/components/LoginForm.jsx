import { useContext, useState } from "react";
import { UserContext } from "../utilities/UserContext";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message || "Invalid credentials, please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid credentials, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form
        onSubmit={handleLogin}
        className="max-w-sm mx-auto bg-white text-black p-6 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white font-bold mt-4 py-2 px-4 rounded hover:bg-blue-600 transition w-full"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
