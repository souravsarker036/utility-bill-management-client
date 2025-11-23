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
        const res = await axios.get(`${api}/bills/latest`);
        if (mounted) setLatest(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => (mounted = false);
  }, [api]);

  const categories = [
    { title: "Electricity", emoji: "⚡", color: "from-yellow-300 to-orange-400" },
    { title: "Gas", emoji: "🔥", color: "from-red-300 to-red-500" },
    { title: "Water", emoji: "💧", color: "from-blue-300 to-cyan-500" },
    { title: "Internet", emoji: "🌐", color: "from-purple-300 to-pink-500" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12 px-4 md:px-8 pb-12"
    >
      
      {/* Hero Banner */}
      <Banner />

      {/* Title Section */}
      <div className="text-center px-4">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
          Utility Bill Manager
        </h1>
        <p className="mt-3 text-gray-200 text-lg">
          Track, manage & pay your utility bills effortlessly.
        </p>

        <button
          onClick={() => navigate("/bills")}
          className="mt-5 bg-indigo-600 text-white font-semibold px-7 py-3 
          rounded-xl shadow-lg hover:bg-indigo-700 transition"
        >
          Explore Bills
        </button>
      </div>

      {/*Categories Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-gray-300">
          Bill Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {categories.map((c) => (
            <motion.div
              key={c.title}
              whileHover={{ scale: 1.07 }}
              onClick={() => navigate(`/bills?category=${c.title}`)}
              className={`cursor-pointer p-6 rounded-2xl text-center text-gray-900 
              bg-gradient-to-br ${c.color} shadow-md hover:shadow-xl 
              backdrop-blur-lg bg-opacity-30`}
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
          <h2 className="text-2xl font-bold text-gray-300">Recent Bills</h2>
          <button
            onClick={() => navigate("/bills")}
            className="btn btn-sm btn-outline border-indigo-500 text-indigo-600"
          >
            See all
          </button>
        </div>

        {loading ? (
          <div className="py-10 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : latest.length > 0 ? (
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
    </motion.div>
  );
};

export default Home;
