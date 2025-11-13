import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { transformWeeklyData } from '../../utils/dataTransform.mjs';
import useFetch from '../../hooks/useFetch';

function LoadingAnimation() {
  return (
    <div
      className="
        w-full h-[320px]
        flex items-center justify-center
        bg-white dark:bg-gray-800
        rounded-lg
        transition-colors duration-300
      "
    >
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              w-3 h-3 rounded-full bg-blue-500
              animate-bounce
            "
            style={{
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function RevenueLine() {
  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/weekstats`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (loading) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div
        className="
          w-full h-[320px]
          flex items-center justify-center
          text-red-600 font-semibold text-lg
          bg-red-50 dark:bg-red-950 dark:text-red-300
          rounded-lg
          transition-colors duration-300
        "
      >
        Error loading data. Please try again later.
      </div>
    );
  }

  const transformedData = data ? transformWeeklyData(data) : [];

  return (
    <div
      className="
        w-full h-full py-4
        bg-white dark:bg-gray-900
        rounded-lg
        transition-colors duration-300
        text-black dark:text-white
      "
    >
      <ResponsiveContainer>
        <LineChart data={transformedData} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" className="dark:stroke-gray-600" />
          <XAxis
            dataKey="name"
            stroke="currentColor"
            tick={{ fill: 'currentColor' }}
            className="dark:fill-gray-200 dark:stroke-gray-200"
          />
          <YAxis
            stroke="currentColor"
            tick={{ fill: 'currentColor' }}
            className="dark:fill-gray-200 dark:stroke-gray-200"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'transparent',
              color: 'currentcolor',
              borderRadius: '8px',
            }}
            wrapperStyle={{
              backgroundColor: 'transparent',
            }}
            labelStyle={{ color: 'currentColor' }}
            itemStyle={{ color: 'currentColor' }}
          />
          <Line type="monotone" dataKey="referral_given" stroke="currentColor" strokeWidth={2} />
          <Line type="monotone" dataKey="tyb_given" stroke="#ef4444" strokeWidth={2} />
          <Line type="monotone" dataKey="M2Ms" stroke="#3b82f6" strokeWidth={2} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
