import React, { useState } from "react";

const CulturalDetailsDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-[360px]">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-56 px-4 py-2 bg-gray-50 rounded-lg shadow-sm
        text-gray-700 font-medium text-base transition-colors duration-200 focus:outline-none"
      >
        Cultural Details
        <svg
          className={`ml-2 w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-2 px-4 text-gray-700 text-sm">
            {/* Dropdown content goes here */}
            More cultural details here.
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalDetailsDropdown;
