import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ohio Drip — Brainrot Merch Store 🧠",
  description:
    "The #1 brainrot merch store. Skibidi Toilet, Bombardiro Crocodilo, Sigma essentials & more. Only in Ohio. 🔥",
  keywords: [
    "brainrot",
    "skibidi toilet",
    "bombardiro crocodilo",
    "sigma",
    "mewing",
    "ohio",
    "gen z merch",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
