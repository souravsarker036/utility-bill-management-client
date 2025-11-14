import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const api = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // token store local storage
  const saveToken = (token) => {
    localStorage.setItem("token", token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get(`${api}/users/me`)
        .then(res => setUser(res.data || null))
        .catch(() => {
          removeToken();
          setUser(null);
        })
        .finally(() => setLoadingAuth(false));
    } else {
      setLoadingAuth(false);
    }
  }, [api]);

  
  const finishLogin = async (token) => {
    try {
      saveToken(token);
      const res = await axios.get(`${api}/users/me`);
      setUser(res.data || null);
      return res.data;
    } catch (err) {
      removeToken();
      setUser(null);
      throw err;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loadingAuth, finishLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;