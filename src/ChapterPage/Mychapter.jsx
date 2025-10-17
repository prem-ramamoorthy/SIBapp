import Header from "../MainPage/Header"
import Stats from "../MyActivity/Stats"
import Filter from "../Members/Components/Filter"
import ChapterStats from "./components/ChapterStat"
import { useState } from "react"
import Search from './components/Search'
import MemberBar from './components/MemberBar'
import { Divide } from "lucide-react"

function Meetings() {

    const dropdown = ["Company 1", "Company 2", "Extra"];

    const [state, setState] = useState({ dropdown: dropdown[0] });

    const update = (patch) => {
        const next = { ...state, ...patch };
        setState(next);
    };

    const item = [
        { name: "Meetings Held", value: 10 },
        { name: "Visitors", value: 5 },
        { name: "Guests", value: 12 },
        { name: "TYFTB Amount", value: "23Cr" },
        { name: "One-To-OneS", value: 4 },
    ]

    const content = {
        direction: "Given",
        name: "yonesh Murugan",
        category: "Category Name",
        date: "20 sept 2025",
        Given: 201,
        received: 123,
        business: "25L"
    }

    const MeetingComponents = Array.from({ length: 19 }, () => (
        <MemberBar content={content} />
    ));

    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="px-4 w-fit">
                <div className="absolute left-0 top-0 w-full mt-2 px-3">
                    <Header />
                </div>
                <h1 className="mt-[80px] m-3 pb-2 text-2xl font-bold dark:text-white">
                    Chapter Details
                </h1>
                <div className="w-[98%] -m-2 mx-0 ml-2 mb-3 bg-white dark:bg-gray-900 rounded-2xl h-fit border-1">
                    <div className="flex flex-row justify-between">
                        <p className="m-3 p-4 text-xl font-bold text-nowrap dark:text-white">Chapter Name</p>
                        <div className="w-[220px] mr-10 mt-4 mb-0">
                            <Filter content={dropdown} name={"Select Company"} state={state.dropdown} update={update} />
                        </div>
                    </div>
                    <ChapterStats />
                </div>
                <div className="flex flex-col justify-around align-middle w-full">
                    <Stats header="Current Month KPIs (September 2025)" items={item} />
                </div>
                <div className="activity-container w-[98%] min-h-[330px] m-2 border-2 border-gray-400 dark:border-gray-200/50  bg-white dark:bg-gray-900 rounded-2xl">
                    <div>
                        <h1 className="my-3 pr-2 font-bold flex flex-row justify-around">
                            <p className="pl-4 flex justify-start w-full dark:text-white">Member Roster</p>
                            <Search />
                        </h1>
                    </div>
                    <div className="holder overflow-scroll h-[500px]">
                        <MemberBar header={true} />
                        {MeetingComponents}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Meetings