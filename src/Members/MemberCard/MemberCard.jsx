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
    <div className="h-[430px] w-[250px] flex flex-col justify-end">
      <div className="bg-white dark:bg-gray-800 h-[370px] w-full rounded-t-[2rem] rounded-b-2xl flex flex-col justify-start items-center transition-colors duration-300">
        <div className="relative h-[140px] w-[140px] bg-gray-300 dark:bg-gray-700 rounded-full -top-[60px] shadow-2xl border-3 border-gray-400 dark:border-gray-600">
          <img
            src="/assets/19.jpg"
            alt= " image NotFound"
            className="h-full w-[200px] rounded-full object-cover object-top"
          />
          <div className="h-[30px] w-[30px] rounded-full bg-red-500 absolute bottom-2 right-2 font-bold border-2 border-white">
            <p className="pt-1 pl-1 text-white text-sm">{member.blood_group}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-0.5 relative -top-[50px]">
          <h4 className="font-bold text-xl cursor-no-drop text-gray-900 dark:text-gray-100">
            {member.username}
          </h4>
          <p className="text-md font-bold text-gray-500 dark:text-gray-300 mb-2 cursor-no-drop">
            {member.company_name}
          </p>
          <button className="bg-yellow-400 dark:bg-yellow-500 p-1.5 rounded-2xl cursor-no-drop transition-colors duration-300">
            <p className="font-bold mx-2 text-sm">{member.verticals}</p>
          </button>
          <div className="border-b-2 border-gray-300 dark:border-gray-600 h-2 w-full mt-2"></div>
        </div>

        <div className="flex flex-col w-full justify-start items-start px-4 relative -top-[50px] mt-2 cursor-no-drop">
          <div className="flex flex-row justify-between w-full">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-300">Chapter</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{member.chapter}</p>
          </div>
          <div className="flex flex-row justify-between w-full">
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-300">Region</p>
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{member.region}</p>
          </div>
        </div>

        <ModalViewercultural data={culturaldetails} />

        <div className="flex flex-row justify-between w-full gap-3 mt-2 relative -top-[30px]">
          <ModalViewer contactdetails = {contactdetails} />
          <NavLink to={link} className="h-[40px] cursor-pointer w-1/2 bg-white dark:bg-gray-400 p-1 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-600 border-2 pl-4 pt-2 text-[12px] font-bold border-gray-400 dark:border-gray-600 transition-colors duration-300 mr-4">
            View Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
