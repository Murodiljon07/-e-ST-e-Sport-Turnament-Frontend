"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { PlayersData, Player, PlayerStatus } from "@/lib/types";

interface PlayersScreenProps {
  data: PlayersData;
}

const statusConfig: Record<
  PlayerStatus,
  { label: string; dotClass: string; pulse: boolean }
> = {
  signed: {
    label: "JAMOADA",
    dotClass: "bg-ink-1000",
    pulse: true,
  },
  "free-agent": {
    label: "ERKIN AGENT",
    dotClass: "bg-ink-600",
    pulse: false,
  },
  retired: {
    label: "FAOLIYATNI YAKUNLAGAN",
    dotClass: "bg-ink-400",
    pulse: false,
  },
};

export default function PlayersScreen({ data }: PlayersScreenProps) {
  const [time, setTime] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"rank" | "rating" | "earnings">("rank");

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

  // Filter + search + sort
  const filtered = useMemo(() => {
    let list = data.players;

    if (activeFilter !== "all") {
      list = list.filter((p) => p.status === activeFilter);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.nickname.toLowerCase().includes(q) ||
          p.realName.toLowerCase().includes(q) ||
          p.game.toLowerCase().includes(q) ||
          p.role.toLowerCase().includes(q) ||
          p.country.toLowerCase().includes(q) ||
          (p.teamName?.toLowerCase().includes(q) ?? false),
      );
    }

    // Sort
    const sorted = [...list];
    if (sortBy === "rank") {
      sorted.sort((a, b) => a.rank - b.rank);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "earnings") {
      const parse = (s: string) =>
        parseFloat(s.replace(/[^0-9.]/g, "")) *
        (s.includes("K") ? 1000 : s.includes("M") ? 1000000 : 1);
      sorted.sort((a, b) => parse(b.earnings) - parse(a.earnings));
    }

    return sorted;
  }, [data.players, activeFilter, query, sortBy]);

  const tickerLoop = [...data.ticker, ...data.ticker];

  return (
    <section
      id="players"
      className="relative w-full min-h-screen flex items-start justify-center px-6 py-16"
    >
      {/* Ambient grid */}
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

      <div className="relative w-full max-w-[1100px]">
        {/* ===== SCREEN / DISPLAY ===== */}
        <div className="relative rounded-2xl border border-ink-200 bg-ink-50/40 backdrop-blur-xl overflow-hidden">
          {/* ===== TOP BAR ===== */}
          <div className="flex items-center justify-between px-5 h-10 border-b border-ink-200 bg-ink-100/40">
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

            <div className="hidden md:flex items-center gap-[3px] h-3">
              {[...Array(24)].map((_, i) => (
                <span
                  key={i}
                  className="w-[1px] h-full bg-ink-300"
                  style={{ opacity: 0.3 + (i % 4) * 0.15 }}
                />
              ))}
            </div>

            <div className="font-mono text-[10px] tracking-[0.2em] text-ink-600">
              {time}
            </div>
          </div>

          {/* ===== HEADER ROW ===== */}
          <div className="relative p-8 md:p-12 border-b border-ink-200">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ink-1000/20 to-transparent animate-scan-line" />
            </div>

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                {data.eyebrow.left}
              </span>
              <span className="flex-1 h-[1px] bg-ink-200" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                {data.eyebrow.right}
              </span>
            </div>

            {/* Heading + Search */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div
                className="animate-fade-up"
                style={{ animationDelay: "0.1s" }}
              >
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-ink-1000">
                  {data.heading.line1}
                  <br />
                  <span className="text-ink-500">{data.heading.line2}</span>
                </h1>
                <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-600">
                  {data.description}
                </p>
              </div>

              {/* Search */}
              <div
                className="relative w-full md:w-72 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none"
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
                  placeholder="O'yinchi qidirish..."
                  className="w-full h-10 pl-9 pr-9 rounded-full bg-ink-100/60 border border-ink-200 text-[13px] text-ink-1000 placeholder:text-ink-500 outline-none focus:border-ink-1000 transition-colors duration-300 ease-apple"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    aria-label="Tozalash"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 hover:text-ink-1000 transition-colors"
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

            {/* ===== FILTERS + SORT ===== */}
            <div
              className="mt-8 flex items-center gap-1 flex-wrap animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              {data.filters.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`inline-flex items-center gap-2 h-8 px-4 rounded-full text-[12px] font-medium tracking-[-0.01em] transition-all duration-300 ease-apple border ${
                      isActive
                        ? "bg-ink-1000 text-ink-0 border-ink-1000"
                        : "bg-transparent text-ink-700 border-ink-200 hover:border-ink-400 hover:text-ink-1000"
                    }`}
                  >
                    {f.label}
                    <span
                      className={`font-mono text-[10px] tabular-nums ${
                        isActive ? "text-ink-0/60" : "text-ink-500"
                      }`}
                    >
                      {f.count.toLocaleString()}
                    </span>
                  </button>
                );
              })}

              {/* Sort divider */}
              <span className="hidden md:block flex-1" />
              <span className="hidden md:block w-[1px] h-5 bg-ink-200 mx-1" />

              {/* Sort buttons */}
              <div className="flex items-center gap-1">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500 mr-2">
                  Sort:
                </span>
                {(
                  [
                    { id: "rank", label: "Rank" },
                    { id: "rating", label: "Reyting" },
                    { id: "earnings", label: "Daromad" },
                  ] as const
                ).map((s) => {
                  const isActive = sortBy === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`h-7 px-3 rounded-full text-[11px] font-medium transition-all duration-300 ease-apple ${
                        isActive
                          ? "text-ink-1000 bg-ink-100/60"
                          : "text-ink-500 hover:text-ink-1000"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ===== LIST HEADER (desktop) ===== */}
          <div className="hidden md:grid grid-cols-[50px_1fr_120px_100px_100px_90px_100px] gap-4 px-6 h-9 items-center border-b border-ink-200 bg-ink-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            <span className="text-right">#</span>
            <span>O'yinchi</span>
            <span>Jamoa</span>
            <span>O'yin</span>
            <span className="text-right">Reyting</span>
            <span className="text-right">K/D</span>
            <span className="text-right">Holat</span>
          </div>

          {/* ===== PLAYERS LIST ===== */}
          <div className="divide-y divide-ink-200">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-500">
                  Hech narsa topilmadi
                </p>
              </div>
            ) : (
              filtered.map((p, i) => (
                <PlayerRow key={p.id} player={p} index={i} />
              ))
            )}
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-6 h-10 border-t border-ink-200 bg-ink-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            <span>
              Ko'rsatilmoqda {String(filtered.length).padStart(2, "0")} /{" "}
              {String(data.players.length).padStart(2, "0")}
            </span>
            <span>Sort: {sortBy.toUpperCase()}</span>
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

        {/* Reflection */}
        <div className="absolute -inset-x-8 -bottom-8 h-16 bg-gradient-to-b from-ink-1000/[0.03] to-transparent blur-2xl pointer-events-none" />
      </div>
    </section>
  );
}

/* ============================================================
   Player Row
   ============================================================ */
function PlayerRow({ player: p, index }: { player: Player; index: number }) {
  const cfg = statusConfig[p.status];

  return (
    <Link
      href={`/players/${p.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${0.05 + index * 0.03}s` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-[50px_1fr_120px_100px_100px_90px_100px] gap-4 px-6 py-5 items-center transition-colors duration-300 ease-apple hover:bg-ink-100/40">
        {/* Rank */}
        <div className="flex md:block items-center justify-between md:text-right">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            Rank
          </span>
          <span className="font-mono text-[15px] tracking-[0.1em] text-ink-1000 tabular-nums font-semibold">
            {String(p.rank).padStart(2, "0")}
          </span>
        </div>

        {/* O'yinchi nomi + real + country + role */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] tracking-[0.15em] font-mono text-ink-500">
              {p.country}
            </span>
            <h3 className="text-[15px] font-medium text-ink-1000 tracking-[-0.01em] truncate">
              {p.nickname}
            </h3>
            <span className="inline-flex items-center h-5 px-2 rounded-full border border-ink-200 font-mono text-[9px] tracking-[0.15em] uppercase text-ink-600">
              {p.role}
            </span>
            {/* Streak badge */}
            {p.streak !== 0 && (
              <span
                className={`inline-flex items-center h-5 px-2 rounded-full font-mono text-[9px] tracking-[0.15em] uppercase ${
                  p.streak > 0
                    ? "bg-ink-1000 text-ink-0"
                    : "border border-ink-300 text-ink-600"
                }`}
              >
                {p.streak > 0 ? `+${p.streak}W` : `${p.streak}L`}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-500 truncate">
              {p.realName}
            </span>
            <span className="w-1 h-1 rounded-full bg-ink-300" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-500">
              {p.age} YOSH
            </span>
            <span className="w-1 h-1 rounded-full bg-ink-300" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-500">
              {p.matches} MATCH
            </span>
          </div>
        </div>

        {/* Jamoa */}
        <div className="flex md:block items-center justify-between md:truncate">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            Jamoa
          </span>
          {p.teamName ? (
            <span className="inline-flex items-center gap-1.5 truncate">
              <span className="text-[13px] font-medium text-ink-1000 truncate">
                {p.teamName}
              </span>
              <span className="font-mono text-[9px] tracking-[0.15em] text-ink-500">
                {p.teamTag}
              </span>
            </span>
          ) : (
            <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink-400">
              —
            </span>
          )}
        </div>

        {/* O'yin */}
        <div className="flex md:block items-center justify-between">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            O'yin
          </span>
          <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-ink-200 font-mono text-[10px] tracking-[0.15em] uppercase text-ink-700">
            {p.game}
          </span>
        </div>

        {/* Reyting */}
        <div className="flex md:block items-center justify-between md:text-right">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            Reyting
          </span>
          <div>
            <div className="text-[14px] font-semibold tracking-[-0.02em] text-ink-1000 tabular-nums">
              {p.rating}
            </div>
            <div className="font-mono text-[10px] tracking-[0.15em] text-ink-500 tabular-nums">
              {p.winRate}% WR
            </div>
          </div>
        </div>

        {/* K/D */}
        <div className="flex md:block items-center justify-between md:text-right">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            K/D
          </span>
          <span className="text-[14px] font-semibold tracking-[-0.02em] text-ink-1000 tabular-nums">
            {p.kd.toFixed(2)}
          </span>
        </div>

        {/* Holat */}
        <div className="flex md:justify-end items-center gap-2">
          <span className="inline-flex items-center gap-2 h-6 px-2.5 rounded-full border border-ink-200">
            <span
              className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass} ${
                cfg.pulse ? "animate-blink-soft" : ""
              }`}
            />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-700 whitespace-nowrap">
              {cfg.label}
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
