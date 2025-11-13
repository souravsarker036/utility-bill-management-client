// src/pages/Register.jsx
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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={handleChange} required className="input input-bordered w-full" placeholder="Name" />
        <input name="email" value={form.email} onChange={handleChange} required className="input input-bordered w-full" placeholder="Email" />
        <input name="photo" value={form.photo} onChange={handleChange} className="input input-bordered w-full" placeholder="Photo URL (optional)" />
        <input name="password" value={form.password} onChange={handleChange} required className="input input-bordered w-full" placeholder="Password" type="password" />
        <button type="submit" className={`btn btn-primary w-full ${loading ? "loading" : ""}`}> {loading ? "Registering..." : "Register"} </button>
      </form>
    </div>
  );
};

export default Register;