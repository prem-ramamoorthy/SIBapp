import Graph from './Components/Graph'

function Graphs() {
  return (
    <div className="div6 bg-white rounded-lg sm:rounded-xl lg:rounded-2xl
                    [grid-area:15/1/20/2] 
                    sm:[grid-area:5/3/8/5] 
                    md:[grid-area:5/4/9/7] 
                    lg:[grid-area:5/5/9/9] 
                    xl:[grid-area:5/5/10/11]
                    py-4 sm:py-6 lg:py-8 "
    >
      <p className='text-md font-semibold text-gray-600 px-4'>Weekly Activity Trends</p>
      <Graph />
    </div>
  )
}

export default Graphs