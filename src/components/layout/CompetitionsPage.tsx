"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type {
  Competition,
  CompetitionsData,
  CompetitionStatus,
  CompetitionType,
} from "@/lib/types";

interface CompetitionsPageProps {
  data: CompetitionsData;
}

const GOLD = "#a8835a";

const statusConfig: Record<
  CompetitionStatus,
  { label: string; pulse: boolean; color: string }
> = {
  live: { label: "Live", pulse: true, color: GOLD },
  upcoming: { label: "Upcoming", pulse: false, color: "#a3a3a3" },
  finished: { label: "Finished", pulse: false, color: "#a3a3a3" },
};

const typeLabels: Record<CompetitionType, string> = {
  tournament: "TURNIR",
  league: "LIGA",
  cup: "KUBOK",
  qualifier: "SARALASH",
};

export default function CompetitionsPage({ data }: CompetitionsPageProps) {
  const [activeStatus, setActiveStatus] = useState("all");
  const [activeType, setActiveType] = useState("all-type");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let list = data.competitions;

    if (activeStatus !== "all") {
      list = list.filter((c) => c.status === activeStatus);
    }

    if (activeType !== "all-type") {
      list = list.filter((c) => c.type === activeType);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.game.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q),
      );
    }

    return list;
  }, [data.competitions, activeStatus, activeType, query]);

  const tickerLoop = [...data.ticker, ...data.ticker];

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center px-4 sm:px-6 py-8 sm:py-16">
      {/* Ambient grid */}
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

      <div className="relative w-full max-w-[1100px]">
        {/* ===== SCREEN ===== */}
        <div className="relative rounded-2xl border border-neutral-200 bg-white/60 backdrop-blur-xl overflow-hidden shadow-sm">
          {/* ===== TOP BAR ===== */}
          <div className="flex items-center justify-between px-5 h-10 border-b border-neutral-200 bg-neutral-50/60">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: GOLD }}
                />
                <span className="text-neutral-900 font-semibold">Live</span>
              </span>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="hidden sm:inline">SYS.Competitions</span>
              <span className="text-neutral-300 hidden md:inline">|</span>
              <span className="hidden md:inline">v2.6.1</span>
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
              {data.competitions.length} TOTAL
            </div>
          </div>

          {/* ===== HEADER ===== */}
          <div className="relative p-6 sm:p-8 md:p-12 border-b border-neutral-200">
            {/* Scan line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 right-0 h-[1px] animate-[scan-line_6s_linear_infinite]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)`,
                }}
              />
            </div>

            {/* Eyebrow */}
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

            {/* Heading + Search */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900">
                  {data.hero.title.line1}
                  <br />
                  <span style={{ color: GOLD }}>{data.hero.title.line2}</span>
                </h1>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-neutral-600">
                  {data.hero.description}
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M9.5 9.5L12.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Musobaqa qidirish..."
                  className="w-full h-10 pl-9 pr-9 rounded-full bg-neutral-100/60 border border-neutral-200 text-[13px] text-neutral-900 placeholder:text-neutral-500 outline-none focus:border-[#a8835a] transition-colors duration-300"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Tozalash"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-[#a8835a] transition-colors"
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 2l8 8M10 2l-8 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ===== STATS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200 border-b border-neutral-200">
            {data.stats.map((s, i) => (
              <div
                key={s.id}
                className={`p-4 sm:p-5 ${
                  i >= 2 ? "border-t md:border-t-0 border-neutral-200" : ""
                }`}
              >
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2 flex items-center gap-1.5">
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

          {/* ===== FEATURED ===== */}
          <div className="relative border-b border-neutral-200">
            <Link
              href={`/competitions/${data.featured.id}`}
              className="group block p-5 sm:p-8 hover:bg-neutral-50 transition-colors duration-300"
            >
              {/* Featured label */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="inline-flex items-center h-5 px-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
                  style={{ background: `${GOLD}15`, color: GOLD }}
                >
                  ★ Featured
                </span>
                <span
                  className="inline-flex items-center h-5 px-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
                  style={{ background: `${GOLD}15`, color: GOLD }}
                >
                  {typeLabels[data.featured.type]}
                </span>
                <span
                  className="flex items-center gap-1.5 ml-auto font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
                  style={{ color: GOLD }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: GOLD }}
                  />
                  LIVE
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
                {/* Chap */}
                <div>
                  <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-[1] tracking-[-0.03em] font-semibold text-neutral-900 mb-3">
                    {data.featured.title}
                  </h2>

                  <div className="flex items-center gap-3 flex-wrap mb-5">
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                      {data.featured.region}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                      {data.featured.format}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                      {data.featured.startLabel} — {data.featured.endLabel}
                    </span>
                  </div>

                  {/* Progress */}
                  <div className="max-w-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                        Progress
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-[0.2em] tabular-nums font-semibold"
                        style={{ color: GOLD }}
                      >
                        {data.featured.progress}%
                      </span>
                    </div>
                    <div className="h-[3px] w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-[width] duration-1000"
                        style={{
                          width: `${data.featured.progress}%`,
                          background: `linear-gradient(90deg, ${GOLD}, #d4b483, ${GOLD})`,
                          backgroundSize: "200% 100%",
                          animation: "shimmer-wave 3s linear infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* O'ng — prize + teams */}
                <div className="flex items-end gap-6 lg:gap-10">
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                      Sovrin
                    </div>
                    <div className="text-[20px] sm:text-[24px] font-bold tabular-nums text-neutral-900 tracking-[-0.03em]">
                      {data.featured.prize}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-2">
                      Jamoalar
                    </div>
                    <div className="text-[20px] sm:text-[24px] font-bold tabular-nums text-neutral-900 tracking-[-0.03em]">
                      {data.featured.teams}
                      <span className="text-neutral-300 text-[16px]">
                        /{data.featured.maxTeams}
                      </span>
                    </div>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="mb-2 text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#a8835a]"
                  >
                    <path
                      d="M1 6h10M7 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* ===== FILTERS ===== */}
          <div className="p-5 sm:px-6 sm:py-5 border-b border-neutral-200 bg-neutral-50/40">
            <div className="flex flex-col gap-4">
              {/* Status filters */}
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mr-2 hidden sm:inline">
                  Holat:
                </span>
                {data.filters.map((f) => {
                  const isActive = activeStatus === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveStatus(f.id)}
                      className={`inline-flex items-center gap-2 h-8 px-4 rounded-full text-[12px] font-medium tracking-[-0.01em] transition-all duration-300 border ${
                        isActive
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-[#a8835a] hover:text-[#a8835a]"
                      }`}
                    >
                      {f.label}
                      <span
                        className={`font-mono text-[10px] tabular-nums ${
                          isActive ? "text-white/60" : "text-neutral-400"
                        }`}
                      >
                        {String(f.count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Type filters */}
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mr-2 hidden sm:inline">
                  Tur:
                </span>
                {data.typeFilters.map((f) => {
                  const isActive = activeType === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setActiveType(f.id)}
                      className={`inline-flex items-center gap-2 h-7 px-3 rounded-full text-[11px] font-medium tracking-[-0.01em] transition-all duration-300 ${
                        isActive
                          ? "bg-neutral-100 text-neutral-900"
                          : "text-neutral-500 hover:text-neutral-900"
                      }`}
                    >
                      {f.label}
                      <span className="font-mono text-[10px] tabular-nums text-neutral-400">
                        {String(f.count).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== LIST HEADER (desktop) ===== */}
          <div className="hidden md:grid grid-cols-[110px_1fr_110px_110px_120px_100px] gap-4 px-6 h-9 items-center border-b border-neutral-200 bg-neutral-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>Kod</span>
            <span>Musobaqa</span>
            <span>Tur</span>
            <span>O'yin</span>
            <span className="text-right">Sovrin</span>
            <span className="text-right">Holat</span>
          </div>

          {/* ===== LIST ===== */}
          <div className="divide-y divide-neutral-200">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                  Hech narsa topilmadi
                </p>
              </div>
            ) : (
              filtered.map((c, i) => (
                <CompetitionRow key={c.id} c={c} index={i} />
              ))
            )}
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-6 h-10 border-t border-neutral-200 bg-neutral-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>
              Ko'rsatilmoqda {String(filtered.length).padStart(2, "0")} /{" "}
              {String(data.competitions.length).padStart(2, "0")}
            </span>
            <span>Filter: {activeStatus.toUpperCase()}</span>
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
      </div>
    </section>
  );
}

/* ============================================================
   Competition Row
   ============================================================ */
function CompetitionRow({ c, index }: { c: Competition; index: number }) {
  const cfg = statusConfig[c.status];
  const isLive = c.status === "live";

  return (
    <Link
      href={`/competitions/${c.id}`}
      className="group block"
      style={{
        animation: `fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both`,
        animationDelay: `${0.03 + index * 0.03}s`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[110px_1fr_110px_110px_120px_100px] gap-4 px-6 py-5 items-center transition-colors duration-300 hover:bg-neutral-50">
        {/* Kod + sana */}
        <div className="flex md:block items-center gap-3">
          <div className="font-mono text-[11px] tracking-[0.2em] text-neutral-500">
            {c.code}
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] text-neutral-400 md:mt-1">
            {c.startLabel}
          </div>
        </div>

        {/* Title + region */}
        <div className="min-w-0">
          <h3 className="text-[15px] font-medium text-neutral-900 tracking-[-0.01em] truncate">
            {c.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
              {c.region}
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
              {c.teams}/{c.maxTeams} JAMOA
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-300" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
              {c.format}
            </span>
          </div>

          {/* Live progress bar */}
          {isLive && (
            <div className="mt-3 h-[2px] w-full max-w-[240px] bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-1000"
                style={{
                  width: `${c.progress}%`,
                  background: `linear-gradient(90deg, ${GOLD}, #d4b483, ${GOLD})`,
                  backgroundSize: "200% 100%",
                  animation: "shimmer-wave 3s linear infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* Tur */}
        <div className="flex md:block items-center justify-between">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            Tur
          </span>
          <span
            className="inline-flex items-center h-6 px-2.5 rounded-full border font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{
              borderColor: c.type === "tournament" ? `${GOLD}50` : "#e5e5e5",
              color: c.type === "tournament" ? GOLD : "#737373",
            }}
          >
            {typeLabels[c.type]}
          </span>
        </div>

        {/* O'yin */}
        <div className="flex md:block items-center justify-between">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            O'yin
          </span>
          <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-neutral-200 font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-700">
            {c.game}
          </span>
        </div>

        {/* Sovrin */}
        <div className="flex md:block items-center justify-between md:text-right">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            Sovrin
          </span>
          <span className="text-[14px] font-semibold tracking-[-0.02em] text-neutral-900 tabular-nums">
            {c.prize}
          </span>
        </div>

        {/* Holat */}
        <div className="flex md:justify-end items-center gap-2">
          <span className="inline-flex items-center gap-2 h-6 px-2.5 rounded-full border border-neutral-200">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                cfg.pulse ? "animate-pulse" : ""
              }`}
              style={{ background: cfg.color }}
            />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-700">
              {cfg.label}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
