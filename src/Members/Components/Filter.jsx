function Filter({ name, state, update, content = [] }) {
  return (
    <label className="flex flex-col">
      <span className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-300">{name}</span>
      <select
        value={state}
        onChange={(e) => update(e.target.value)}
        className="py-2 px-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200 shadow-sm"
      >
        {content.map((c, i) => (
          <option key={c._id || i} value={c._id || c}>{c.region_name || c}</option>
        ))}
      </select>
    </label>
  );
}

export default Filter;