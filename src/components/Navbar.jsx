import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-base-100 shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="w-10 h-10 rounded-full"/>
          UtilityBills
        </Link>

        <div className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={({isActive})=>isActive?"text-primary font-semibold":""}>Home</NavLink>
          <NavLink to="/bills" className={({isActive})=>isActive?"text-primary font-semibold":""}>Bills</NavLink>
          {user ? (
            <>
              <NavLink to="/my-bills" className={({isActive})=>isActive?"text-primary font-semibold":""}>My Bills</NavLink>
              <button onClick={logout} className="btn btn-ghost ml-2">Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({isActive})=>isActive?"text-primary font-semibold":""}>Login</NavLink>
              <NavLink to="/register" className={({isActive})=>isActive?"text-primary font-semibold":""}>Register</NavLink>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={()=>setOpen(!open)}>
          <FaBars />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-base-100 shadow p-4 flex flex-col gap-2">
          <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/bills" onClick={()=>setOpen(false)}>Bills</Link>
          {user ? (
            <>
              <Link to="/my-bills" onClick={()=>setOpen(false)}>My Bills</Link>
              <button onClick={()=>{logout(); setOpen(false)}}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={()=>setOpen(false)}>Login</Link>
              <Link to="/register" onClick={()=>setOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
