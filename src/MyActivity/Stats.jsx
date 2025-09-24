import Stat from "./Components/Stat"

function Stats() {
    return (
        <div className="h-fit w-[98%] bg-white rounded-2xl mx-2 -mt-2
        border-1 border-gray-600 p-4">
            <p className="font-bold -mt-2">Activity Details</p>
            <div className="container flex flex-wrap justify-between">
                <Stat name="Refrals Given" value={23}/>
                <Stat name="Refrals Given" value={23}/>
                <Stat name="Refrals Given" value={23}/>
                <Stat name="Refrals Given" value={23}/>
            </div>
        </div>
    )
}

export default Stats