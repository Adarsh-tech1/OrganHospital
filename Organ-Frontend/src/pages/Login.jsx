import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login, loading, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email || !password) {
      setLocalError("Please fill all fields");
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setLocalError(error || "Login failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-lg w-80 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Login</h2>

        {localError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-3 mb-6 bg-gray-800 text-white rounded border border-gray-700 focus:border-blue-500 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:text-blue-400">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
