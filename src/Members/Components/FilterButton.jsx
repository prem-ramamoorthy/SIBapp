function FilterButton(
    {
        onclick, content, bg , hover
    }
) {
    return (
        <button
            type="button"
            onClick={() => onclick()}
            className={`
            h-11 rounded-xl ${bg} px-4 text-sm font-medium text-gray-700
            ring-1 ring-gray-200 hover:${hover}
            focus:outline-none focus:ring-2
            `}
        >
            {
                content
            }
        </button>
    )
}

export default FilterButton