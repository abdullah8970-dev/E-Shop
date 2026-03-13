import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar";
import CartPopup from "./components/CartPopup";
import { Providers } from './providers';
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Providers>
          <Navbar />
          <main className="pt-16">{children}</main>
          <CartPopup />
        </Providers>
      </body>
    </html>
  );
}
