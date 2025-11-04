import Activity from "./Components/Activity";

function FullActivity( {data = [
  {
    date: "20 sept 2025",
    type: "TYFCB",
    direction: "Given",
    name: "yonesh Murugan",
    detail: "Hi hello everyone how are you",
    status: "Approved",
  },
  {
    date: "20 sept 2025",
    type: "TYFCB",
    direction: "Given",
    name: "yonesh Murugan",
    detail: "Hi hello everyone how are you",
    status: "Approved",
  }
]} ) {

  const ActivityComponents = data.map((activity , index) => {
    return (<Activity content={activity} key={index}/>)
  });

  return (
    <div className="activity-container min-w-[98%] min-h-[425px] max-w-[98%] m-2 ml-3 border-2 border-gray-400 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl transition-colors duration-300">
      <div className="holder overflow-scroll h-[425px]">
        <Activity header={true} />
        {ActivityComponents}
      </div>
    </div>
  );
}

export default FullActivity;
