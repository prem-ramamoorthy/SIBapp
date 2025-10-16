import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { transformWeeklyData } from '../../utils/dataTransform.mjs';
import useFetch from '../../hooks/useFetch';

function LoadingAnimation() {
  return (
    <div style={{
      width: '100%',
      height: 320,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1,2,3].map(i => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#007bff',
              animation: `bounce 1s ease-in-out ${i * 0.15}s infinite`
            }}
          />
        ))}
      </div>
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
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
        style={{
          width: '100%',
          height: 320,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c00',
          fontWeight: 500,
          fontSize: 22,
          background: '#fff4f4',
          borderRadius: 12
        }}
      >
        Error loading data. Please try again later.
      </div>
    );
  }

  const transformedData = data ? transformWeeklyData(data) : [];

  return (
    <div style={{ width: '100%', height: "100%" }} className='py-4'>
      <ResponsiveContainer>
        <LineChart data={transformedData} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="referral_given" stroke="black" strokeWidth={2} />
          <Line type="monotone" dataKey="tyftb_given" stroke="red" strokeWidth={2} />
          <Line type="monotone" dataKey="M2Ms" stroke="blue" strokeWidth={2} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
