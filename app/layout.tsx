import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FOMOBanner from "./components/FOMOBanner";
import SocialProof from "./components/SocialProof";
import BrainrotCursor from "./components/BrainrotCursor";
import BrainrotChaos from "./components/BrainrotChaos";

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
    "brainrot", "skibidi toilet", "bombardiro crocodilo", "sigma",
    "mewing", "ohio", "gen z merch", "gen alpha",
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
        <AuthProvider>
          <BrainrotCursor />
          <BrainrotChaos />
          <CartProvider>
            <FOMOBanner />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <SocialProof />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
