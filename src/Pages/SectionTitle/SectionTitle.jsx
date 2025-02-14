import React from "react";

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center my-4 relative">
      {/* Title */}
      <h2 className="md:text-4xl text-2xl font-bold text-gray-800 relative inline-block">
        {title}
        {/* Underline animation */}
        <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-gray-600 mt-3 text-lg font-light italic tracking-wide">---{subtitle}---</p>
      )}

      {/* Decorative line */}
      <div className="w-[60%] h-1 bg-gradient-to-r from-green-500 to-amber-500 mx-auto mt-4 "></div>

      {/* Optional: Add a subtle shadow or gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-transparent opacity-20 -z-10"></div>
    </div>
  );
};

export default SectionTitle;