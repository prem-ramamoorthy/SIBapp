import Stat from "./Components/Stat";

function Stats({
  header = "Activity Details",
  items = [
    { name: "Referrals Given", value: 23 },
    { name: "Referrals Given", value: 23 },
    { name: "Referrals Given", value: 23 },
    { name: "Referrals Given", value: 23 },
  ],
}) {
  const StatItems = items.map((element, index) => (
    <Stat name={element.name} value={element.value} key={index} />
  ));

  return (
    <div className="h-fit min-w-[98%] max-w-[98%] 
                    bg-white dark:bg-gray-800 
                    rounded-2xl -mt-2 ml-3 
                    border border-gray-600 dark:border-gray-700 
                    p-2 transition-colors duration-300">
      <p className="font-bold mx-2 text-gray-900 dark:text-gray-100">{header}</p>
      <div className="flex flex-wrap justify-around items-center text-nowrap">
        {StatItems}
      </div>
    </div>
  );
}

export default Stats;
