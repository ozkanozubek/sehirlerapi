'use client';
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/ecilc.json')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">ECILC Hisse Tarihsel Verileri</h1>

      <table className="min-w-full border text-sm mb-6">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Tarih</th>
            <th className="border px-2 py-1">Kapanış</th>
            <th className="border px-2 py-1">Hacim</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td className="border px-2 py-1">{row.date}</td>
              <td className="border px-2 py-1">{row.close}</td>
              <td className="border px-2 py-1">{row.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Grafik */}
      <Chart data={data} />
    </div>
  );
}

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function Chart({ data }) {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data.slice(-100)}>
          <XAxis dataKey="date" hide />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

//npm install recharts    bunu unutma
