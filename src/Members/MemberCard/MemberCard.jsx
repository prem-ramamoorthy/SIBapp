import {ModalViewer} from '../Components/Modalcontactviewer'
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
  }, culturaldetails = {} , contactdetails = {} , link
}) {
  return (
  <div className="h-[400px] w-[180px] flex flex-col justify-end">
    <div className="bg-white dark:bg-gray-800 h-[330px] w-full rounded-t-2xl rounded-b-xl flex flex-col justify-start items-center transition-colors duration-300">
      <div className="relative h-[110px] w-[110px] bg-gray-300 dark:bg-gray-700 rounded-full -top-[48px] shadow-xl border-2 border-gray-400 dark:border-gray-600">
        <img
          src={member.profile_image_url}
          alt=""
          className="h-full w-full rounded-full object-cover object-top"
        />
        <div className="h-[28px] w-[28px] rounded-full bg-red-500 absolute bottom-2 -right-1 font-bold border-2 border-white">
          <p className=" text-white text-[8px] text-center pt-1">{member.blood_group}</p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-0.5 relative -top-[38px]">
        <h4 className="font-bold text-lg cursor-no-drop text-gray-900 dark:text-gray-100">
          {member.username}
        </h4>
        <p className="text-sm font-bold text-gray-500 dark:text-gray-300 mb-1 cursor-no-drop">
          {member.company_name}
        </p>
        <button className="w-9/10 bg-yellow-400 dark:bg-yellow-500 p-1 rounded-xl cursor-no-drop transition-colors duration-300">
          <p className="font-bold mx-1.5 text-xs">{member.verticals}</p>
        </button>
        <div className="border-b border-gray-300 dark:border-gray-600 h-1 w-full mt-1"></div>
      </div>

      <div className="flex flex-col w-full justify-start items-start px-3 relative -top-[38px] mt-1 cursor-no-drop">
        <div className="flex flex-row justify-between w-full">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-300">Chapter</p>
          <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{member.chapter}</p>
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-300">Region</p>
          <p className="text-xs font-bold text-gray-900 dark:text-gray-100">{member.region}</p>
        </div>
      </div>

      <ModalViewercultural data={culturaldetails} />

      <div className="flex flex-row justify-between w-full gap-2 mr-3 mt-1 relative -top-[24px]">
        <ModalViewer contactdetails={contactdetails} />
        <NavLink
          to={link}
          className="text-nowrap h-[38px] cursor-pointer w-1/2 bg-white dark:bg-gray-400 p-1 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 border pl-6.9 pt-2.5 text-xs font-bold border-gray-400 dark:border-gray-600 transition-colors duration-300 mr-2"
        >
          View Profile
        </NavLink>
      </div>
    </div>
  </div>
);
}

export default MemberCard;
