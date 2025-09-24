function Activity(
    {
        header = false
    }
) {
    if (header) {
        return (
            <div className="heade flex flex-row justify-around border-b-1 pt-4 px-2 pb-3  bg-gray-200 rounded-t-2xl w-max items-center lg:w-full xl:w-full ">
                <p className="w-[120px] font-bold  mx-2 text-center">Date</p>
                <p className="w-[120px] font-bold  mx-2 text-center">Type</p>
                <p className="w-[120px] font-bold  mx-2 text-center"> Direction</p>
                <p className="w-[120px] font-bold   mx-2 text-center">Member Name</p>
                <p className="w-[120px] font-bold   mx-2 text-center">Details</p>
                <p className="w-[120px] font-bold   mx-2 text-center">Status</p>
                <p className="w-[120px] font-bold   mx-2 text-center">Action</p>
            </div>
        )
    }
    return (
        <div className="activity-field flex flex-row justify-around py-2 items-center w-max cursor-auto lg:w-full xl:w-full">
            <p className="w-[120px] text-center font-semibold  text-nowrap mx-2 overflow-x-hidden">20 sept 2025</p>
            <button  className="w-[120px] font-semibold cursor-no-drop text-blue-800
            text-nowrap text-center  mx-2 overflow-x-hidde bg-blue-300/50 rounded-lg p-1 mb-1">
                TYFCB
            </button>
            <p className="w-[120px] text-nowrap  text-center  mx-2 overflow-x-hidden">Given</p>
            <p className="w-[120px]  text-nowrap text-center mx-2  font-semibold overflow-x-hidden">yonesh Murugan</p>
            <p className="w-[120px] text-nowrap text-center  mx-2 overflow-x-hide overflow-x-hidden">Hi hello everyone how are you</p>
            <button  className="w-[120px] font-semibold cursor-no-drop text-green-800
            text-nowrap text-center  mx-2 overflow-x-hidde bg-green-300/50 rounded-xl p-1 mb-1">
                Approved
            </button>
            <button  className="w-[120px] font-bold cursor-pointer
            text-nowrap text-center  mx-2 overflow-x-hidden border-amber-500 border-3 rounded-xl p-1 mb-1">
                View Details
            </button>
        </div>
    )
}

export default Activity