import { ModalViewer } from '../Components/Modalcontactviewer';
import { ModalViewercultural } from '../Components/CulturalModal';
import { NavLink } from 'react-router-dom';

function MemberCard({
  member = {
    profile_image_url: "/src/assets/19.jpg",
    blood_group: "O+",
    username: "Yonesh Murugan",
    company_name: "IT professional",
    verticals: "Photography and Services",
    chapter: "Alpha Chapter",
    region: "Erode",
  },
  culturaldetails = {},
  contactdetails = {},
  link
}) {
  return (
    /* 1. Increased Max Width: max-w-[300px] allows more space for text.
      2. mx-auto: Centers the card in its grid cell on mobile.
    */
    <div className="flex flex-col justify-end pt-12 w-full max-w-[300px] mx-auto">
      
      {/* Card Body */}
      <div className="relative bg-white dark:bg-gray-800 w-full rounded-t-2xl rounded-b-xl flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 pb-5">
        
        {/* --- Profile Image (Floating) --- */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
          <div className="h-[110px] w-[110px] bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg border-2 border-gray-400 dark:border-gray-600 relative">
            <img
              src={member.profile_image_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt={member.username}
              className="h-full w-full rounded-full object-cover object-top"
            />
            {/* Blood Group Badge */}
            <div className="h-[28px] w-[28px] rounded-full bg-red-500 absolute bottom-2 -right-1 font-bold border-2 border-white flex items-center justify-center">
              <p className="text-white text-[9px]">{member.blood_group}</p>
            </div>
          </div>
        </div>

        {/* --- Main Content --- */}
        {/* mt-16 ensures text starts below the floating image */}
        <div className="flex flex-col items-center w-full mt-16 px-4">
          
          {/* Name & Company - Allowed to wrap instead of truncate */}
          <div className="text-center w-full mb-2">
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight break-words">
              {member.username}
            </h4>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-300 mt-1 leading-snug">
              {member.company_name}
            </p>
          </div>

          {/* Verticals Badge - Width increased, text wraps if needed */}
          <div className="w-full">
            <div className="bg-yellow-400 dark:bg-yellow-500 py-1.5 px-2 rounded-xl w-full text-center shadow-sm min-h-[30px] flex items-center justify-center">
              <p className="font-bold text-xs leading-tight text-gray-900">
                {member.verticals}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-gray-300 dark:border-gray-600 h-px w-full my-3"></div>

          {/* Chapter & Region Details */}
          <div className="w-full space-y-2">
            <div className="flex justify-between items-start w-full gap-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Chapter</p>
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100 text-right">{member.chapter}</p>
            </div>
            <div className="flex justify-between items-start w-full gap-2">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 shrink-0">Region</p>
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100 text-right">{member.region}</p>
            </div>
          </div>
          
          {/* --- Cultural Modal --- */}
          {/* Added my-3 to fix overlapping with Region */}
          <div className="w-full my-9 flex justify-center">
             <ModalViewercultural data={culturaldetails} />
          </div>
         
        </div>

        {/* --- Footer (Contact + Button) --- */}
        <div className="flex flex-row justify-between items-center w-full px-4 gap-3 -mt-13">
          {/* Contact Modal */}
          <div className="shrink-0">
             <ModalViewer contactdetails={contactdetails} />
          </div>

          {/* View Profile Button */}
          <NavLink
            to={link}
            className="flex-1 -ml-4 flex justify-center items-center h-[35px] bg-white dark:bg-gray-600 border border-gray-400 dark:border-gray-500 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors duration-300 shadow-sm"
          >
            <span className="text-[10px]  font-bold text-gray-800 dark:text-white text-nowrap">View Profile</span>
          </NavLink>
        </div>

      </div>
    </div>
  );
}

export default MemberCard;