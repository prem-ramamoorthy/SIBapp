import Header from "../MainPage/Header"
import MemberList from "./Components/MemberList"
import DirectoryFilters from "./DirectoryFilter"
import MemberCard from "./MemberCard/MemberCard"

function Members() {
  const members = [
    {
      img: "/src/assets/19.jpg",
      bg: "O+",
      name: "Yonesh Murugan",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode"
    },
    {
      img: "/src/assets/19.jpg",
      bg: "O+",
      name: "Arun",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode"
    },
    {
      img: "/src/assets/19.jpg",
      bg: "O+",
      name: "Prem",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode"
    },
    {
      img: "/src/assets/19.jpg",
      bg: "O+",
      name: "Lokesh",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode"
    },
    {
      img: "/src/assets/19.jpg",
      bg: "O+",
      name: "Lokesh",
      vertical: "IT professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode"
    },
  ];

  return (
    <div className="m-2 h-fit">
      <Header />
      <h1 className="m-3 pb-2 text-2xl font-bold">
        Members Directory
      </h1>
      <div className="container -m-2 mb-1 mx-0">
        <DirectoryFilters />
      </div>
      <MemberList members={members} />
    </div>
  )
}

export default Members