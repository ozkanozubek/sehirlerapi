// app/layout.jsx
import "./globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export const metadata = {
  title: "Şehirler API",
  description: "Şehir bilgilerini sunan uygulama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <Sidebar/>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
