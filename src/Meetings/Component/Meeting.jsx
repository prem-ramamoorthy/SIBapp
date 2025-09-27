import ActivityField from "../../MyActivity/Components/ActivityField"
import ActivityBadge from "../../MyActivity/Components/ActivityBadge"

function Meeting(
    {
        header = false,
        content = {
            date: "20 sept 2025",
            type: "Weekly Chapter",
            direction: "Given",
            name: "yonesh Murugan",
            Location: "Erode TamilNadu , India",
            status: "Approved",
            duration : "90 Minutes"
        }
    }
) {
    if (header) {

        const HeaderComponent = [
            "Date", "Meeting Name", "Type", "Location", "Status", "Duration"
        ].map((element, index) => {
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
            <ActivityField data={content.date} classname="overflow-x-hidden font-semibold " />
            <ActivityField data={content.name} classname="font-bold w-fit" />
            <ActivityField data={content.type} classname="font-semibold" />
            <ActivityField data={content.Location} classname="overflow-x-hidden" />
            <ActivityBadge content={content.status} color={"green"} />
            <ActivityField data={content.duration} classname="overflow-x-hidden font-semibold" />
        </div>
    )
}

export default Meeting