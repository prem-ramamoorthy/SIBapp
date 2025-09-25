import React, { useState } from "react";
import MemberCard from "../MemberCard/MemberCard";
const ITEMS_PER_PAGE = 4;
const MemberList = ({ members }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(members.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMembers = members.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 my-1 place-items-center">
        {currentMembers.map((member, index) => (
          <MemberCard key={index} member={member} />
        ))}
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 rounded ${
              page === currentPage ? "bg-amber-400 text-black" : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MemberList;
