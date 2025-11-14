import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Pay Your Bills Instantly",
    desc: "Fast, secure and effortless payments for electricity, gas, water & internet.",
    img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?q=80&w=1600",
  },
  {
    title: "Download Your Billing Reports",
    desc: "Generate and save PDF receipts for every transaction — anytime, anywhere.",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=1600",
  },
  {
    title: "Track All Utilities in One Place",
    desc: "Simplify your life — manage monthly bills from one powerful dashboard.",
    img: "https://images.unsplash.com/photo-1597764691457-16ab12c9f8e2?q=80&w=1600",
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${slides[index].img})`,
            }}
          >
            
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
              <div className="px-8 sm:px-16 max-w-2xl text-white space-y-4">
                <motion.h2
                  key={slides[index].title}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl sm:text-4xl font-bold leading-snug"
                >
                  {slides[index].title}
                </motion.h2>
                <motion.p
                  key={slides[index].desc}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-lg text-gray-200"
                >
                  {slides[index].desc}
                </motion.p>
                
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
