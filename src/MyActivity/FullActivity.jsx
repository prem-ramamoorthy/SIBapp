import Activity from "./Components/Activity"

function FullActivity() {

  const content = {
    date: "20 sept 2025",
    type: "TYFCB",
    direction: "Given",
    name: "yonesh Murugan",
    detail: "Hi hello everyone how are you",
    status: "Approved"
  }

  const ActivityComponents = Array.from({ length: 19 }, () => (
    <Activity content={content} />
  ));

  return (
    <div className="activity-container min-w-[98%]  min-h-[425px] max-w-[98%] m-2 ml-3 border-2 border-gray-400 bg-white rounded-2xl">
      <div className="holder overflow-scroll h-[425px]">
        <Activity header={true} />
        {ActivityComponents}
      </div>
    </div>
  )
}

export default FullActivity