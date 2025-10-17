import clsx from "clsx";

function Stat({ name, value, classname }) {
  return (
    <div
      className={clsx(
        "stat flex flex-col justify-center items-center border border-gray-600 dark:border-gray-700 rounded-2xl w-[160px] p-4 mt-2 h-fit bg-white dark:bg-gray-700 transition-colors duration-300",
        classname
      )}
    >
      <p className="text-xl font-bold pb-2 text-gray-900 dark:text-gray-100">{value}</p>
      <p className="font-semibold text-gray-700 dark:text-gray-300">{name}</p>
    </div>
  );
}

export default Stat;
