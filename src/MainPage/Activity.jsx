import { useEffect, useMemo, useState } from 'react';
import ActivityButton from './Components/ActivityButton';
import ActivityP from './Components/ActivityP';

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
  const url = useMemo(
    () => `${base}/dashboard/getactivity/${activeTab}`,
    [base, activeTab]
  );
  const url2 = useMemo(
    () => `${base}/dashboard/getactivityupcoming/${activeTab}`,
    [base, activeTab]
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchActivity() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { method: 'GET', credentials: 'include' });
        if (!res.ok) {
          const msg = `Request failed: ${res.status}`;
          throw new Error(msg);
        }
        const json = await res.json();
        const res2 = await fetch(url2, { method: 'GET', credentials: 'include' });
        if (!res2.ok) {
          const msg2 = `Request failed: ${res2.status}`;
          throw new Error(msg2);
        }
        const json2 = await res2.json();
        if (!cancelled) setData2(json2);
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Unknown error');
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchActivity();
    return () => {
      cancelled = true;
    };
  }, [url]);

  const Buttons = TABS.map((tab) => (
    <ActivityButton
      key={tab.value}
      content={tab.label}
      onClick={() => setActiveTab(tab.value)}
      active={activeTab === tab.value}
    />
  ));

  const extractDecimal = (v) => {
    if (v == null) return -1;
    if (typeof v === 'object' && v.$numberDecimal !== undefined) return v.$numberDecimal;
    return v;
  };

  const tyftb = (v) => {
    if (v == null) return -1;
    if (typeof v === 'object' && v.$numberDecimal !== undefined) return `₹${v.$numberDecimal}`;
    return v;
  };

  const ActivityPs = [
    { content: 'Referral Given', upcoming: extractDecimal(data2?.referral_given), actual: error ? 'error' : extractDecimal(data?.referral_given) },
    { content: 'Referral Received', upcoming: extractDecimal(data2?.referral_received), actual: error ? 'error' : extractDecimal(data?.referral_received) },
    { content: 'TYB Given', upcoming: tyftb(data2?.business_given1), actual: error ? 'error' : tyftb(data?.business_given1) },
    { content: 'TYB Received', upcoming: tyftb(data2?.business_made), actual: error ? 'error' : tyftb(data?.business_made) },
    { content: 'M to M', upcoming: extractDecimal(data2?.M2Ms), actual: error ? 'error' : extractDecimal(data?.M2Ms) },
    { content: 'Visitor', upcoming: extractDecimal(data2?.Visitors), actual: error ? 'error' : extractDecimal(data?.Visitors) },
  ].map((props, index) => <ActivityP key={index} {...props} />);

  return (
    <div
      className="
        div2 rounded-lg sm:rounded-xl lg:rounded-2xl
        [grid-area:10/1/15/2]
        sm:[grid-area:5/1/8/3]
        md:[grid-area:5/1/9/4]
        lg:[grid-area:5/1/9/5]
        xl:[grid-area:5/1/10/5]
        bg-white dark:bg-gray-900
        text-gray-900 dark:text-gray-100
        max-w-full
        min-h-0
        overflow-hidden
        flex flex-col
        shadow-md dark:shadow-gray-800/50
        transition-colors duration-300
      "
    >
      <div className="header flex items-center justify-between gap-2 px-4 py-3 shrink-0 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-[18px] font-[600] text-black dark:text-gray-100 m-0">
          Activity
        </h2>
        <div className="buttonContainer flex gap-2">
          {loading &&
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-red-400"></div>
            </div>}
          {Buttons}
        </div>
      </div>

      <div className="container max-w-full min-h-0 flex-1 overflow-auto">
        {ActivityPs}
      </div>
    </div>
  );
}

export default Activity;
