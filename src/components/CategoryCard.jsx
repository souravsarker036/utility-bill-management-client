import React from "react";

const CategoryCard = ({ title, icon, onClick }) => (
  <div onClick={onClick} className="card card-compact bg-base-100 shadow hover:shadow-lg cursor-pointer">
    <div className="card-body items-center text-center">
      <div className="text-4xl">{icon}</div>
      <h3 className="card-title mt-2">{title}</h3>
    </div>
  </div>
);

export default CategoryCard;
