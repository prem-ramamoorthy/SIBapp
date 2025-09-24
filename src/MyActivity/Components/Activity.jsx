import ActivityField from "./ActivityField"
import ActivityBadge from "./ActivityBadge"

function Activity(
    {
        header = false,
        content = {
            date : "20 sept 2025" ,
            type : "TYFCB",
            direction : "Given",
            name : "yonesh Murugan",
            detail : "Hi hello everyone how are you" ,
            status : "Approved"
        }
    }
) {
    if (header) {

        const HeaderComponent = [
            "Date" ,"Type" , "Direction" , "Member Name" , "Details" , "Status" , "Action"
        ].map((element,index)=>{
            return <p className="w-[120px] font-bold  mx-2 text-center" key={index}>{element}</p>
        })

        return (
            <div className="heade flex flex-row justify-around border-b-1 pt-4 px-2 pb-3  bg-gray-200 rounded-t-2xl w-max items-center lg:w-full xl:w-full ">
                {HeaderComponent}
            </div>
        )
    }
    return (
        <div className="activity-field nth-[odd]:bg-gray-200 flex flex-row justify-around py-2 items-center w-max cursor-auto lg:w-full xl:w-full">
            <ActivityField data={content.date} classname="overflow-x-hidden font-semibold "/>
            <ActivityBadge content = {content.type} color={"blue"} />
            <ActivityField data={content.direction}/>
            <ActivityField data={content.name} classname="font-semibold"/>
            <ActivityField data={content.detail} classname="overflow-x-hidden"/>
            <ActivityBadge content = {content.status} color={"green"} />
            <ActivityBadge content={"View Details"} font="bold" border={3} cursor="pointer" />
        </div>
    )
}

export default Activity