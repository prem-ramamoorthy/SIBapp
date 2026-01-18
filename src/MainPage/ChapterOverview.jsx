import React from "react";
import { Calendar, Building2, AlertCircle, Users, IndianRupee, Eye, TrendingUp, ArrowRight } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loading from "../Components/Loading";

function ChapterOverview() {
  // 1. Fetch Overview Data (Stats)
  const { 
    data: overviewData, 
    loading: overviewLoading, 
    error: overviewError 
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/getchapteroverview`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  // 2. Fetch Meetings Data (For Next Meeting Date)
  const { 
    data: meetingsData, 
    loading: meetingsLoading, 
    error: meetingsError 
  } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/meeting/getmeetings`, 
    {
      method: "GET",
      credentials: "include",
    }
  );

  // Helper: Find the next upcoming meeting from the list
  const getNextMeeting = () => {
    if (!meetingsData || !Array.isArray(meetingsData) || meetingsData.length === 0) {
      return "Not Scheduled";
    }

    // Filter for future meetings
    const today = new Date();
    today.setHours(0, 0, 0, 0); // compare dates without time offset issues

    const futureMeetings = meetingsData.filter((meeting) => {
      const mDate = new Date(meeting.meeting_date);
      return mDate >= today;
    });

    if (futureMeetings.length === 0) return "No Upcoming Meetings";

    // Sort by date ascending (closest date first)
    futureMeetings.sort((a, b) => new Date(a.meeting_date) - new Date(b.meeting_date));

    // Return formatted date of the first one
    const nextMeetingDate = new Date(futureMeetings[0].meeting_date);
    return nextMeetingDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Helper for currency formatting (Indian Rupee)
  const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    }
    return amount;
  };

  // Combined Loading and Error states
  const loading = overviewLoading || meetingsLoading;
  const error = overviewError || meetingsError;

  return (
    <div className="w-full relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-black/40 border border-gray-100 dark:border-gray-800 transition-all duration-300">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative p-6 sm:p-8">
        {/* Header Label */}
        <div className="flex items-center justify-between mb-6">
          <h6 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Chapter Dashboard
          </h6>
          {!loading && !error && (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-300 mb-6">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>Unable to load chapter data. <span className="opacity-80 block text-xs mt-1">{error}</span></p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loading />
          </div>
        ) : overviewData ? (
          <div className="flex flex-col gap-8">
            
            {/* Main Header Section */}
            <div className="text-center sm:text-left space-y-4">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {overviewData.chapterName}
              </h2>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-semibold shadow-sm">
                <Calendar className="w-4 h-4" />
                <span>Next Meeting: {getNextMeeting()}</span>
              </div>
            </div>

            {/* Statistics Row - Grid with 3 columns ensures single row on mobile while allowing styling */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 border-t border-gray-100 dark:border-gray-800 pt-6">
              
              {/* Member Stat */}
              <div className="group flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                
                <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewData.totalMembers}
                </span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-1">
                  Members
                </span>
              </div>

              {/* Revenue Stat */}
              <div className="group flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                
                <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(overviewData.totalRevenue)}
                </span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-1">
                  Revenue
                </span>
              </div>

              {/* Visitor Stat */}
              <div className="group flex flex-col items-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                
                <span className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {overviewData.totalvisitors}
                </span>
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mt-1">
                  Visitors
                </span>
              </div>

            </div>
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400 dark:text-gray-500 italic">No chapter data available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChapterOverview;