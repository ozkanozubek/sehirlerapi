'use client';
import React, { useState, useEffect } from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("tr-TR");
}

function formatNumber(num) {
  return Number(num).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " ₺";
}

// Hareketli ortalama hesaplayıcı
function calculateMovingAverage(data, key, windowSize = 10) {
  return data.map((item, index, arr) => {
    if (index < windowSize - 1) return { ...item, ma: null };
    const slice = arr.slice(index - windowSize + 1, index + 1);
    const sum = slice.reduce((acc, val) => acc + Number(val[key]), 0);
    return { ...item, ma: sum / windowSize };
  });
}

export default function Page() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("/ecilc.json")
      .then((res) => res.json())
      .then((json) => {
        const enriched = calculateMovingAverage(json, "close", 10);
        setData(enriched);
        setFilteredData(enriched);
      });
  }, []);

  const applyFilter = (range) => {
    setFilter(range);
    setSelectedDate("");
    if (range === "ALL") {
      setFilteredData(data);
      return;
    }

    const now = new Date();
    let past = new Date();

    if (range === "1M") past.setMonth(now.getMonth() - 1);
    if (range === "6M") past.setMonth(now.getMonth() - 6);
    if (range === "1Y") past.setFullYear(now.getFullYear() - 1);

    const filtered = data.filter((item) => new Date(item.date) >= past);
    setFilteredData(filtered);
  };

  const handleDateChange = (e) => {
    const dateStr = e.target.value;
    setSelectedDate(dateStr);
    setFilter("CUSTOM");
    const selected = new Date(dateStr);
    const filtered = data.filter((item) => new Date(item.date) >= selected);
    setFilteredData(filtered);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ECILC - Tarih Bazlı Görselleştirme</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {["1M", "6M", "1Y", "ALL"].map((btn) => (
          <button
            key={btn}
            className={`px-4 py-2 rounded ${
              filter === btn ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => applyFilter(btn)}
          >
            {btn}
          </button>
        ))}

        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-4 py-2 border rounded"
        />
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={filteredData}>
          <XAxis dataKey="date" tickFormatter={formatDate} />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip
            formatter={(value, name, props) => {
              const { payload } = props;
              const close = payload?.close ?? 0;
              const previous = payload?.previousClose ?? close;
              const change = (((close - previous) / previous) * 100).toFixed(2);

              if (name === "close")
                return [`${formatNumber(value)} (%${change})`, "Kapanış"];
              if (name === "ma") return [formatNumber(value), "10 Günlük Ort"];
              if (name === "volume")
                return [value.toLocaleString("tr-TR"), "Hacim"];
              return value;
            }}
            labelFormatter={(label) => formatDate(label)}
          />
          <Bar yAxisId="right" dataKey="volume" barSize={20} fill="#d1d5db" />
          <Line yAxisId="left" type="monotone" dataKey="close" stroke="#0070f3" dot={false} />
          <Line yAxisId="left" type="monotone" dataKey="ma" stroke="#10b981" dot={false} strokeDasharray="3 3" />
        </ComposedChart>
      </ResponsiveContainer>

      <table className="w-full mt-8 text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tarih</th>
            <th className="p-2 border">Kapanış</th>
            <th className="p-2 border">Hacim</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, i) => (
            <tr key={i} className="text-center">
              <td className="p-2 border">{formatDate(item.date)}</td>
              <td className="p-2 border">{formatNumber(item.close)}</td>
              <td className="p-2 border">{Number(item.volume).toLocaleString("tr-TR")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
