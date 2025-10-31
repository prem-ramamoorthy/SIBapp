function Events({
  company = "The Future of AI in Everyday Life",
  date = "July 15, 2024",
  time = "3:00 PM - 4:00 PM",
}) {
  return (
    <div
      className="
        event flex flex-col gap-2 px-4 overflow-auto
        sm:px-6 lg:px-4 md:px-2 pb-4
        bg-white dark:bg-gray-800/5
        rounded-lg
        shadow-sm dark:shadow-gray-900/20
        transition-colors duration-300
      "
    >
      <h3 className="text-gray-600 dark:text-gray-300">
        <span className="font-semibold text-gray-800 dark:text-gray-100">Company :</span> {company}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        <span className="font-semibold text-gray-800 dark:text-gray-100">Date :</span> {date} |{" "}
        <span className="font-semibold text-gray-800 dark:text-gray-100">Time :</span> {time}
      </p>
    </div>
  );
}

export default Events;
