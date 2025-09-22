
function ActivityButton({ content = "hi" }) {
  return (
    <button className=" text-teal-500/80 
    font-semibold py-2 px-4 
    rounded-2xl border-teal-500 
    border-2 " >
      <p className="text-nowrap text-[12px] ">
        {content}
      </p>
    </button>
  )
}

export default ActivityButton;