import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register, loading, error } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Donor",
  });
  const [localError, setLocalError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setLocalError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
      );
      navigate("/login");
    } catch {
      setLocalError(error || "Registration failed");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-lg w-96 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-white">Register</h2>

        {localError && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-400 rounded">
            {localError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
          >
            <option>Donor</option>
            <option>Patient</option>
          </select>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Full Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-4 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 mb-6 bg-gray-800 text-white rounded border border-gray-700 focus:border-green-500 focus:outline-none"
            placeholder="Confirm Password"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 p-3 rounded font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:text-green-400">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
