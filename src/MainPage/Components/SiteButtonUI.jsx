import React from 'react'

function SiteButtonUI({style , style2 , color = "black" , content = "12 sep 2025" , display = "content"}) {
  return (
    <button className="px-4 py-2 bg-yellow-50 rounded-xl hover:bg-yellow-100/40 w-4/4 h-4/4 border-2 border-gray-400/50 hover:border-gray-500/70 transition-all duration-200 ease-in-out
                    flex flex-col justify-center items-center">
        <span className={`text-md font-medium [display:${display}]`} style={style}>Renewal Date</span>
        <span className={`text-sm font-semibold ${color}`} style={style2}>{content}</span>
    </button>
  )
}

export default SiteButtonUI