import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./global.css";
import NavBar from "@/components/layout/NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CyberArena — E-Sport",
  description: "Turnirlar, jamoalar va o'yinchilar uchun platforma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-neutral-50 text-neutral-900 antialiased">
        <NavBar />

        {/* Main content — desktop'da sidebar kengligicha offset */}
        <main className="lg:pl-[240px] pb-20 lg:pb-0 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
