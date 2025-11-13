import React, { useEffect, useState } from "react";
import axios from "axios";
import BillCard from "../components/BillCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Banner from "../components/Banner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const api = import.meta.env.VITE_API_URL;
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    const fetchData = async () => {
      try {
        console.log("Fetching latest bills from:", `${api}/bills/latest`);
        const res = await axios.get(`${api}/bills/latest`);
        console.log("Latest bills response:", res.data);
        if (mounted) setLatest(res.data || []);
      } catch (err) {
        console.error("Axios error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [api]);

  const categories = [
    { title: "Electricity", emoji: "⚡", color: "from-yellow-400 to-orange-500" },
    { title: "Gas", emoji: "🔥", color: "from-red-400 to-red-600" },
    { title: "Water", emoji: "💧", color: "from-blue-400 to-cyan-500" },
    { title: "Internet", emoji: "🌐", color: "from-purple-400 to-pink-500" },
  ];

  return (
    <div className="space-y-10">
      {/* ✅ Banner Section */}
      <Banner />

      {/* Quick Intro / CTA */}
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-indigo-600">
          Utility Bill Manager
        </h1>
        <p className="mt-2 text-gray-600 text-lg">
          Track, manage & pay your utility bills effortlessly.
        </p>
        <button
          onClick={() => navigate("/bills")}
          className="mt-4 bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Explore Bills
        </button>
      </div>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Bill Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {categories.map((c) => (
            <motion.div
              key={c.title}
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate(`/bills?category=${c.title}`)}
              className={`cursor-pointer p-6 rounded-xl text-center text-white bg-gradient-to-br ${c.color} shadow-md hover:shadow-lg`}
            >
              <div className="text-4xl">{c.emoji}</div>
              <div className="mt-2 text-lg font-semibold">{c.title}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Bills Section */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold">Recent Bills</h2>
          <button
            onClick={() => navigate("/bills")}
            className="btn btn-sm btn-outline"
          >
            See all
          </button>
        </div>

        {loading ? (
          <div className="py-8 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : Array.isArray(latest) && latest.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {latest.map((b) => (
              <BillCard key={b._id} bill={b} />
            ))}
          </motion.div>
        ) : (
          <div className="py-10 text-center text-gray-400">
            No recent bills found.
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
