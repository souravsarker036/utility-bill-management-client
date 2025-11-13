import React from "react";

const LoadingSpinner = ({ size = 40 }) => {
  const style = { width: size, height: size };
  return (
    <div className="flex items-center justify-center">
      <svg style={style} className="animate-spin" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25" fill="none"></circle>
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none"></path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
