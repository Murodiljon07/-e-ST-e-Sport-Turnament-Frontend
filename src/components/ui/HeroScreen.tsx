"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HeroData } from "@/lib/types";

interface HeroScreenProps {
  data: HeroData;
}

export default function HeroScreen({ data }: HeroScreenProps) {
  const [time, setTime] = useState("");
  const [newsIndex, setNewsIndex] = useState(0);

  // Live clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // News rotate
  useEffect(() => {
    if (data.breakingNews.length === 0) return;
    const id = setInterval(
      () => setNewsIndex((i) => (i + 1) % data.breakingNews.length),
      4000,
    );
    return () => clearInterval(id);
  }, [data.breakingNews.length]);

  // Ticker'ni ikki marta takrorlash (cheksiz marquee uchun)
  const tickerLoop = [...data.ticker, ...data.ticker];

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-6 py-16">
      {/* Ambient grid — nozik fon */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* ===== SCREEN / DISPLAY ===== */}
      <div className="relative w-full max-w-[1100px]">
        {/* Tashqi ramka — Apple-like bezel */}
        <div className="relative rounded-2xl border border-ink-200 bg-ink-50/40 backdrop-blur-xl overflow-hidden">
          {/* Top bar — "system status" */}
          <div className="flex items-center justify-between px-5 h-10 border-b border-ink-200 bg-ink-100/40">
            {/* Chap: status indicatorlar */}
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-600">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-1000 animate-blink-soft" />
                <span className="text-ink-1000">
                  {data.system.isLive ? "Live" : "Offline"}
                </span>
              </span>
              <span className="text-ink-400">|</span>
              <span>{data.system.status}</span>
              <span className="text-ink-400">|</span>
              <span>{data.system.version}</span>
            </div>

            {/* O'rta: bezak chiziqchalar */}
            <div className="hidden md:flex items-center gap-[3px] h-3">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="w-[1px] h-full bg-ink-300"
                  style={{ opacity: 0.3 + (i % 4) * 0.15 }}
                />
              ))}
            </div>

            {/* O'ng: clock */}
            <div className="font-mono text-[10px] tracking-[0.2em] text-ink-600">
              {time}
            </div>
          </div>

          {/* ===== ASOSIY KONTENT ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-ink-200">
            {/* CHAP TOMON — Asosiy hero */}
            <div className="relative p-8 md:p-12">
              {/* Scan line effekt */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ink-1000/20 to-transparent animate-scan-line" />
              </div>

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8 animate-fade-up">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                  {data.eyebrow.left}
                </span>
                <span className="flex-1 h-[1px] bg-ink-200" />
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                  {data.eyebrow.right}
                </span>
              </div>

              {/* Sarlavha */}
              <h1
                className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-ink-1000 animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                {data.title.line1}
                <br />
                <span className="text-ink-500">{data.title.line2}</span>
                <br />
                {data.title.line3}
                <br />
                <span className="text-ink-500">{data.title.line4}</span>
              </h1>

              {/* Tavsif */}
              <p
                className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-600 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                {data.description}
              </p>

              {/* CTA tugmalar */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 animate-fade-up"
                style={{ animationDelay: "0.3s" }}
              >
                <Link
                  href={data.ctas.primary.href}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-ink-1000 text-ink-0 text-[14px] font-medium hover:bg-ink-800 transition-colors duration-300 ease-apple"
                >
                  {data.ctas.primary.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 6h10M7 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <Link
                  href={data.ctas.secondary.href}
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-ink-300 text-ink-1000 text-[14px] font-medium hover:border-ink-1000 transition-colors duration-300 ease-apple"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-ink-1000 animate-blink-soft" />
                  {data.ctas.secondary.label}
                </Link>
              </div>
            </div>

            {/* O'NG TOMON — Sidebar (stats + news) */}
            <div className="flex flex-col divide-y divide-ink-200">
              {/* Stats grid */}
              <div className="grid grid-cols-2 divide-x divide-ink-200">
                {data.stats.map((s, i) => (
                  <div
                    key={s.id}
                    className={`p-5 animate-fade-up ${
                      i >= 2 ? "border-t border-ink-200" : ""
                    }`}
                    style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                  >
                    <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500 mb-2">
                      {s.label}
                    </div>
                    <div className="text-[28px] leading-none font-semibold tracking-[-0.03em] text-ink-1000 tabular-nums">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Breaking news — rotating */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
                    Yangiliklar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400 tabular-nums">
                    {String(newsIndex + 1).padStart(2, "0")} /{" "}
                    {String(data.breakingNews.length).padStart(2, "0")}
                  </span>
                </div>

                {/* News item */}
                <div className="relative flex-1 min-h-[80px]">
                  {data.breakingNews.map((news, i) => (
                    <p
                      key={news.id}
                      className={`absolute inset-0 text-[14px] leading-relaxed text-ink-700 transition-all duration-700 ease-apple-out ${
                        i === newsIndex
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-2 pointer-events-none"
                      }`}
                    >
                      {news.text}
                    </p>
                  ))}
                </div>

                {/* Progress dots */}
                <div className="flex items-center gap-1.5 mt-6">
                  {data.breakingNews.map((news, i) => (
                    <span
                      key={news.id}
                      className={`h-[2px] rounded-full transition-all duration-500 ease-apple-out ${
                        i === newsIndex ? "w-6 bg-ink-1000" : "w-2 bg-ink-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom — Upcoming match */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
                    Keyingi o'yin
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-1000">
                    {data.upcomingMatch.time}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-medium text-ink-1000">
                    {data.upcomingMatch.teamA}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-400">
                    VS
                  </span>
                  <span className="text-[14px] font-medium text-ink-1000">
                    {data.upcomingMatch.teamB}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PASTKI BAR — Marquee ticker ===== */}
          <div className="relative h-9 border-t border-ink-200 bg-ink-100/40 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink-50 to-transparent z-10 pointer-events-none" />

            <div className="flex items-center h-full animate-marquee whitespace-nowrap">
              {tickerLoop.map((item, i) => (
                <span key={`${item.id}-${i}`} className="flex items-center">
                  <span className="px-6 font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                    {item.text}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-ink-400" />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tashqi "reflection" — nozik soya */}
        <div className="absolute -inset-x-8 -bottom-8 h-16 bg-gradient-to-b from-ink-1000/[0.03] to-transparent blur-2xl pointer-events-none" />
      </div>
    </section>
  );
}
