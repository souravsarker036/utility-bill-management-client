import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider.jsx";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../firebase.config";
import { FiSun, FiMoon } from "react-icons/fi";

const auth = getAuth(app);

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState('light');

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/login"));
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="font-bold text-xl">UtilityBill</Link>
        <div className="flex items-center space-x-4">
          <NavLink className="hover:text-blue-500" to="/">Home</NavLink>
          <NavLink className="hover:text-blue-500" to="/bills">Bills</NavLink>
          {user ? (
            <>
              <NavLink className="hover:text-blue-500" to="/my-bills">My Pay Bills</NavLink>
              <NavLink className="hover:text-blue-500" to="/profile">Profile</NavLink>
              <button onClick={handleLogout} className="btn btn-sm btn-outline">Logout</button>
            </>
          ) : (
            <>
              <NavLink className="hover:text-blue-500" to="/login">Login</NavLink>
              <NavLink className="hover:text-blue-500" to="/register">Register</NavLink>
            </>
          )}
          <button onClick={toggleTheme} className="ml-2 text-xl">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
