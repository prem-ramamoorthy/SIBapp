import Activity from "./Components/Activity"

function FullActivity() {
  return (
    <div className="activity-container w-[98%] min-h-[330px] m-2 border-2 border-gray-400 bg-white rounded-2xl">
      <div className="overflow-scroll h-[330px]">
        <Activity header={true} />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
        <Activity />
      </div>
    </div>
  )
}

export default FullActivity