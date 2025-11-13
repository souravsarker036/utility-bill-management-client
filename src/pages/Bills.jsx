import React, { useEffect, useState } from "react";
import axios from "axios";
import BillCard from "../components/BillCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const Bills = () => {
  const api = import.meta.env.VITE_API_URL;
  const [bills, setBills] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const [params] = useSearchParams();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get(`${api}/bills`)
      .then(res => {
        if (mounted) {
          setBills(res.data || []);
          setFiltered(res.data || []);
        }
      })
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, [api]);

  // set category from query param
  useEffect(() => {
    const cat = params.get("category");
    if (cat) setCategory(cat);
  }, [params]);

  useEffect(() => {
    let data = [...bills];
    if (category) data = data.filter(b => b.category === category);
    if (search) data = data.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
    setFiltered(data);
    setPage(1);
  }, [category, search, bills]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const current = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">All Bills</h2>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <select value={category} onChange={e => setCategory(e.target.value)}
                className="select select-bordered w-full sm:w-60">
          <option value="">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>

        <input value={search} onChange={e=>setSearch(e.target.value)}
               className="input input-bordered w-full sm:w-64" placeholder="Search by title..." />
      </div>

      {loading ? (
        <div className="py-8 flex justify-center"><LoadingSpinner /></div>
      ) : (
        <>
          {current.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {current.map(b => <BillCard key={b._id} bill={b} />)}
            </motion.div>
          ) : (
            <div className="py-12 text-center text-gray-500">No bills found.</div>
          )}
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <div className="join">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`join-item btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bills;
