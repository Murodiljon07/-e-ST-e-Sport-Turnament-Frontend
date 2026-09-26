"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { TeamsData, Team, TeamStatus } from "@/lib/types";

interface TeamsScreenProps {
  data: TeamsData;
}

const statusConfig: Record<
  TeamStatus,
  { label: string; dotClass: string; pulse: boolean }
> = {
  active: {
    label: "FAOL",
    dotClass: "bg-ink-1000",
    pulse: true,
  },
  recruiting: {
    label: "QIDIRMOQDA",
    dotClass: "bg-ink-600",
    pulse: false,
  },
  inactive: {
    label: "NOFAOL",
    dotClass: "bg-ink-400",
    pulse: false,
  },
};

export default function TeamsScreen({ data }: TeamsScreenProps) {
  const [time, setTime] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

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

  // Filter + search
  const filtered = useMemo(() => {
    let list = data.teams;

    if (activeFilter !== "all") {
      list = list.filter((t) => t.status === activeFilter);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tag.toLowerCase().includes(q) ||
          t.game.toLowerCase().includes(q) ||
          t.region.toLowerCase().includes(q) ||
          t.captain.toLowerCase().includes(q),
      );
    }

    // Rank bo'yicha saralash
    return [...list].sort((a, b) => a.rank - b.rank);
  }, [data.teams, activeFilter, query]);

  const tickerLoop = [...data.ticker, ...data.ticker];

  return (
    <section className="relative w-full min-h-screen flex items-start justify-center px-6 py-16">
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

          {/* ===== HEADER ROW — sarlavha + qidiruv ===== */}
          <div className="relative p-8 md:p-12 border-b border-ink-200">
            {/* Scan line */}
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

              {/* Search input */}
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
                  placeholder="Jamoa qidirish..."
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

            {/* ===== FILTERS ===== */}
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
                      {String(f.count).padStart(3, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ===== LIST HEADER (desktop) ===== */}
          <div className="hidden md:grid grid-cols-[50px_110px_1fr_120px_110px_100px] gap-4 px-6 h-9 items-center border-b border-ink-200 bg-ink-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            <span className="text-right">#</span>
            <span>Kod</span>
            <span>Jamoa</span>
            <span>O'yin</span>
            <span className="text-right">Reyting</span>
            <span className="text-right">Holat</span>
          </div>

          {/* ===== TEAMS LIST ===== */}
          <div className="divide-y divide-ink-200">
            {filtered.length === 0 ? (
              <div className="p-12 text-center">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-500">
                  Hech narsa topilmadi
                </p>
              </div>
            ) : (
              filtered.map((t, i) => (
                <TeamRow
                  key={t.id}
                  team={t}
                  index={i}
                  isExpanded={expandedId === t.id}
                  onToggle={() =>
                    setExpandedId((prev) => (prev === t.id ? null : t.id))
                  }
                />
              ))
            )}
          </div>

          {/* ===== FOOTER — count ===== */}
          <div className="flex items-center justify-between px-6 h-10 border-t border-ink-200 bg-ink-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            <span>
              Ko'rsatilmoqda {String(filtered.length).padStart(2, "0")} /{" "}
              {String(data.teams.length).padStart(2, "0")}
            </span>
            <span>Ranking ↓</span>
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
   Team Row — expandable
   ============================================================ */
function TeamRow({
  team,
  index,
  isExpanded,
  onToggle,
}: {
  team: Team;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const cfg = statusConfig[team.status];

  return (
    <div
      className="animate-fade-up"
      style={{ animationDelay: `${0.05 + index * 0.03}s` }}
    >
      {/* Main row */}
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`group w-full text-left grid grid-cols-1 md:grid-cols-[50px_110px_1fr_120px_110px_100px] gap-4 px-6 py-5 items-center transition-colors duration-300 ease-apple ${
          isExpanded ? "bg-ink-100/40" : "hover:bg-ink-100/40"
        }`}
      >
        {/* Rank */}
        <div className="flex md:block items-center justify-between md:text-right">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            Rank
          </span>
          <span className="font-mono text-[15px] tracking-[0.1em] text-ink-1000 tabular-nums font-semibold">
            {String(team.rank).padStart(2, "0")}
          </span>
        </div>

        {/* Kod + sana */}
        <div className="flex md:block items-center gap-3">
          <div className="font-mono text-[11px] tracking-[0.2em] text-ink-500">
            {team.code}
          </div>
          <div className="font-mono text-[10px] tracking-[0.15em] text-ink-400 md:mt-1">
            {team.founded}
          </div>
        </div>

        {/* Jamoa nomi + tag + captain */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-[15px] font-medium text-ink-1000 tracking-[-0.01em] truncate">
              {team.name}
            </h3>
            <span className="inline-flex items-center h-5 px-2 rounded-full border border-ink-200 font-mono text-[9px] tracking-[0.15em] uppercase text-ink-600">
              {team.tag}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-500">
              {team.region}
            </span>
            <span className="w-1 h-1 rounded-full bg-ink-300" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-500">
              CAPT. {team.captain}
            </span>
            <span className="w-1 h-1 rounded-full bg-ink-300" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-500">
              {team.members.length} O'YINCHI
            </span>
          </div>
        </div>

        {/* Game */}
        <div className="flex md:block items-center justify-between">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            O'yin
          </span>
          <span className="inline-flex items-center h-6 px-2.5 rounded-full border border-ink-200 font-mono text-[10px] tracking-[0.15em] uppercase text-ink-700">
            {team.game}
          </span>
        </div>

        {/* Reyting */}
        <div className="flex md:block items-center justify-between md:text-right">
          <span className="md:hidden font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
            Reyting
          </span>
          <div>
            <div className="text-[14px] font-semibold tracking-[-0.02em] text-ink-1000 tabular-nums">
              {team.points.toLocaleString()}
            </div>
            <div className="font-mono text-[10px] tracking-[0.15em] text-ink-500 tabular-nums">
              {team.winRate}% WR
            </div>
          </div>
        </div>

        {/* Holat */}
        <div className="flex md:justify-end items-center gap-2">
          <span className="inline-flex items-center gap-2 h-6 px-2.5 rounded-full border border-ink-200">
            <span
              className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass} ${
                cfg.pulse ? "animate-blink-soft" : ""
              }`}
            />
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-700">
              {cfg.label}
            </span>
          </span>
          {/* Chevron */}
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={`text-ink-500 transition-transform duration-300 ease-apple ${
              isExpanded ? "rotate-180" : ""
            }`}
          >
            <path
              d="M2 4l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Expanded — roster */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-apple-out ${
          isExpanded ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-2 bg-ink-100/20 border-t border-ink-200">
          {/* Stats mini-bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatMini label="G'alaba" value={String(team.wins)} />
            <StatMini label="Mag'lubiyat" value={String(team.losses)} />
            <StatMini label="Win Rate" value={`${team.winRate}%`} />
            <StatMini label="Ball" value={team.points.toLocaleString()} />
          </div>

          {/* Win rate progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
                G'alaba foizi
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-ink-1000 tabular-nums">
                {team.winRate}%
              </span>
            </div>
            <div className="h-[2px] w-full bg-ink-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-ink-1000 transition-[width] duration-1000 ease-apple-out"
                style={{ width: `${team.winRate}%` }}
              />
            </div>
          </div>

          {/* Roster */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                Roster
              </span>
              <span className="flex-1 h-[1px] bg-ink-200" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
                {team.members.length} / 5
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {team.members.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between px-3 h-10 rounded-lg border border-ink-200 bg-ink-50/40 hover:border-ink-400 transition-colors duration-300 ease-apple"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-[10px] tracking-[0.15em] text-ink-500">
                      {m.country}
                    </span>
                    <span className="text-[13px] font-medium text-ink-1000 truncate">
                      {m.nickname}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-500">
                    {m.role}
                  </span>
                </div>
              ))}

              {/* Bo'sh slotlar */}
              {[...Array(Math.max(0, 5 - team.members.length))].map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="flex items-center justify-center px-3 h-10 rounded-lg border border-dashed border-ink-200 text-ink-400"
                >
                  <span className="font-mono text-[9px] tracking-[0.2em] uppercase">
                    Bo'sh slot
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* View profile */}
          <div className="mt-6 flex justify-end">
            <Link
              href={`/teams/${team.id}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-ink-1000 text-ink-0 text-[12px] font-medium hover:bg-ink-800 transition-colors duration-300 ease-apple"
            >
              Profilni ko'rish
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
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
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Stat Mini
   ============================================================ */
function StatMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3 rounded-lg border border-ink-200 bg-ink-50/40">
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-ink-500 mb-1">
        {label}
      </div>
      <div className="text-[18px] leading-none font-semibold tracking-[-0.02em] text-ink-1000 tabular-nums">
        {value}
      </div>
    </div>
  );
}
