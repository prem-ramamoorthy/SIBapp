import React from 'react'

function SiteButtonUI({style , style2 , color = "black" , content = "12 sep 2025" , display = "content" , to = null}) {
  return (
    <a className="px-4 py-2 bg-yellow-50 rounded-xl hover:bg-yellow-100/40 w-4/4 h-4/4 border-2 border-gray-400/50 hover:border-gray-500/70 transition-all duration-200 ease-in-out cursor-pointer
                    flex flex-col justify-center items-center" href={to}>
        <span className={`text-md font-medium [display:${display}]`} style={style}>Renewal Date</span>
        <span className={`text-sm font-semibold ${color}`} style={style2}>{content}</span>
    </a>
  )
}

export default SiteButtonUI 