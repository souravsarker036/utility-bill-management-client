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
    setLoading(true);
    axios.get(`${api}/bills`)
      .then(res => {
        const data = res.data.map(b => ({
          ...b,
          image: b.image || "https://via.placeholder.com/600x400?text=No+Image"
        }));
        setBills(data);
        setFiltered(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [api]);

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
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">All Bills</h2>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full sm:w-64">
          <option value="">All Categories</option>
          <option value="Electricity">Electricity</option>
          <option value="Gas">Gas</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full sm:w-64"
          placeholder="Search by title..."
        />
      </div>

      {loading ? (
        <div className="py-10 flex justify-center"><LoadingSpinner /></div>
      ) : current.length > 0 ? (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {current.map((b) => <BillCard key={b._id} bill={b} />)}
        </motion.div>
      ) : (
        <div className="py-10 text-center text-gray-400">No bills found.</div>
      )}

      {filtered.length > perPage && (
        <div className="flex justify-center mt-8">
          <div className="join">
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} className={`join-item btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
