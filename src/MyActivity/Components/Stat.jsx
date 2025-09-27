import clsx from "clsx"

function Stat({
    name , value , classname
}) {
    return (
        <div className={clsx("stat flex flex-col justify-center items-center border-1 border-gray-600 rounded-2xl w-[200px] p-4 mt-2",classname)}>
            <p className="text-2xl font-bold pb-2">{value}</p>
            <p className="font-semibold">{name}</p>
        </div>
    )
}

export default Stat