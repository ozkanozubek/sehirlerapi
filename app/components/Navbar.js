"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger menü ikonları için font paketi

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobil menüyü aç/kapa durumu

  // Menü başlıkları ve alt menüleri
  const menus = [
    {
      name: "Hizmetler",
      submenu: ["Danışmanlık", "Eğitim", "Yazılım Geliştirme"],
      href: ["/danismanlik", "/egitim", "/yazilim"]
    },
    {
      name: "Hakkımızda",
      submenu: ["Vizyonumuz", "Ekibimiz", "Tarihçemiz"],
      href: ["/vizyonumuz", "/ekibimiz", "/tarihcemiz"]
    },
    {
      name: "İletişim",
      submenu: ["Bize Ulaşın", "Destek", "Ofislerimiz"],
      href: ["/iletisim/bize-ulasin", "/iletisim/destek", "/iletisim/ofislerimiz"]
    },
  ];

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <div className="text-xl font-bold text-blue-600">LOGO</div>

        {/* Mobil ekranlar için hamburger butonu */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {/* Menü açık ise X, değilse hamburger ikonu gösterilir */}
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Masaüstü menü */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Arama kutusu */}
          <input
            type="text"
            placeholder="Ara..."
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none"
          />

          {/* Menü başlıkları ve alt menüler */}
          {menus.map((menu, index) => (
            <div key={index} className="relative group">
              {/* Menü başlığı */}
              <span className="cursor-pointer hover:text-blue-600">
                {menu.name}
              </span>

              {/* Alt menü kutusu */}
              <div
                className="absolute left-0 top-full 
                  invisible opacity-0 scale-95 
                  group-hover:visible group-hover:opacity-100 group-hover:scale-100 
                  transition-all duration-300 ease-out
                  bg-white shadow-md mt-2 rounded w-44 z-50"
              >
                {/* Alt menü öğeleri */}
                {menu.submenu.map((item, i) => (
                  <a
                    href={menu.href?.[i] || "#"}
                    key={i}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobil menü açık ise göster */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {/* Arama kutusu */}
          <input
            type="text"
            placeholder="Ara..."
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
          />

          {/* Accordion şeklinde açılır mobil menü */}
          {menus.map((menu, index) => (
            <details key={index} className="group">
              {/* Menü başlığı */}
              <summary className="cursor-pointer py-2 px-4 hover:bg-gray-100 rounded">
                {menu.name}
              </summary>

              {/* Alt menü öğeleri */}
              <div className="ml-4 space-y-1 mt-1">
                {menu.submenu.map((item, i) => (
                  <a
                    href={menu.href?.[i] || "#"}
                    key={i}
                    className="block px-4 py-1 hover:bg-gray-100"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </details>
          ))}
        </div>
      )}
    </nav>
  );
}



