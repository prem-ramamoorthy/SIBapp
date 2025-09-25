import clsx from "clsx";

function FilterButton(
    {
        onclick, content, bg , hover
    }
) {
    return (
        <button
            type="button"
            onClick={() => onclick()}
            className={clsx("h-11 rounded-xl px-4 text-sm font-medium text-gray-700 ring-1 ring-gray-200 focus:outline-none focus:ring-2" , bg , hover)}
        >
            {
                content
            }
        </button>
    )
}

export default FilterButton;
