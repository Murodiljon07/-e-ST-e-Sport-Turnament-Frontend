"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { HomeData } from "@/lib/types";

interface HomeScreenProps {
  data: HomeData;
}

const GOLD = "#a8835a";

export default function HomeScreen({ data }: HomeScreenProps) {
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
    if (data.news.length === 0) return;
    const id = setInterval(
      () => setNewsIndex((i) => (i + 1) % data.news.length),
      4000,
    );
    return () => clearInterval(id);
  }, [data.news.length]);

  const tickerLoop = [...data.ticker, ...data.ticker];

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center px-4 sm:px-6 py-8 sm:py-16">
      {/* ===== Ambient fon — tilla grid ===== */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Radial tilla glow — juda nozik */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 30%, ${GOLD}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative w-full max-w-[1100px]">
        {/* ===== SCREEN / DISPLAY ===== */}
        <div className="relative rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur-xl overflow-hidden shadow-sm">
          {/* ===== TOP BAR ===== */}
          <div className="flex items-center justify-between px-4 sm:px-5 h-10 border-b border-neutral-200 bg-neutral-50/60">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: GOLD }}
                />
                <span className="text-neutral-900 font-semibold">
                  {data.system.isLive ? "Live" : "Offline"}
                </span>
              </span>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="hidden sm:inline">{data.system.status}</span>
              <span className="text-neutral-300 hidden md:inline">|</span>
              <span className="hidden md:inline">{data.system.version}</span>
            </div>

            <div className="hidden md:flex items-center gap-[3px] h-3">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="w-[1px] h-full"
                  style={{
                    background: GOLD,
                    opacity: 0.2 + (i % 4) * 0.15,
                  }}
                />
              ))}
            </div>

            <div className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 tabular-nums">
              {time}
            </div>
          </div>

          {/* ===== HERO SECTION ===== */}
          <div className="relative p-6 sm:p-8 md:p-12 border-b border-neutral-200">
            {/* Scan line — tilla */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 right-0 h-[1px] animate-[scan-line_6s_linear_infinite]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)`,
                }}
              />
            </div>

            {/* Eyebrow — tilla gradient chiziq */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ color: GOLD }}
              >
                {data.hero.eyebrow.left}
              </span>
              <span
                className="flex-1 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, ${GOLD}40, #e5e5e5 50%, transparent)`,
                }}
              />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                {data.hero.eyebrow.right}
              </span>
            </div>

            {/* ===== Sarlavha — oxirgi so'z tilla ===== */}
            <h1 className="text-[clamp(2rem,6vw,4rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900">
              {data.hero.title.line1}
              <br />
              <span className="text-neutral-400">{data.hero.title.line2}</span>
              <br />
              {data.hero.title.line3}
              <br />
              <span style={{ color: GOLD }}>{data.hero.title.line4}</span>
            </h1>

            {/* Tavsif */}
            <p className="mt-6 max-w-md text-[14px] sm:text-[15px] leading-relaxed text-neutral-600">
              {data.hero.description}
            </p>

            {/* ===== CTA ===== */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Primary — qora (o'zgarmadi) */}
              <Link
                href={data.hero.ctas.primary.href}
                className="group inline-flex items-center gap-2 h-11 px-6 rounded-full bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors duration-300"
              >
                {data.hero.ctas.primary.label}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <path
                    d="M1 6h10M7 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              {/* Secondary — tilla border + hover */}
              <Link
                href={data.hero.ctas.secondary.href}
                className="group inline-flex items-center gap-2 h-11 px-6 rounded-full border text-neutral-900 text-[14px] font-medium transition-all duration-300"
                style={{
                  borderColor: `${GOLD}50`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.background = `${GOLD}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${GOLD}50`;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: GOLD }}
                />
                {data.hero.ctas.secondary.label}
              </Link>
            </div>
          </div>

          {/* ===== STATS ROW ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200 border-b border-neutral-200">
            {data.stats.map((s, i) => (
              <div
                key={s.id}
                className={`group p-4 sm:p-5 transition-colors duration-300 hover:bg-neutral-50/50 ${
                  i >= 2 ? "border-t md:border-t-0 border-neutral-200" : ""
                }`}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2 flex items-center gap-1.5">
                  {/* Faqat birinchi statda tilla nuqta (live) */}
                  {i === 0 && (
                    <span
                      className="w-1 h-1 rounded-full animate-pulse"
                      style={{ background: GOLD }}
                    />
                  )}
                  {s.label}
                </div>
                <div className="text-[24px] sm:text-[28px] leading-none font-semibold tracking-[-0.03em] text-neutral-900 tabular-nums">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* ===== MAIN GRID: LIVE MATCHES + NEWS ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
            {/* ---------- LIVE MATCHES ---------- */}
            <div className="flex flex-col">
              {/* Header — tilla */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: GOLD }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold"
                    style={{ color: GOLD }}
                  >
                    Live Matchlar
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                  {String(data.liveMatches.length).padStart(2, "0")} AKTIV
                </span>
              </div>

              <div className="divide-y divide-neutral-200 flex-1">
                {data.liveMatches.map((m) => (
                  <Link
                    key={m.id}
                    href={`/match/${m.id}`}
                    className="group block hover:bg-neutral-50 transition-colors duration-300"
                  >
                    <div className="p-5">
                      {/* Top meta */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                          {m.tournament}
                        </span>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] text-neutral-400">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                          >
                            <path
                              d="M1 5c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                            <circle cx="5" cy="5" r="1.5" fill="currentColor" />
                          </svg>
                          {m.viewers}
                        </span>
                      </div>

                      {/* Teams + score */}
                      <div className="flex items-center justify-between gap-4">
                        {/* Team A */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-300 font-mono text-[9px] tracking-[0.1em] text-neutral-700 shrink-0">
                            {m.teamA.tag}
                          </span>
                          <span className="text-[14px] font-semibold text-neutral-900 truncate">
                            {m.teamA.name}
                          </span>
                        </div>

                        {/* Score — g'olib tilla */}
                        <div className="flex items-center gap-2 shrink-0">
                          <span
                            className="text-[20px] font-bold tabular-nums tracking-[-0.03em]"
                            style={{
                              color:
                                m.teamA.score > m.teamB.score
                                  ? GOLD
                                  : "#a3a3a3",
                            }}
                          >
                            {m.teamA.score}
                          </span>
                          <span className="text-neutral-300 text-[14px]">
                            :
                          </span>
                          <span
                            className="text-[20px] font-bold tabular-nums tracking-[-0.03em]"
                            style={{
                              color:
                                m.teamB.score > m.teamA.score
                                  ? GOLD
                                  : "#a3a3a3",
                            }}
                          >
                            {m.teamB.score}
                          </span>
                        </div>

                        {/* Team B */}
                        <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
                          <span className="text-[14px] font-semibold text-neutral-900 truncate">
                            {m.teamB.name}
                          </span>
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-300 font-mono text-[9px] tracking-[0.1em] text-neutral-700 shrink-0">
                            {m.teamB.tag}
                          </span>
                        </div>
                      </div>

                      {/* Bottom meta */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                          {m.map}
                        </span>
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                          {m.round}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View all — hover tilla */}
              <Link
                href="/live"
                className="group flex items-center justify-between px-5 h-11 border-t border-neutral-200 hover:bg-neutral-50 transition-colors duration-300"
              >
                <span
                  className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500 transition-colors duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = GOLD;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "";
                  }}
                >
                  Barcha matchlar
                </span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-neutral-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-[#a8835a]"
                >
                  <path
                    d="M1 6h10M7 2l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            {/* ---------- NEWS ---------- */}
            <div className="flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                  Yangiliklar
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                  {String(newsIndex + 1).padStart(2, "0")} /{" "}
                  {String(data.news.length).padStart(2, "0")}
                </span>
              </div>

              {/* Featured news — rotating */}
              <div className="relative px-5 py-5 border-b border-neutral-200 min-h-[130px]">
                {data.news.map((n, i) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    className={`absolute inset-0 px-5 py-5 transition-all duration-700 ${
                      i === newsIndex
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="inline-flex items-center h-5 px-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
                        style={{
                          background: `${GOLD}15`,
                          color: GOLD,
                        }}
                      >
                        {n.category}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                        {n.time}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-semibold text-neutral-900 leading-snug tracking-[-0.01em]">
                      {n.title}
                    </h3>
                  </Link>
                ))}
              </div>

              {/* News list */}
              <div className="divide-y divide-neutral-200 flex-1">
                {data.news.slice(1).map((n) => (
                  <Link
                    key={n.id}
                    href={n.href}
                    className="group flex items-start gap-3 px-5 py-4 hover:bg-neutral-50 transition-colors duration-300"
                  >
                    <span
                      className="font-mono text-[9px] tracking-[0.15em] uppercase pt-1 shrink-0 w-14 transition-colors duration-300"
                      style={{ color: "#a3a3a3" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = GOLD;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#a3a3a3";
                      }}
                    >
                      {n.category}
                    </span>
                    <span className="text-[13px] text-neutral-700 leading-snug group-hover:text-neutral-900 transition-colors flex-1">
                      {n.title}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400 pt-1 shrink-0">
                      {n.time}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Progress dots — faol = tilla */}
              <div className="flex items-center gap-1.5 px-5 py-3 border-t border-neutral-200">
                {data.news.map((n, i) => (
                  <button
                    key={n.id}
                    onClick={() => setNewsIndex(i)}
                    aria-label={`Yangilik ${i + 1}`}
                    className="h-[2px] rounded-full transition-all duration-500"
                    style={{
                      width: i === newsIndex ? "24px" : "8px",
                      background: i === newsIndex ? GOLD : "#d4d4d4",
                    }}
                  />
                ))}
                <Link
                  href="/news"
                  className="ml-auto font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500 transition-colors duration-300 hover:text-[#a8835a]"
                >
                  Barchasi →
                </Link>
              </div>
            </div>
          </div>

          {/* ===== FEATURED TEAMS ===== */}
          <div className="border-t border-neutral-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                Top Jamoalar
              </span>
              <Link
                href="/teams"
                className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500 transition-colors duration-300 hover:text-[#a8835a]"
              >
                Barchasi →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
              {data.featuredTeams.map((t) => (
                <Link
                  key={t.id}
                  href={`/teams/${t.id}`}
                  className="group p-5 hover:bg-neutral-50 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    {/* Rank — tilla */}
                    <span
                      className="font-mono text-[10px] tracking-[0.2em] tabular-nums font-semibold"
                      style={{ color: GOLD }}
                    >
                      #{String(t.rank).padStart(2, "0")}
                    </span>
                    <span className="inline-flex items-center h-5 px-2 rounded-full border border-neutral-200 font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-600">
                      {t.game}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-300 font-mono text-[9px] tracking-[0.1em] text-neutral-700">
                      {t.tag}
                    </span>
                    <h3 className="text-[14px] font-semibold text-neutral-900 tracking-[-0.01em]">
                      {t.name}
                    </h3>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        Ball
                      </div>
                      <div className="text-[16px] font-semibold tabular-nums text-neutral-900 tracking-[-0.02em]">
                        {t.points.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1">
                        WR
                      </div>
                      <div
                        className="text-[16px] font-semibold tabular-nums tracking-[-0.02em]"
                        style={{ color: GOLD }}
                      >
                        {t.winRate}%
                      </div>
                    </div>
                  </div>

                  {/* Progress bar — tilla gradient */}
                  <div className="mt-3 h-[2px] w-full bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-[width] duration-1000"
                      style={{
                        width: `${t.winRate}%`,
                        background: `linear-gradient(90deg, ${GOLD}80, ${GOLD})`,
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* ===== TICKER ===== */}
          <div className="relative h-9 border-t border-neutral-200 bg-neutral-50/60 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex items-center h-full animate-[marquee_30s_linear_infinite] whitespace-nowrap">
              {tickerLoop.map((item, i) => (
                <span key={`${item.id}-${i}`} className="flex items-center">
                  <span className="px-6 font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                    {item.text}
                  </span>
                  <span
                    className="w-1 h-1 rounded-full"
                    style={{ background: GOLD }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Pastdagi nozik tilla soya */}
        <div
          className="absolute -inset-x-8 -bottom-8 h-16 blur-2xl pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${GOLD}08, transparent)`,
          }}
        />
      </div>
    </section>
  );
}
