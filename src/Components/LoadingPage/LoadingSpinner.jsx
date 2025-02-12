import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="loading loading-spinner w-12 h-12 text-green-500 animate-spin"></span>
      <span className="loading loading-spinner w-12 h-12 text-teal-500 animate-spin absolute opacity-50"></span>
    </div>
  );
};

export default LoadingSpinner;
