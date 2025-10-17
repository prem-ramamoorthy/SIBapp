import Header from "../MainPage/Header";
import MeetingsFilter from "./MeetingsFilter";
import Stats from "../MyActivity/Stats";
import Meeting from "./Component/Meeting";

function Meetings() {
    const item = [
        { name: "Total Meetings", value: 10 },
        { name: "Guests Brought", value: 5 },
        { name: "Attendance Rate", value: "80%" },
        { name: "Attendance Streak", value: 4 },
    ];

    const content = {
        date: "20 sept 2025",
        type: "Weekly Chapter",
        direction: "Given",
        name: "yonesh Murugan",
        Location: "Erode TamilNadu , India",
        status: "Approved",
        duration: "90 Minutes",
    };

    const MeetingComponents = Array.from({ length: 19 }, () => (
        <Meeting content={content} />
    ));

    return (
        <div className="w-screen min-h-screen flex justify-center transition-colors duration-300">
            <div className="min-h-screen w-fit p-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <div className="absolute w-full mt-2 top-0 px-4 left-0">
                    <Header />
                </div>
                <h1 className=" mt-[80px] pb-2 text-2xl font-bold">Meetings</h1>
                <div className="w-full px-5">
                    <MeetingsFilter />
                </div>
                <div className="mt-5">
                    <Stats header="Meeting Stats" items={item} />
                </div>
                <div className="activity-container max-w-[98%] min-h-[420px] m-2 border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-2xl transition-colors duration-300">
                    <div className="holder overflow-scroll h-[420px]">
                        <Meeting header={true} />
                        {MeetingComponents}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meetings;
