import ChapterOverview from './ChapterOverview.jsx'
import Header from './Header.jsx'
import Activity from './Activity.jsx'
import Siteinfo from './SiteInfo.jsx'
import UpcomingEvents from './UpcomingEvents.jsx'
import Graphs from './Graphs.jsx'
import SubmitButtons from './SubmitButtons.jsx'
import AnimatedRoute from '../hooks/AnimatedRoutes.jsx'

function Dashboard() {
  return (
    <AnimatedRoute>
      <div className="parent grid grid-flow-row-dense 
                    grid-cols-1 
                    sm:grid-cols-4 
                    md:grid-cols-6 
                    lg:grid-cols-8 
                    xl:grid-cols-10 
                    grid-rows-[repeat(20,_1fr)] 
                    sm:grid-rows-10 
                    md:grid-rows-9 
                    lg:grid-rows-9 
                    xl:grid-rows-10
                    gap-3 
                    sm:gap-3 
                    lg:gap-2 
                    h-[200vh]
                    sm:min-h-screen 
                    max-w-screen
                    sm:max-h-screen
                    md:max-h-screen
                    p-2 
                    sm:p-3"
      >
        <Header />
        <Activity />
        <ChapterOverview />
        <Siteinfo />
        <UpcomingEvents />
        <Graphs />
        <SubmitButtons />
      </div>
    </AnimatedRoute>
  )
}

export default Dashboard