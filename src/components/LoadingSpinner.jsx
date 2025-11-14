import React from "react";

const LoadingSpinner = ({ size = 40 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-10 h-10 border-4 border-t-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
