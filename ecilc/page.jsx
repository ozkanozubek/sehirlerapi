// app/ecilc/page.jsx

'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/ecilc.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Veri alınamadı:', err));
  }, []);

  return (
    <div>
      <h1>ECILC Verileri</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
