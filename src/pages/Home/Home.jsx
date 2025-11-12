import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";

const categories = [
  { name: "Electricity", img: "https://img.icons8.com/color/96/electricity.png" },
  { name: "Gas", img: "https://img.icons8.com/color/96/gas-cylinder.png" },
  { name: "Water", img: "https://img.icons8.com/color/96/water.png" },
  { name: "Internet", img: "https://img.icons8.com/color/96/internet.png" },
];

const Home = () => {
  const [latestBills, setLatestBills] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/bills/latest`)
      .then(res => setLatestBills(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      {/* Banner Carousel */}
      <div className="carousel w-full h-64 md:h-96 mb-10 rounded-lg overflow-hidden shadow-lg">
        {[banner1, banner2, banner3].map((img, i) => (
          <motion.div
            key={i}
            className="carousel-item relative w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <img src={img} className="w-full object-cover h-64 md:h-96 rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-2xl md:text-4xl font-bold">
              Manage Your Utility Bills Easily
            </div>
          </motion.div>
        ))}
      </div>

      {/* Categories */}
      <section className="my-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition hover:scale-105 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img src={cat.img} alt={cat.name} className="w-16 h-16 mb-2" />
              <span className="font-semibold">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Latest Bills */}
      <section className="my-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Latest Bills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestBills.map((bill) => (
            <motion.div
              key={bill._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-xl transition p-4"
              whileHover={{ scale: 1.03 }}
            >
              <img src={bill.image} alt={bill.title} className="w-full h-40 object-cover rounded" />
              <h3 className="font-bold text-lg mt-2">{bill.title}</h3>
              <p className="text-gray-500 dark:text-gray-400">{bill.category}</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">{bill.location}</p>
              <p className="text-blue-600 font-semibold mt-1">৳{bill.amount}</p>
              <Link to={`/bills/${bill._id}`}>
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
                  See Details
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Sections */}
      <section className="my-16 bg-blue-50 dark:bg-gray-700 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose UtilityBill?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
          <li>Track and pay your monthly bills easily</li>
          <li>Secure user authentication with Firebase</li>
          <li>Responsive and attractive UI for all devices</li>
          <li>Download PDF reports of your paid bills</li>
          <li>Filter and manage bills with ease</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
