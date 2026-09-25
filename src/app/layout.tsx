import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "CyberArena - E-Sport Platform",
  description: "Turnirlar, jamoalar va o'yinchilar uchun platforma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="font-rajdhani bg-dark-bg text-white min-h-screen antialiased">
        <NavBar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
