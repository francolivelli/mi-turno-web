"use client";
import "../styles/globals.css";
import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";



export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>
        <TopBanner />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
