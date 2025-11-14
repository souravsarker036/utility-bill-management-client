import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars, FaRegFileAlt, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* Logo sec */}
        <Link
          to="/"
          className="font-bold text-xl flex items-center gap-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-500"
        >
          <FaRegFileAlt className="text-2xl text-blue-300" />
          UtilityBills
        </Link>

        {/* desktop Menu */}
        <div className="hidden md:flex gap-6 items-center text-white/90">
          {["/", "/bills"].map((path, index) => (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `relative hover:text-blue-400 transition font-medium ${
                  isActive ? "text-blue-400" : ""
                }`
              }
            >
              {path === "/" ? "Home" : "Bills"}

             
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue-400 scale-x-0 hover:scale-x-100 transition-transform origin-left"></span>
            </NavLink>
          ))}

          {user ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 hover:text-blue-400 transition"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-9 h-9 rounded-full border border-white/30 shadow"
                  />
                ) : (
                  <FaUserCircle className="w-9 h-9 text-blue-300" />
                )}
                <span>{user.name}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-52 p-3 rounded-xl bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col gap-2 text-white">
                  <Link
                    to="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="hover:bg-white/10 rounded p-2"
                  >
                    View Profile
                  </Link>

                  <Link
                    to="/my-bills"
                    onClick={() => setProfileOpen(false)}
                    className="hover:bg-white/10 rounded p-2"
                  >
                    My Paid Bills
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="hover:bg-white/10 rounded p-2 text-left text-red-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-blue-400 transition">
                Login
              </NavLink>
              <NavLink to="/register" className="hover:text-blue-400 transition">
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Btn */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black/50 backdrop-blur-xl border-t border-white/20 p-4 flex flex-col gap-3 text-white">
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
