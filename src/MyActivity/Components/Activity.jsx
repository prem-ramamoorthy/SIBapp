import ActivityField from "./ActivityField";
import ActivityBadge from "./ActivityBadge";
import { ModalViewer } from "./ViewContentModal";

function Activity(
  {
    header = false,
    content = {
      date: "20 sept 2025",
      type: "TYFCB",
      direction: "Given",
      name: "yonesh Murugan",
      detail: "Hi hello everyone how are you",
      status: "Approved"
    }
  }
) {
  if (header) {
    const HeaderComponent = [
      "Date", "Type", "Direction", "Member Name", "Details", "Status", "Action"
    ].map((element, index) => (
      <p
        className="w-[120px] font-bold mx-2 text-center text-gray-900 dark:text-gray-100"
        key={index}
      >
        {element}
      </p>
    ));

    return (
      <div className="ml-2 z-2 sticky top-0 heade flex flex-row justify-around border-b border-gray-400 dark:border-gray-600 pt-4 px-2 pb-3 bg-gray-200 dark:bg-gray-900 rounded-t-2xl w-max items-center lg:w-full xl:w-full transition-colors duration-300">
        {HeaderComponent}
      </div>
    );
  }

  return (
    <div className="ml-2 activity-field nth-[odd]:bg-gray-200 dark:nth-[odd]:bg-gray-700 flex flex-row justify-around py-2 items-center w-max cursor-auto lg:w-full xl:w-full transition-colors duration-300 hover:bg-amber-200/20 dark:hover:bg-amber-200/20 nth-[odd]:hover:bg-amber-200/20 dark:nth-[odd]:hover:bg-amber-200/20">
      <ActivityField data={content.date} classname="overflow-x-hidden font-semibold text-gray-900 dark:text-gray-100" />
      <ActivityBadge content={content.type} color="blue" />
      <ActivityField data={content.direction} classname="text-gray-900 dark:text-gray-100" />
      <ActivityField data={content.name} classname="font-semibold text-gray-900 dark:text-gray-100" />
      <ActivityField data={content.detail} classname="overflow-x-hidden text-gray-900 dark:text-gray-100" />
      <ActivityBadge content={content.status} color="green" />
      <ModalViewer content={content.fullDetails} />
    </div>
  );
}

export default Activity;
