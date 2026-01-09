import React, { useState } from "react";
import { Image } from "lucide-react";
import Header from "../MainPage/Header";
import LowAttendanceAlert from "./components/LowAttendanceAlert";
import MemberActivityReport from "./components/MemberActivityReport";
import AttendanceOverview from './components/AttendanceReport';
import PhotoGallery from './components/PhotoGall';

function Coordinatorsportal() {
  const [showGallery, setShowGallery] = useState(false);

  if (showGallery) {
    return <PhotoGallery onBack={() => setShowGallery(false)} />;
  }

  return (
    <div className="min-h-screen w-full transition-colors duration-300">
      <div className="fixed top-2 left-0 right-0 z-50 shadow-md">
        <Header />
      </div>
      
      <div >
       

        <MemberActivityReport />
        <AttendanceOverview />
<div className="pt-24 px-4 pb-8 max-w-7xl mx-auto space-y-6">
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
        <LowAttendanceAlert />
      </div>
      </div>
    </div>
  );
}

export default Coordinatorsportal;