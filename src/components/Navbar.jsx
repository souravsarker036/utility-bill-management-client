import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaRegFileAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <FaRegFileAlt className="text-2xl text-indigo-600" />
          UtilityBills
        </Link>

        {/* Desktop bar */}

        <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>Home</NavLink>
          <NavLink to="/bills" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>Bills</NavLink>

          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-600" />
                )}
                <span>{user.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex flex-col gap-2 z-50">
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2">View Profile</Link>
                  <Link to="/my-bills" onClick={() => setProfileOpen(false)} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2">My Paid Bills</Link>
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2 text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? "text-primary font-semibold" : ""}>Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu  */}

      {open && (
        <div className="md:hidden bg-base-100 shadow p-4 flex flex-col gap-2">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/bills" onClick={() => setOpen(false)}>Bills</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)}>View Profile</Link>
              <Link to="/my-bills" onClick={() => setOpen(false)}>My Paid Bills</Link>
              <button onClick={() => { logout(); setOpen(false); }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
