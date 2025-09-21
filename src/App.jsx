import React from 'react'
import ChapterOverview from './MainPage/ChapterOverview.jsx'
import Header from './MainPage/Header.jsx'
import './index.css'
import Activity from './MainPage/Activity.jsx'
import Siteinfo from './MainPage/SiteInfo.jsx'
import UpcomingEvents from './MainPage/UpcomingEvents.jsx'
import Graphs from './MainPage/Graphs.jsx'
import SubmitButtons from './MainPage/SubmitButtons.jsx'

function App() {
  return (
    <div className="parent grid grid-flow-row-dense 
                    grid-cols-2 
                    sm:grid-cols-1 
                    md:grid-cols-6 
                    lg:grid-cols-10 
                    xl:grid-cols-10 
                    grid-rows-8 
                    sm:grid-rows-10 
                    md:grid-rows-9 
                    lg:grid-rows-10
                    xl:grid-rows-10 
                    gap-2 
                    sm:gap-3
                    lg:gap-4 
                    bg-gray-200 
                    min-h-screen
                    w-screen 
                    p-2
                    sm:p-3">
      <Header />
      <Activity />
      <ChapterOverview />
      <Siteinfo />
      <UpcomingEvents />
      <Graphs />
      <SubmitButtons />
    </div>
  )
}

export default App