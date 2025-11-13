import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BillCard = ({ bill }) => {
  console.log("BillCard received:", bill);

  const {
    _id,
    title = "Untitled Bill",
    category = "Unknown",
    amount = "N/A",
    date = new Date(),
    location = "Not specified",
    image,
    description = "No description provided."
  } = bill || {};

  const imageUrl = image && typeof image === "string" && image.trim() !== ""
  ? image
  : `https://via.placeholder.com/600x400?text=${encodeURIComponent(title.split(' ')[0])}`;


  console.log("Final imageUrl:", imageUrl);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 shadow-md hover:shadow-lg rounded-2xl overflow-hidden border border-gray-700/20"
    >
      <div className="relative h-48 w-full bg-gray-200">
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            console.error("Image load failed:", imageUrl);
            e.target.src = "https://via.placeholder.com/600x400?text=Failed";
          }}
        />
      </div>

      <div className="card-body p-5 space-y-2">
        <h3 className="text-xl font-bold line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>

        <div className="text-sm space-y-1">
          <p><span className="font-medium">Category:</span> {category}</p>
          <p><span className="font-medium">Location:</span> {location}</p>
          <p><span className="font-medium">Date:</span> {new Date(date).toLocaleDateString()}</p>
          <p><span className="font-medium">Amount:</span> ${amount}</p>
        </div>

        <Link
          to={`/bills/${_id}`}
          className="btn btn-sm btn-primary w-full mt-3"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default BillCard;