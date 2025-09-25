function MemberCard(
    {member = {
        img : "/src/assets/19.jpg" ,
        bg : "O+",
        name :"Yonesh Murugan",
        vertical: "IT professional",
        tag :"Photography and Services",
        chapter : "Alpha Chapter",
        region: "Erode"
    }}
) {
    return (
        <div className="h-[430px] w-[250px] flex flex-col justify-end">
            <div className="bg-white h-[370px] w-full rounded-t-[2rem] rounded-b-2xl flex flex-col justify-start items-center">
                <div className="relative h-[140px] w-[140px] bg-gray-300 rounded-full -top-[60px] shadow-2xl border-3 border-gray-400">
                    <img src={member.img} alt="IMG" className="h-full w-full rounded-full object-cover object-top" />
                    <div className="h-[30px] w-[30px] rounded-full bg-red-500 absolute bottom-2 right-2 font-bold border-2 border-white">
                        <p className="pt-1 pl-1 text-white text-sm">{member.bg}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-0.5 relative -top-[50px] ">
                    <h4 className="font-bold text-xl cursor-no-drop">{member.name}</h4>
                    <p className="text-md font-bold text-gray-500 mb-2 cursor-no-drop">{member.vertical}</p>
                    <button className="bg-yellow-400 p-1.5 rounded-2xl cursor-no-drop">
                        <p className="font-bold mx-2 text-sm">{member.tag}</p>
                    </button>
                    <div className="border-b-2 border-gray-300 h-2 w-full mt-2"></div>
                </div>
                <div className="flex flex-col w-full justify-start items-start px-4 relative -top-[50px] mt-2 cursor-no-drop">
                    <div className="flex flex-row justify-between w-full">
                        <p className="text-sm font-semibold text-gray-500">Chapter</p>
                        <p className="text-sm font-bold">{member.chapter}</p>
                    </div>
                    <div className="flex flex-row justify-between w-full">
                        <p className="text-sm font-semibold text-gray-500">Region</p>
                        <p className="text-sm font-bold">{member.region}</p>
                    </div>
                </div>
                <button className="h-[40px] cursor-pointer w-[180px] bg-gray-100 p-1 rounded-2xl hover:bg-gray-200 border-2 text-sm font-bold border-gray-400 relative -top-[40px]">
                    Cultural Details
                </button>
                <div className="flex flex-row justify-between w-4/4 gap-3 mt-2 relative -top-[30px]">
                    <button className="h-[40px] cursor-pointer w-1/2 bg-red-600 p-1 rounded-2xl hover:bg-red-500 border-2 text-sm font-bold border-gray-400 ml-4 text-amber-50">
                        Contact
                    </button>
                    <button className="h-[40px] cursor-pointer w-1/2 bg-white p-1 rounded-2xl hover:bg-gray-50 border-2 text-sm font-bold border-gray-400 mr-4">
                        View Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MemberCard;
