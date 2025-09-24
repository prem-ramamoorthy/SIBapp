import Activity from "./Components/Activity"

function FullActivity() {
  return (
    <div className="w-[98%] min-h-[330px] m-2 border-2 border-gray-400 bg-white rounded-2xl">
        <Activity header={true}/>
        <Activity />
    </div>
  )
}

export default FullActivity