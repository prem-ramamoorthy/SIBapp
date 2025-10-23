import Header from "../MainPage/Header";
import MeetingsFilter from "./MeetingsFilter";
import Stats from "../MyActivity/Stats";
import Meeting from "./Component/Meeting";

function Meetings() {
  const item = [
    { name: "Total Meetings", value: 10 },
    { name: "Guests Brought", value: 5 },
    { name: "Attendance Rate", value: "80%" },
    { name: "Attendance Streak", value: 4 },
  ];

  const content = {
    date: "20 Sept 2025",
    type: "Weekly Chapter",
    direction: "Given",
    name: "Yonesh Murugan",
    Location: "Erode, Tamil Nadu, India",
    status: "Approved",
    duration: "90 Minutes",
  };

  const MeetingComponents = Array.from({ length: 19 }, (_, i) => (
    <Meeting key={i} content={content} />
  ));

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="fixed top-[10px] left-0 w-full z-10 bg-transparent">
        <Header />
      </div>

      <main className="mt-[80px] w-full max-w-7xl px-3 sm:px-6 md:px-10">
        <h1 className="pb-2 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Meetings
        </h1>

        <section className="w-full mb-6">
          <MeetingsFilter />
        </section>

        <section className="mb-6">
          <Stats header="Meeting Stats" items={item} />
        </section>

        <section className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-2xl shadow-sm transition-colors duration-300">
          <div className="ml-3 overflow-y-auto h-[400px] sm:h-[480px] rounded-2xl">
            <Meeting header={true} />
            {MeetingComponents}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Meetings;
