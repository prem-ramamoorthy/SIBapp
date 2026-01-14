import React, { useEffect, useMemo, useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Handshake, 
  UserPlus, 
  TrendingUp, 
  ArrowRight
} from 'lucide-react';

// --- Components ---

const TabButton = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 border
      ${active 
        ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-sm' 
        : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
      }
    `}
  >
    {label}
  </button>
);

const MetricRow = ({ icon: Icon, label, upcoming, actual }) => (
  <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] items-center py-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors px-4 sm:px-6">
    
    {/* Label Section */}
    <div className="flex items-center gap-3 overflow-hidden pr-2">
      <div className="flex-shrink-0 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-400 dark:text-gray-500">
        <Icon size={16} strokeWidth={2} />
      </div>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
        {label}
      </span>
    </div>

    {/* Upcoming Value (Amber) */}
    <div className="text-right">
      <span className={`
        text-sm font-bold font-mono tabular-nums tracking-tight
        ${upcoming !== -1 ? 'text-amber-500' : 'text-gray-300 dark:text-gray-700'}
      `}>
        {upcoming !== -1 ? upcoming : '—'}
      </span>
    </div>

    {/* Actual Value (Grey/Standard) */}
    <div className="text-right">
      <span className={`
        text-sm font-bold font-mono tabular-nums tracking-tight
        ${actual === 'error' ? 'text-red-500' : 'text-gray-900 dark:text-white'}
      `}>
        {actual === 'error' ? '!' : (actual !== -1 ? actual : '—')}
      </span>
    </div>

  </div>
);

const SkeletonLoader = () => (
  <div className="px-4 sm:px-6 py-2">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-800 animate-pulse">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
        <div className="flex gap-4 sm:gap-8">
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-4 w-12 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);

// --- Main Component ---

const TABS = [
  { label: 'Lifetime', value: 'full' },
  { label: '6 Months', value: '6months' },
  { label: 'Month', value: 'amonth' },
];

function Activity() {
  const [activeTab, setActiveTab] = useState('amonth');
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const base = import.meta.env.VITE_BACKEND_SERVER;
  
  const url = useMemo(() => `${base}/dashboard/getactivity/${activeTab}`, [base, activeTab]);
  const url2 = useMemo(() => `${base}/dashboard/getactivityupcoming/${activeTab}`, [base, activeTab]);

  useEffect(() => {
    let cancelled = false;

    async function fetchActivity() {
      setLoading(true);
      setError(null);

      try {
        const [res, res2] = await Promise.all([
          fetch(url, { method: 'GET', credentials: 'include' }),
          fetch(url2, { method: 'GET', credentials: 'include' })
        ]);

        if (!res.ok) throw new Error(`Status: ${res.status}`);
        if (!res2.ok) throw new Error(`Status: ${res2.status}`);

        const json = await res.json();
        const json2 = await res2.json();

        if (!cancelled) {
          setData(json);
          setData2(json2);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Error');
          setData(null);
          setData2(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchActivity();
    return () => { cancelled = true; };
  }, [url, url2]);

  const extractDecimal = (v) => {
    if (v === undefined || v === null) return -1;
    if (typeof v === 'object' && v.$numberDecimal !== undefined) return parseFloat(v.$numberDecimal).toLocaleString();
    return v;
  };

  const formatCurrency = (v) => {
    const val = extractDecimal(v);
    if (val === -1) return -1;
    return `₹${val}`;
  };

  const metrics = [
    { icon: UserPlus, label: 'Referrals Given', upcoming: extractDecimal(data2?.referral_given), actual: extractDecimal(data?.referral_given) },
    { icon: Users, label: 'Referrals Received', upcoming: extractDecimal(data2?.referral_received), actual: extractDecimal(data?.referral_received) },
    { icon: Briefcase, label: 'TYB Given', upcoming: formatCurrency(data2?.business_given1), actual: formatCurrency(data?.business_given1) },
    { icon: TrendingUp, label: 'TYB Received', upcoming: formatCurrency(data2?.business_made), actual: formatCurrency(data?.business_made) },
    { icon: Handshake, label: '1-to-1s', upcoming: extractDecimal(data2?.M2Ms), actual: extractDecimal(data?.M2Ms) },
    { icon: ArrowRight, label: 'Visitors', upcoming: extractDecimal(data2?.Visitors), actual: extractDecimal(data?.Visitors) },
  ];

  return (
    <div className="w-full h-fit">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden flex flex-col">
        
        {/* Header Section */}
        <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Activity</h2>
            <p className="text-xs text-gray-500 mt-0.5">Performance tracking</p>
          </div>
          <div className="flex bg-gray-100 dark:bg-gray-800/50 p-1 rounded-full self-start sm:self-auto">
            {TABS.map((tab) => (
              <TabButton
                key={tab.value}
                label={tab.label}
                active={activeTab === tab.value}
                onClick={() => setActiveTab(tab.value)}
              />
            ))}
          </div>
        </div>

        {/* Table Header Row */}
        <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] px-4 sm:px-6 py-2 bg-gray-50/80 dark:bg-gray-800/20 border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <div className="pl-2">Metric</div>
          <div className="text-right text-amber-500/90">Upcoming</div>
          <div className="text-right text-gray-500">Actual</div>
        </div>

        {/* Content Rows */}
        <div className="flex-1 bg-white dark:bg-gray-900 min-h-[300px] relative">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div>
              {metrics.map((item, idx) => (
                <MetricRow
                  key={idx}
                  {...item}
                  actual={error ? 'error' : item.actual}
                />
              ))}
            </div>
          )}

          {error && !loading && !data && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-red-500 mb-2">{error}</p>
              <button 
                onClick={() => setActiveTab(activeTab)}
                className="text-xs text-gray-500 hover:text-gray-900 underline"
              >
                Retry Request
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Activity;