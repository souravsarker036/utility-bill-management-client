import React from "react";
import { useNavigate } from "react-router-dom";

const BillCard = ({ bill }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
      <img src={bill.image} alt={bill.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{bill.title}</h3>
          <span className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">{bill.category}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">{bill.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <div className="text-sm">
            <div className="font-medium">৳{bill.amount}</div>
            <div className="text-xs text-gray-500">{new Date(bill.date).toLocaleDateString()}</div>
          </div>
          <button
            onClick={() => navigate(`/bills/${bill._id}`)}
            className="btn btn-sm btn-outline"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillCard;
