import Header from "../MainPage/Header"
import Stats from "../MyActivity/Stats"
import Filter from "../Members/Components/Filter"
import ChapterStats from "./components/ChapterStat"
import { useState } from "react"
import Search from './components/Search'
import MemberBar from './components/MemberBar'

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
        category : "Category Name",
        date: "20 sept 2025",
        Given: 201,
        received: 123,
        business : "25L"
    }

    const MeetingComponents = Array.from({ length: 19 }, () => (
        <MemberBar content={content} />
    ));

    return (
        <div className="ml-5 ">
            <Header />
            <h1 className="m-3 pb-2 text-2xl font-bold">
                Chapter Details
            </h1>
            <div className="container -m-2 mx-0 w-[98%] ml-2 mb-3 bg-gray-100 rounded-2xl h-fit border-1">
                <div className="flex flex-row justify-between">
                    <p className="m-3 p-4 text-xl font-bold">Chapter Name</p>
                    <div className="w-[220px] mr-10 mt-4 mb-0">
                        <Filter content={dropdown} name={"Select Company"} state={state.dropdown} update={update} />
                    </div>
                </div>
                <ChapterStats />
            </div>
            <div className="mt-5">
                <Stats header="Current Month KPIs (September 2025)" items={item} />
            </div>
            <div className="activity-container w-[98%] min-h-[330px] m-2 border-2 border-gray-400 bg-white rounded-2xl">
                <div>
                    <h1 className="m-3 pb-2 text-xl font-bold flex flex-row justify-between">
                        Member Roster
                        <Search />
                    </h1>
                </div>
                <div className="holder overflow-scroll h-[500px]">
                    <MemberBar header={true} />
                    {MeetingComponents}
                </div>
            </div>
        </div>
    )
}

export default Meetings