import Stats from './Components/Stat'
import StatTable from './Components/StatTable'
import LineGraph from './Components/LineGraph'
import Graph from './Components/Graph'
import RegionChapterManager from './Components/AdminRegion'
import AlertSystem from './Components/AlertSystem'
import { useState } from 'react'
import PhotoGallery from '../Coordinatorsportal/components/PhotoGall'
import { Image } from 'lucide-react'


export default function Admin() {
  const [showGallery, setShowGallery] = useState(false);

  if (showGallery) {
    return <PhotoGallery onBack={() => setShowGallery(false)} />;
  }
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Event Gallery</h2>
            <p className="text-gray-500 text-sm mt-1">Manage event photos and collections</p>
          </div>
          <button
            onClick={() => setShowGallery(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Image size={20} />
            Open Gallery
          </button>
        </div>
      </div>
        <AlertSystem />
    </div>
  )
}