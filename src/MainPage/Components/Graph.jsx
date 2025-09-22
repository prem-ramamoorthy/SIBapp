import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const data = [
  { name: 'Week1', uv: 800 , nv : 240, pv: 240},
  { name: 'Week2', uv: 300 , nv : 139, pv: 221},
  { name: 'Week3', uv: 200 , nv : 980, pv: 229},
  { name: 'Week4', uv: 278 , nv : 390, pv: 200},
];

export default function RevenueLine() {
  return (
    <div style={{ width: '100%', height: "100%" }} className='p-4'>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 16, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="black" strokeWidth={2} />
          <Line type="monotone" dataKey="nv" stroke="red" strokeWidth={2} />
          <Line type="monotone" dataKey="pv" stroke="blue" strokeWidth={2} />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}