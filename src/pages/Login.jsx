// src/pages/Login.jsx
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
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e => setEmail(e.target.value)} required className="input input-bordered w-full" placeholder="Email" type="email" />
        <input value={password} onChange={e => setPassword(e.target.value)} required className="input input-bordered w-full" placeholder="Password" type="password" />
        <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div className="mt-4 text-sm">
        Don't have an account? <Link to="/register" className="text-primary">Register</Link>
      </div>
    </div>
  );
};

export default Login;
