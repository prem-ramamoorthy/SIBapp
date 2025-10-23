import ActivityField from "../../MyActivity/Components/ActivityField";
import ActivityBadge from "../../MyActivity/Components/ActivityBadge";

function Meeting({
  header = false,
  content = {
    date: "20 sept 2025",
    type: "Weekly Chapter",
    direction: "Given",
    name: "yonesh Murugan",
    Location: "Erode TamilNadu , India",
    status: "Approved",
    duration: "90 Minutes",
  },
}) {
  if (header) {
    const HeaderComponent = [
      "Date",
      "Meeting Name",
      "Type",
      "Location",
      "Status",
      "Duration",
    ].map((element, index) => (
      <p
        className="w-[120px] font-bold mx-2 text-center text-gray-900 dark:text-gray-100"
        key={index}
      >
        {element}
      </p>
    ));

    return (
      <div className="sticky top-0 heade flex flex-row justify-around border-b border-gray-400 dark:border-gray-700 pt-4 px-2 pb-3 bg-gray-200 dark:bg-gray-800 rounded-t-2xl w-max items-center lg:w-full xl:w-full transition-colors duration-300">
        {HeaderComponent}
      </div>
    );
  }

  return (
    <div className="activity-field nth-[odd]:bg-gray-200 dark:nth-[odd]:bg-gray-700 flex flex-row justify-around py-2 items-center w-max cursor-auto lg:w-full xl:w-full transition-colors duration-300 hover:bg-amber-200/20 dark:hover:bg-amber-200/20 nth-[odd]:hover:bg-amber-200/20 dark:nth-[odd]:hover:bg-amber-200/20">
      <ActivityField data={content.date} classname="overflow-x-hidden font-semibold text-gray-900 dark:text-gray-100" />
      <ActivityField data={content.name} classname="font-bold w-fit text-gray-900 dark:text-gray-100" />
      <ActivityField data={content.type} classname="font-semibold text-gray-900 dark:text-gray-100" />
      <ActivityField data={content.Location} classname="overflow-x-hidden text-gray-900 dark:text-gray-100" />
      <ActivityBadge content={content.status} color={"green"} />
      <ActivityField data={content.duration} classname="overflow-x-hidden font-semibold text-gray-900 dark:text-gray-100" />
    </div>
  );
}

export default Meeting;
