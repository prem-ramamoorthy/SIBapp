import Graph from './Components/Graph'

function Graphs() {
  return (
    <div
      className="
        bg-white dark:bg-gray-900 
        rounded-lg sm:rounded-xl lg:rounded-2xl
        py-4 sm:py-6 lg:py-8 
        shadow-sm dark:shadow-gray-900/20
        transition-colors duration-300
        w-full
        min-h-[350px]
      "
    >
      <p className="text-md font-semibold text-gray-600 dark:text-gray-200 px-4 mb-4">
        Weekly Activity Trends
      </p>
      <div className="w-full h-[300px] px-2">
         <Graph />
      </div>
    </div>
  )
}

export default Graphs