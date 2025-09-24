function Stat({
    name , value
}) {
    return (
        <div className="stat flex flex-col justify-center items-center border-1 border-gray-600 rounded-2xl min-w-[140px] p-4 m-2 lg:min-w-1/5">
            <p className="text-2xl font-bold pb-2">{value}</p>
            <p className="font-semibold">{name}</p>
        </div>
    )
}

export default Stat