import Stats from './Components/Stat'
import StatTable from './Components/StatTable'
import LineGraph from './Components/LineGraph'
import Graph from './Components/Graph'
import RegionChapterManager from './Components/AdminRegion'
import AlertSystem from './Components/AlertSystem'


export default function Admin() {
  return (
    <div className="min-h-screen w-full  transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold dark:text-white">Admin Portal</h1>
        </div>
        <Stats />
        <RegionChapterManager />
        <StatTable />
        <div className="mt-15 max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold dark:text-white">Reports</h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'> 
        <LineGraph />
        <Graph />
        </div>
        <AlertSystem />
      </div>
    </div>
  )
}