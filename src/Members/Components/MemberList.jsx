import React, { useState } from "react";
import MemberCard from "../MemberCard/MemberCard";

const ITEMS_PER_PAGE = 5;

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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-20 place-items-center">
        {currentMembers.map((member, index) => (
          <MemberCard key={index} member={{
            profile_image_url: member.profile_image_url,
            blood_group: member.blood_group,
            username: member.user.username,
            company_name: member.company_name,
            verticals: member.verticals,
            chapter: member.chapter,
            region: member.region,
          }} profileurl="" contactdetails={
            { company_phone: member.company_phone, company_email: member.company_email, company_address: member.company_address }
          } culturaldetails={{vagai_category : member.vagai_category , kulam_category : member.kulam_category , native_place : member.native_place , kuladeivam : member.kuladeivam}} link={`${import.meta.env.VITE_BACKEND_SERVER}/profile/${member._id}?user=${member.user._id}`} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-300"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded transition-colors duration-300 ${page === currentPage
              ? "bg-amber-400 text-black dark:text-gray-900"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors duration-300"
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
