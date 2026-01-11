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
         <AlertSystem /> 
        <div className="w-full max-w-lg p-12 rounded-3xl border shadow-xl transition-all duration-300
    flex flex-col items-center text-center gap-8
    /* Light Mode */
    bg-white border-gray-100 
    /* Dark Mode */
    dark:bg-gray-800 dark:border-gray-700">

  {/* Scaled-up Text Content */}
  <div>
    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
      Event Gallery
    </h2>
    <p className="text-lg text-gray-500 dark:text-gray-300 leading-relaxed">
      Explore our complete collection of memorable moments. 
      Browse and share high-quality images from all our latest events in one place.
    </p>
  </div>

  {/* Scaled-up Button */}
  <button
    onClick={() => setShowGallery(true)}
    className="flex items-center gap-3 px-8 py-4 rounded-xl text-lg font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl active:scale-95
    /* Button Colors */
    bg-emerald-600 hover:bg-emerald-700 
    dark:bg-emerald-600 dark:hover:bg-emerald-500"
  >
    <Image size={28} />
    Open Gallery
  </button>
  
</div>
     
      </div>
    </div>
  )
}