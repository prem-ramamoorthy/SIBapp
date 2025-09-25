import clsx from "clsx"

function ActivityField({
    classname = "",
    data = "Name"
}) {
  return (
    <p className={clsx("w-[120px] text-nowrap  text-center  mx-2 overflow-x-hidden" ,classname)}>{data}</p>
  )
}

export default ActivityField