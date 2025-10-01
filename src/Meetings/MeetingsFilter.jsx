import { useState } from "react";
import Filter from '../Members/Components/Filter'
import FilterButton from "../Members/Components/FilterButton";

function MeetingsFilter(
    {
        daterange = ["Last 90 Days", "Last Month", "Last Year"],
        meetingtype = ["All Types", "Alpha", "Beta", "Gamma"],
        status = ["All Status", "Done", "Pending", "Upcoming"],
        onChange,
    }
) {

    const [state, setState] = useState({
        daterange: daterange[0],
        meetingtype: meetingtype[0],
        status: status[0],
    });

    const update = (patch) => {
        const next = { ...state, ...patch };
        setState(next);
        onChange?.(next);
    };

    const reset = {
        daterange: daterange[0],
        meetingtype: meetingtype[0],
        status: status[0],
    };

    return (
        <section
            className="
        w-full
        rounded-3xl
        bg-white
        p-2 md:p-6
        shadow-2xl
        border border-white
      "
            aria-label="Directory filters"
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Filter name="Date Range" state={state.daterange} update={update} content={daterange} />
                <Filter name="Meeting Type" state={state.meetingtype} update={update} content={meetingtype} />
                <Filter name="Status" state={state.status} update={update} content={status} />
                <FilterButton content="Clear Filter" onClick={()=>setState(reset)} bg="bg-gray-300" hover="hover:bg-gray-200 mt-6" />
            </div>

        </section>
    )
}

export default MeetingsFilter