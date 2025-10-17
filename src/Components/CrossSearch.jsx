function CrossChapterSearch({
  value,
  onChange,
  onSearch,
  placeholder = "Please select from dropdown below or search cross chapter",
  label = "To",
}) {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      <label className="text-sm font-medium text-gray-900 dark:text-gray-200">{label}</label>

      <div className="flex w-full items-center gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder}
            className="
              block w-full rounded-lg border border-yellow-300 bg-gray-100
              px-4 py-3 text-gray-800 placeholder:text-gray-400 placeholder:text-sm
              focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
              dark:bg-gray-800 dark:border-yellow-500 dark:text-gray-100 dark:placeholder:text-gray-400
            "
          />
        </div>
        <button
          type="button"
          onClick={onSearch}
          className="
            inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white
            hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400
            dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-500
          "
        >
          Search Cross Chapter
        </button>
      </div>
    </div>
  );
}

export default CrossChapterSearch;
