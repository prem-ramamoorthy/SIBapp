import Header from "../MainPage/Header"
import MeetingsFilter from "./MeetingsFilter"
import Stats from "../MyActivity/Stats"
import Meeting from "./Component/Meeting"

function Meetings() {

    const item = [
        { name: "Total Meetings", value: 10 },
        { name: "Guests Brought", value: 5 },
        { name: "Attendance Rate", value: "80%" },
        { name: "Attendance Streak", value: 4 },
    ]

    const content = {
        date: "20 sept 2025",
        type: "Weekly Chapter",
        direction: "Given",
        name: "yonesh Murugan",
        Location: "Erode TamilNadu , India",
        status: "Approved",
        duration: "90 Minutes"
    }

    const MeetingComponents = Array.from({ length: 19 }, () => (
        <Meeting content={content} />
    ));

    return (
        <div className="m-2">
            <Header />
            <h1 className="m-3 pb-2 text-2xl font-bold">
                Meetings
            </h1>
            <div className="w-full px-2">
                <MeetingsFilter />
            </div>
            <div className="mt-5">
                <Stats header="Meeting Stats" items={item} />
            </div>
            <div className="activity-container w-[98%] min-h-[330px] m-2 border-2 border-gray-400 bg-white rounded-2xl">
                <div className="holder overflow-scroll h-[330px]">
                    <Meeting header={true} />
                    {MeetingComponents}
                </div>
            </div>
        </div>
    )
}

export default Meetings