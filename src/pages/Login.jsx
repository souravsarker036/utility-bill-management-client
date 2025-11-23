import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const { finishLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${api}/auth/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' }
      });
      const token = res.data?.token;
      if (!token) throw new Error("No token returned");
      await finishLogin(token);
      toast.success("Login successful");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-[linear-gradient(135deg,#0a0f2d,#0f1e47,#162a63,#1b3a7a)] bg-fixed p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8 sm:p-10 transition-all duration-500">
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100 text-center mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
          Sign in to your account to continue
        </p>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 transition-all"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );

};

export default Login;