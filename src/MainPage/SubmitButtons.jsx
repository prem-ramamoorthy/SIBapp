import React from 'react'
import ButtonUI from './Components/ButtonUI'

function SubmitButtons() {
  const buttons = () => {
    return Array.from({ length: 4 }, (_, i) => (
      <ButtonUI key={i} index={i} label={`Submit TYFTB ${i + 1}`} description="Create new referal slip" />
    ));
  }
  return (
    <div className="div7 rounded-lg sm:rounded-xl lg:rounded-2xl
                [grid-area:20/1/21/2]
                sm:[grid-area:8/1/9/5]  
                md:[grid-area:9/1/10/7] 
                lg:[grid-area:9/1/10/9] 
                xl:[grid-area:10/1/11/11]
                grid 
                grid-cols-2 
                grid-rows-2 
                md:grid-cols-4 
                md:grid-rows-1
                lg:grid-cols-4 
                lg:grid-rows-1
                gap-2 gap-y-0 p-2 place-items-center
                lg:gap-4
                "
    >
      {buttons()}
    </div>



  )
}

export default SubmitButtons