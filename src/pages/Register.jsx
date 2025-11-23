import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const { finishLogin } = useContext(AuthContext);

  const [form, setForm] = useState({ name: "", email: "", password: "", photo: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${api}/auth/register`, form, {
        headers: { 'Content-Type': 'application/json' }
      });
      const token = res.data?.token;
      if (!token) throw new Error("No token returned");
      await finishLogin(token); // saves token and fetches /users/me
      toast.success("Registered & logged in");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

   return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0a0f2d, #0f1e47, #162a63, #1b3a7a)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 sm:p-10 transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-6">
          Create Account
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
          Join us and start managing your bills
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Photo URL (optional)
            </label>
            <input
              name="photo"
              value={form.photo}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-blue-500 dark:text-blue-400 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;