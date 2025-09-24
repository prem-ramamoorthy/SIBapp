function Activity(
    {
        header = false
    }
) {
    if (header) {
        return (
            <div className="heade flex flex-row justify-around border-b-1 pt-4 px-2  bg-gray-200 rounded-t-2xl overflow-x-scroll items-center">
                <p className="min-w-[120px] font-bold text-center">Date</p>
                <p className="min-w-[120px] font-bold text-center">Type</p>
                <p className="min-w-[120px] font-bold text-center"> Direction</p>
                <p className="min-w-[120px] font-bold text-center">Member Name</p>
                <p className="min-w-[120px] font-bold text-center">Details</p>
                <p className="min-w-[120px] font-bold text-center">Status</p>
                <p className="min-w-[120px] font-bold text-center">Action</p>
            </div>
        )
    }
    return (
        <div className="activity-field flex flex-row justify-around p-2 px-2 rounded-t-2xl overflow-x-scroll items-center">
            <p className="min-w-[120px] text-center font-semibold">Date</p>
            <p className="min-w-[120px] text-center">Type</p>
            <p className="min-w-[120px] text-center"> Direction</p>
            <p className="min-w-[120px] text-center font-semibold">Member Name</p>
            <p className="min-w-[120px] text-center">Details</p>
            <p className="min-w-[120px] text-center">Status</p>
            <p className="min-w-[120px] text-center">Action</p>
        </div>
    )
}

export default Activity