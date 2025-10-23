import Header from "../MainPage/Header";
import MemberList from "./Components/MemberList";
import DirectoryFilters from "./DirectoryFilter";

function Members() {
  const members = [
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Yonesh Murugan",
      vertical: "IT Professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Arun",
      vertical: "IT Professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Prem",
      vertical: "IT Professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Lokesh",
      vertical: "IT Professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
    {
      img: "/assets/19.jpg",
      bg: "O+",
      name: "Lokesh",
      vertical: "IT Professional",
      tag: "Photography and Services",
      chapter: "Alpha Chapter",
      region: "Erode",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="fixed top-[10px] left-0 w-full z-10 bg-transparent">
        <Header />
      </div>

      <main className="mt-[80px] w-full max-w-7xl px-3 sm:px-6 md:px-10">
        <h1 className="pb-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Members Directory
        </h1>

        <section className="w-full mb-1">
          <DirectoryFilters />
        </section>

        <section className="w-full">
          <MemberList members={members} />
        </section>
      </main>
    </div>
  );
}

export default Members;
