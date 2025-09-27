function EntryField({ value, readOnly = false, onChange,
  placeholder = "Hi hello Text here", type = "date", label = "Label"
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-900 text-nowrap">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full rounded-lg border border-gray-200 bg-gray-100
          px-4 py-2.5 text-sm text-gray-800
          placeholder:text-gray-400 placeholder:text-sm
          focus:outline-none focus:ring-0 focus:border-gray-200
        "
      />
    </div>
  );
}

export default EntryField;
