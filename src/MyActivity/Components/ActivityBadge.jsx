function ActivityBadge(
    {
        color ,
        content,
        border = 0 ,
        font = "semibold" ,
        cursor = "no-drop"
    }
) {
    return (
        <button className={`w-[120px] font-${font} cursor-${cursor} text-${color}-800
            text-nowrap text-center  mx-2 overflow-x-hidde bg-${color}-300/50 rounded-lg p-1 mb-1 border-${border} border-amber-500`}>
            {content}
        </button>
    )
}

export default ActivityBadge