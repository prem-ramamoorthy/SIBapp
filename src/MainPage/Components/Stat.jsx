
function Stat({ value, label , money = false }) {
    return (
        <div className="flex flex-col">
            <h2 className="text-2xl px-1 text-yellow-500">{money ? `₹${value}` : value}</h2>
            <h3 className="text-[1rem]">{label}</h3>
        </div>
    )
}

export default Stat