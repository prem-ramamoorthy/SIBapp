function DateField({
    handler,
    value
}) {
    return (
        <label className="date-item">
            <input
                type="date"
                value={value}
                className="rp-input  border-2 border-gray-300 mx-4 px-2 rounded-xl
            font-semibold text-md h-[40px] text-gray-600"
                name="activity-type"
                onChange={(e) => handler(e.target.value)}
            />
        </label>
    )
}

export default DateField