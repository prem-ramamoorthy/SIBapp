function Stat({ value, label, money = false }) {
  return (
    <div className="flex flex-col items-center p-2">
      <h2 className="text-2xl px-1 text-yellow-500 dark:text-yellow-400 font-bold">
        {money ? `₹${value}` : value}
      </h2>
      <h3 className="text-sm text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </h3>
    </div>
  );
}

export default Stat;
