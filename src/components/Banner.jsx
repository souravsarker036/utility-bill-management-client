import React from "react";
import { motion } from "framer-motion";

const slides = [
  { title: "Pay your current month bills quickly", desc: "Secure and easy payments", img: "https://via.placeholder.com/1200x400?text=Pay+Bills" },
  { title: "Download paid bill history", desc: "PDF export for records", img: "https://via.placeholder.com/1200x400?text=PDF+Reports" },
  { title: "Track Electricity, Gas, Water & Internet", desc: "All utilities in one place", img: "https://via.placeholder.com/1200x400?text=All+Utilities" },
];

const Banner = () => {
  return (
    <div className="carousel w-full rounded-lg overflow-hidden">
      {slides.map((s, idx) => (
        <motion.div key={idx} className="carousel-item relative w-full" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.8}}>
          <div className="h-56 sm:h-72 md:h-96 w-full bg-cover bg-center flex items-center" style={{ backgroundImage: `url(${s.img})` }}>
            <div className="bg-black/50 p-6 rounded ml-6 max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">{s.title}</h2>
              <p className="text-white mt-2">{s.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Banner;
