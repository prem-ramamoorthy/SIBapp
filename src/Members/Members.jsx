import Header from "../MainPage/Header";
import MemberList from "./Components/MemberList";
import DirectoryFilters from "./DirectoryFilter";

function Members() {
  const members = [
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Yonesh Murugan",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Arun",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Prem",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Lokesh",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Lokesh",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
  ];

  return (
    <div className="w-screen min-h-screen flex justify-center  transition-colors duration-300">
      <div className="  max-w-fit w-full flex flex-col flex-wrap items-center justify-center text-gray-900 dark:text-gray-100">
        <div className="absolute w-[90%] mt-1 top-0">
          <Header />
        </div>
        <h1 className="mt-[80px] pb-2 text-2xl font-bold flex-1 items-center">
          Members Directory
        </h1>
        <div className="  mx-0 w-full">
          <DirectoryFilters />
        </div>
        <MemberList members={members} />
      </div>
    </div>
  );
}

export default Members;
