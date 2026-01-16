import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  ChevronDown, 
  Sun, 
  Moon, 
  Building2, 
  FileText, 
  Users,
  Briefcase,
  AlertCircle
} from 'lucide-react';

/**
 * CONFIGURATION
 * Backend API Base URL from environment variables
 */
const BACKEND_SERVER_URL = import.meta.env.VITE_BACKEND_SERVER;

const EventsMeetingsPage = () => {
  const [activeTab, setActiveTab] = useState('meetings'); // 'meetings' | 'events'
  const [filterStatus, setFilterStatus] = useState('upcoming'); // 'upcoming' | 'history' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const [meetings, setMeetings] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  // --- Data Fetching Logic ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Parallel fetch using the provided backend URL
        const [meetingsRes, eventsRes] = await Promise.all([
          fetch(`${BACKEND_SERVER_URL}/public/getmeetings`),
          fetch(`${BACKEND_SERVER_URL}/public/getallevents`)
        ]);

        if (!meetingsRes.ok || !eventsRes.ok) throw new Error('Failed to fetch data');

        const meetingsData = await meetingsRes.json();
        const eventsData = await eventsRes.json();

        setMeetings(meetingsData);
        setEvents(eventsData);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Filtering & Sorting Logic ---
  const filteredData = useMemo(() => {
    let data = activeTab === 'meetings' ? meetings : events;
    const now = new Date();

    // 1. Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(item => {
        const title = (item.title || item.event_title || '').toLowerCase();
        const loc = (item.location || '').toLowerCase();
        const chapName = (item.chapter?.chapter_name || '').toLowerCase();
        return title.includes(lowerQuery) || loc.includes(lowerQuery) || chapName.includes(lowerQuery);
      });
    }

    // 2. Separate Upcoming vs History
    const upcoming = [];
    const history = [];

    data.forEach(item => {
      const dateStr = item.meeting_date || item.event_date;
      const itemDate = new Date(dateStr);
      // Simple date comparison (ignoring time for broad categorization, or include time if ISO)
      if (itemDate >= now) {
        upcoming.push(item);
      } else {
        history.push(item);
      }
    });

    // 3. Sorting
    // Upcoming: Soonest first (Ascending)
    upcoming.sort((a, b) => new Date(a.meeting_date || a.event_date) - new Date(b.meeting_date || b.event_date));
    
    // History: Most recent first (Descending)
    history.sort((a, b) => new Date(b.meeting_date || b.event_date) - new Date(a.meeting_date || a.event_date));

    // 4. Apply "Last 15" rule to history
    const limitedHistory = history.slice(0, 15);

    // 5. Return based on selected filter
    if (filterStatus === 'upcoming') return upcoming;
    if (filterStatus === 'history') return limitedHistory;
    
    // 'all': Upcoming first, then limited history
    return [...upcoming, ...limitedHistory];

  }, [activeTab, filterStatus, searchQuery, meetings, events]);

  // --- Utility Functions ---
  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    // Assuming time comes in "HH:mm" or ISO. If simple string, return as is.
    return timeString; 
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-gray-50 text-zinc-900'}`}>
      
      {/* --- Navbar --- */}
      <nav className={`border-b ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'} sticky top-0 z-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center font-bold text-black">
                C
              </div>
              <span className="font-bold text-xl tracking-tight">Chapter<span className="text-yellow-500">Hub</span></span>
            </div>
            
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-zinc-800 text-yellow-500' : 'hover:bg-gray-100 text-zinc-600'}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* --- Header Section --- */}
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-wider">
              {activeTab === 'meetings' ? 'Chapter Meetings' : 'Events & Gatherings'}
            </h1>
            <p className={`mt-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Browse upcoming schedules and past records.
            </p>
          </div>

          {/* Controls Container */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-opacity-50">
            
            {/* Tabs */}
            <div className={`flex p-1 rounded-lg w-full md:w-auto ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-200'}`}>
              <button
                onClick={() => setActiveTab('meetings')}
                className={`flex-1 md:w-32 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'meetings' 
                    ? 'bg-yellow-500 text-black shadow-lg' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                Meetings
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`flex-1 md:w-32 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'events' 
                    ? 'bg-red-600 text-white shadow-lg' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                Events
              </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-grow">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
                <input
                  type="text"
                  placeholder="Search title, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-all ${
                    isDarkMode 
                      ? 'bg-zinc-900 border-zinc-800 focus:ring-yellow-500 text-white placeholder-zinc-600' 
                      : 'bg-white border-gray-300 focus:ring-yellow-500 text-black'
                  }`}
                />
              </div>

              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`appearance-none w-full sm:w-40 pl-4 pr-10 py-2 rounded-lg border focus:ring-2 focus:outline-none cursor-pointer font-medium ${
                    isDarkMode 
                      ? 'bg-zinc-900 border-zinc-800 focus:ring-red-600 text-white' 
                      : 'bg-white border-gray-300 focus:ring-red-600 text-black'
                  }`}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="history">History (Last 15)</option>
                  <option value="all">View All</option>
                </select>
                <Filter className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`} />
              </div>
            </div>
          </div>
        </div>

        {/* --- Loading & Error States --- */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-64 rounded-xl ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-200'}`}></div>
            ))}
          </div>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-900/20 border border-red-800 text-red-400 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>Error loading data: {error}</span>
          </div>
        )}

        {/* --- Content Grid --- */}
        {!loading && !error && filteredData.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Briefcase size={48} className="mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-medium">No {activeTab} found</h3>
            <p>Try adjusting your filters or search query.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && !error && filteredData.map((item, index) => {
            const isEvent = activeTab === 'events';
            const title = isEvent ? item.event_title : item.title;
            const date = isEvent ? item.event_date : item.meeting_date;
            const time = isEvent ? item.event_time : item.meeting_time;
            const type = isEvent ? item.event_type : item.meeting_type;
            const status = isEvent ? item.event_status : item.meeting_status;
            const desc = isEvent ? item.event_description : item.meeting_notes;
            const id = item._id || index;

            // Determine Status Colors
            let statusColor = isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-gray-100 text-gray-600';
            if (status?.toLowerCase() === 'completed') statusColor = 'bg-green-900/30 text-green-400 border border-green-800';
            if (status?.toLowerCase() === 'upcoming' || status?.toLowerCase() === 'scheduled') statusColor = 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30';
            if (status?.toLowerCase() === 'cancelled') statusColor = 'bg-red-900/30 text-red-500 border border-red-800';

            return (
              <div 
                key={id}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  isDarkMode 
                    ? 'bg-zinc-900 border-zinc-800 hover:border-yellow-500/50' 
                    : 'bg-white border-gray-200 hover:border-yellow-400'
                }`}
              >
                {/* Top Accent Strip */}
                <div className={`h-1 w-full ${isEvent ? 'bg-red-600' : 'bg-yellow-500'}`} />
                
                <div className="p-6">
                  {/* Header: Date & Status */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <span className={`text-xs font-bold uppercase tracking-wider ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                        {formatDate(date).split(',')[0]} {/* Day name */}
                      </span>
                      <span className={`text-sm font-bold ${isEvent ? 'text-red-500' : 'text-yellow-500'}`}>
                        {formatDate(date)}
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wide ${statusColor}`}>
                      {status || 'Scheduled'}
                    </span>
                  </div>

                  {/* Title & Chapter */}
                  <h3 className="text-xl font-bold mb-2 line-clamp-2 leading-tight group-hover:text-yellow-500 transition-colors">
                    {title}
                  </h3>
                  
                  {item.chapter && (
                    <div className="flex items-center gap-2 mb-4 text-sm opacity-70">
                      <Building2 size={14} />
                      <span className="font-medium">{item.chapter.chapter_name}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300">
                        {item.chapter.chapter_code}
                      </span>
                    </div>
                  )}

                  {/* Details Grid */}
                  <div className={`space-y-3 pt-4 border-t ${isDarkMode ? 'border-zinc-800' : 'border-gray-100'}`}>
                    
                    {/* Time & Duration */}
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      <Clock size={16} className={isEvent ? 'text-red-500' : 'text-yellow-500'} />
                      <span>{formatTime(time)}</span>
                      {!isEvent && item.duration && (
                        <span className="text-xs opacity-60">({item.duration}m)</span>
                      )}
                    </div>

                    {/* Location */}
                    <div className="flex items-start gap-2 text-sm opacity-80">
                      <MapPin size={16} className="mt-0.5 flex-shrink-0 text-zinc-500" />
                      <span className="line-clamp-1">{item.location || 'Online / TBD'}</span>
                    </div>

                    {/* Type / Company */}
                    <div className="flex items-center gap-2 text-sm opacity-80">
                      {isEvent ? (
                         <Briefcase size={16} className="text-zinc-500" />
                      ) : (
                         <Users size={16} className="text-zinc-500" />
                      )}
                      <span className="capitalize">{isEvent ? (item.organizer_company || 'Organizer N/A') : type}</span>
                    </div>

                    {/* Description Snippet */}
                    {desc && (
                       <div className={`mt-3 text-xs p-2 rounded ${isDarkMode ? 'bg-zinc-950' : 'bg-gray-50 text-zinc-600'}`}>
                         <p className="line-clamp-2 italic opacity-70">
                           "{desc}"
                         </p>
                       </div>
                    )}
                  </div>
                </div>

                {/* Decorative Background Blob */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-5 pointer-events-none ${isEvent ? 'bg-red-600' : 'bg-yellow-500'}`}></div>
              </div>
            );
          })}
        </div>

      </main>
    </div>
  );
};

export default EventsMeetingsPage;