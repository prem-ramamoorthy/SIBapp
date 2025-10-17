function MemberCard({
  member = {
    img: "/src/assets/19.jpg",
    bg: "O+",
    name: "Yonesh Murugan",
    vertical: "IT professional",
    tag: "Photography and Services",
    chapter: "Alpha Chapter",
    region: "Erode",
  },
}) {
  return (
    <div className="h-[430px] w-[250px] flex flex-col justify-end">
      <div className="bg-white dark:bg-gray-800 h-[370px] w-full rounded-t-[2rem] rounded-b-2xl flex flex-col justify-start items-center transition-colors duration-300">
        <div className="relative h-[140px] w-[140px] bg-gray-300 dark:bg-gray-700 rounded-full -top-[60px] shadow-2xl border-3 border-gray-400 dark:border-gray-600">
          <img
            src={member.img}
            alt="IMG"
            className="h-full w-full rounded-full object-cover object-top"
          />
          <div className="h-[30px] w-[30px] rounded-full bg-red-500 absolute bottom-2 right-2 font-bold border-2 border-white">
            <p className="pt-1 pl-1 text-white text-sm">{member.bg}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-0.5 relative -top-[50px]">
          <h4 className="font-bold text-xl cursor-no-drop text-gray-900 dark:text-gray-100">
            {member.name}
          </h4>
          <p className="text-md font-bold text-gray-500 dark:text-gray-300 mb-2 cursor-no-drop">
            {member.vertical}
          </p>
          <button className="bg-yellow-400 dark:bg-yellow-500 p-1.5 rounded-2xl cursor-no-drop transition-colors duration-300">
            <p className="font-bold mx-2 text-sm">{member.tag}</p>
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

        <button className="h-[40px] cursor-pointer w-[180px] bg-gray-100 dark:bg-gray-700 p-1 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-600 border-2 text-sm font-bold border-gray-400 dark:border-gray-600 relative -top-[40px] transition-colors duration-300">
          Cultural Details
        </button>

        <div className="flex flex-row justify-between w-full gap-3 mt-2 relative -top-[30px]">
          <button className="h-[40px] cursor-pointer w-1/2 bg-red-600 p-1 rounded-2xl hover:bg-red-500 border-2 text-sm font-bold border-gray-400 dark:border-gray-600 text-amber-50 transition-colors duration-300 ml-4">
            Contact
          </button>
          <button className="h-[40px] cursor-pointer w-1/2 bg-white dark:bg-gray-700 p-1 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-600 border-2 text-sm font-bold border-gray-400 dark:border-gray-600 transition-colors duration-300 mr-4">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
