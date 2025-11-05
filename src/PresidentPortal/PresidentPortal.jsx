import React, { useState } from 'react'
import Header from '../MainPage/Header'
import AlertSystem from './AlertSystem'
import EventManagement from './EventManagement'
import Hero from './Hero'
import MemberRenewalManagement from './MemberRenewalManagement'

function PresidentPortal() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen w-full  transition-colors duration-300">
      <div className="fixed top-2 left-0 right-0 z-50  shadow-md">
        <Header />
      </div>

      <div className="pt-20 w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Hero onRefresh={handleRefresh} />

          <EventManagement refreshTrigger={refreshTrigger} /> 

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="w-full">
              <MemberRenewalManagement refreshTrigger={refreshTrigger} />
            </div>
            <div className="w-full">
              <AlertSystem onAlertSent={handleRefresh} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PresidentPortal