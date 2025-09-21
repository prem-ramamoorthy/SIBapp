import React from 'react'

function Header() {
  return (
    <div className="div1 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
                        [grid-area:1/1/2/3] 
                        sm:[grid-area:1/1/1/5] 
                        md:[grid-area:1/1/1/7] 
                        lg:[grid-area:1/1/1/11] 
                        xl:[grid-area:1/1/1/11]"
    >
      Header
    </div>
  )
}

export default Header