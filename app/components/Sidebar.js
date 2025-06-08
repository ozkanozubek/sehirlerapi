"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  // Menü öğeleri ve bağlantı adresleri
  const menuItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Projeler", href: "/projeler" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <>
      {/* Aç/Kapat butonu */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 z-50"
      >
        ≡
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Kapatma butonu */}
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Logo ve içerik */}
        <div className="flex flex-col items-center text-center px-4">
          <div className="text-2xl font-bold text-blue-600 mb-2">LOGO</div>
          <h2 className="text-lg font-semibold mb-4">Menü</h2>

          <ul className="space-y-3">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
