function Checkbox({
    state,
    update,
    content = "Show My Chapter Only"
}) {
    return (
        <label className="inline-flex items-center gap-3">
            <input
                type="checkbox"
                checked={state.myChapterOnly}
                onChange={(e) => update({ myChapterOnly: e.target.checked })}
                className="peer sr-only"
                aria-label="Show my chapter only"
            />
            <span
                className="
                    relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full
                    bg-gray-300 dark:bg-gray-600 transition-colors
                    after:absolute after:left-1 after:h-5 after:w-5 after:rounded-full after:bg-white
                    after:transition-all
                    peer-checked:bg-amber-400 peer-checked:after:translate-x-5
                    ring-1 ring-inset ring-gray-300 dark:ring-gray-700
                "
                aria-hidden="true"
            />
            <span className="text-gray-700 dark:text-gray-200 text-sm">{content}</span>
        </label>
    );
}

export default Checkbox;
