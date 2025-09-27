function Filter({
    state , update , content , name
}) {
    return (
        <div className="flex flex-col">
            <label  className="text-sm font-medium text-gray-700">
                {name}:
            </label>
            <select
                value={state.region}
                onChange={(e) => update({ region: e.target.value })}
                className="
              mt-1 h-11
              rounded-xl
              bg-white
              px-3
              text-sm
              text-gray-900
              ring-1 ring-gray-800
              focus:outline-none focus:ring-2 focus:ring-amber-400
              appearance-none
              pr-9
              bg-[right_0.65rem_center] bg-no-repeat
            "
                style={{
                    backgroundImage:
                        "linear-gradient(45deg, transparent 50%, #6B7280 50%), linear-gradient(135deg, #6B7280 50%, transparent 50%)",
                    backgroundSize: "6px 6px, 6px 6px",
                    backgroundPosition: "calc(100% - 18px) 55%, calc(100% - 12px) 55%",
                }}
            >
                {content.map((r) => (
                    <option key={r}>{r}</option>
                ))}
            </select>
        </div>
    )
}

export default Filter