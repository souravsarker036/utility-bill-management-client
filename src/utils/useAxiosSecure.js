import { useEffect } from "react";
import axios from "axios";

const useAxiosSecure = () => {
  const api = import.meta.env.VITE_API_URL;

  const axiosSecure = axios.create({
    baseURL: api,
  });

  useEffect(() => {
    // attach token
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // global error handling
    axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }, [axiosSecure]);

  return axiosSecure;
};

export default useAxiosSecure;
