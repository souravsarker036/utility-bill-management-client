import React, { useEffect, useState } from "react";
import axios from "axios";
import BillCard from "../components/BillCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const api = import.meta.env.VITE_API_URL;
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    axios.get(`${api}/bills/latest`)
      .then(res => mounted && setLatest(res.data || []))
      .catch(() => {})
      .finally(() => mounted && setLoading(false));
    return () => mounted = false;
  }, [api]);

  const categories = [
    { title: "Electricity", emoji: "⚡" },
    { title: "Gas", emoji: "🔥" },
    { title: "Water", emoji: "💧" },
    { title: "Internet", emoji: "🌐" },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-lg p-8 text-white bg-gradient-to-r from-indigo-500 to-pink-500 shadow">
        <h1 className="text-3xl font-bold">UtilityBills</h1>
        <p className="mt-2">Track, view and pay your monthly utility bills quickly.</p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map(c => (
            <div
              key={c.title}
              onClick={() => navigate(`/bills?category=${c.title}`)}
              className="p-4 rounded-lg cursor-pointer text-center bg-gradient-to-br from-white/10 to-white/5 hover:scale-105 transition-transform"
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-2 font-semibold">{c.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Bills</h2>
          <button onClick={() => navigate('/bills')} className="btn btn-sm">See all</button>
        </div>

        {loading ? (
          <div className="py-8 flex justify-center"><LoadingSpinner /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latest.map(b => <BillCard key={b._id} bill={b} />)}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
