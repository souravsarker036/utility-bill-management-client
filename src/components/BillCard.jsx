import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categoryColors = {
  Electricity: "bg-yellow-100 text-yellow-800",
  Gas: "bg-red-100 text-red-800",
  Water: "bg-blue-100 text-blue-800",
  Internet: "bg-purple-100 text-purple-800",
  Unknown: "bg-gray-100 text-gray-800",
};

const BillCard = ({ bill }) => {
  const {
    _id,
    title = "Untitled Bill",
    category = "Unknown",
    amount = "N/A",
    date = new Date(),
    location = "Not specified",
    image,
    description = "No description provided.",
  } = bill || {};

  const imageUrl =
    image && typeof image === "string" && image.trim() !== ""
      ? image
      : `https://via.placeholder.com/600x400?text=${encodeURIComponent(
          title.split(" ")[0]
        )}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-md hover:shadow-xl rounded-2xl overflow-hidden border border-gray-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 w-full bg-gray-200 overflow-hidden rounded-t-2xl">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/600x400?text=Image+Not+Found";
          }}
        />
      </div>

      {/* Card Body */}
      <div className="card-body p-5 space-y-3">
        <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 text-sm">
          <span
            className={`px-2 py-1 rounded-full font-medium ${categoryColors[category]}`}
          >
            {category}
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
            {location}
          </span>
          <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
            {new Date(date).toLocaleDateString()}
          </span>
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
            ${amount}
          </span>
        </div>

        <Link
          to={`/bills/${_id}`}
          className="btn btn-primary w-full mt-3 transition-transform duration-200 hover:scale-105 hover:bg-indigo-700"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default BillCard;
