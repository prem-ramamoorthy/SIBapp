import React, { useState } from 'react'
import Header from './AdminHeader'
import Stats from './Components/Stat'
import StatTable from './Components/StatTable'
import LineGraph from './Components/LineGraph'
import RevenueByChapterChart from './Components/Graph'

export default function Admin() {
  return (
    <div className="min-h-screen w-full  transition-colors duration-300">
      <div className="fixed top-2 left-0 right-0 z-50  shadow-md">
        <Header />
      </div>
        <div className="pt-20 w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          {/* Additional admin components can be added here */}
        </div>
        <Stats />
        <StatTable />
        <LineGraph />
        <RevenueByChapterChart />
        </div>
      </div>
  )
}