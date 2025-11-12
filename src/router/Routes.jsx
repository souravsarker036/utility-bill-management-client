import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Bills from "../pages/Bills/Bills.jsx";
import BillDetails from "../pages/Bills/BillDetails.jsx";
import MyBills from "../pages/MyBills/MyBills.jsx";
import Login from "../pages/Auth/Login.jsx";
import Register from "../pages/Auth/Register.jsx";
import Profile from "../pages/Profile/Profile.jsx";
import About from "../pages/About/About.jsx";
import Error404 from "../pages/Error/Error404.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import MainLayout from "../layout/MainLayout.jsx";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="bills" element={<Bills />} />
        <Route path="bills/:id" element={<PrivateRoute><BillDetails /></PrivateRoute>} />
        <Route path="my-bills" element={<PrivateRoute><MyBills /></PrivateRoute>} />
        <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
};

export default RoutesApp;
