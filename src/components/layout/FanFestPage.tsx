"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type {
  ActivityType,
  EventStatus,
  EventType,
  FanFestData,
  FanFestEvent,
} from "@/lib/types";

interface FanFestPageProps {
  data: FanFestData;
}

const GOLD = "#a8835a";

const eventTypeLabels: Record<EventType, string> = {
  meetup: "MEETUP",
  autograph: "IMZO",
  contest: "TANLOV",
  show: "SHOU",
  workshop: "SEMINAR",
  tournament: "TURNIR",
};

const activityTypeIcons: Record<ActivityType, string> = {
  quiz: "◆",
  prediction: "▲",
  vote: "●",
  raffle: "★",
};

const statusConfig: Record<
  EventStatus,
  { label: string; pulse: boolean; color: string }
> = {
  live: { label: "LIVE", pulse: true, color: GOLD },
  upcoming: { label: "REJALASHTIRILGAN", pulse: false, color: "#a3a3a3" },
  ended: { label: "YAKUNLANGAN", pulse: false, color: "#a3a3a3" },
};

export default function FanFestPage({ data }: FanFestPageProps) {
  const [time, setTime] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

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

  const filtered = useMemo(() => {
    if (activeFilter === "all") return data.events;
    return data.events.filter((e) => e.status === activeFilter);
  }, [data.events, activeFilter]);

  const featured = useMemo(
    () => data.events.find((e) => e.featured),
    [data.events],
  );

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

          {/* ===== HERO ===== */}
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

            {/* Title */}
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900">
              {data.hero.title.line1}
              <br />
              <span style={{ color: GOLD }}>{data.hero.title.line2}</span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-lg text-[14px] sm:text-[15px] leading-relaxed text-neutral-600">
              {data.hero.description}
            </p>

            {/* Meta pills */}
            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <span
                className="inline-flex items-center gap-2 h-8 px-3 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
                style={{ background: `${GOLD}15`, color: GOLD }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <rect
                    x="1"
                    y="2"
                    width="8"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1 4h8M3 1v2M7 1v2"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {data.hero.dateLabel}
              </span>

              <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-neutral-200 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M5 1c-1.7 0-3 1.3-3 3 0 2.5 3 5 3 5s3-2.5 3-5c0-1.7-1.3-3-3-3z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="5"
                    cy="4"
                    r="1"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
                {data.hero.location}
              </span>

              <span className="inline-flex items-center gap-2 h-8 px-3 rounded-full border border-neutral-200 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <circle
                    cx="5"
                    cy="3.5"
                    r="1.8"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1.5 9c0-1.8 1.6-3 3.5-3s3.5 1.2 3.5 3"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
                {data.hero.attendees} TASHKIL
              </span>
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

          {/* ===== FEATURED EVENT ===== */}
          {featured && (
            <div className="relative border-b border-neutral-200">
              <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: GOLD }}
                  />
                  <span
                    className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold"
                    style={{ color: GOLD }}
                  >
                    ★ Featured Event
                  </span>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                  {featured.time} · {featured.duration}
                </span>
              </div>

              <Link
                href={`/fan-fest/${featured.id}`}
                className="group block p-5 sm:p-8 hover:bg-neutral-50 transition-colors duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-end">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-flex items-center h-5 px-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
                        style={{ background: `${GOLD}15`, color: GOLD }}
                      >
                        {eventTypeLabels[featured.type]}
                      </span>
                      <span
                        className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
                        style={{ color: GOLD }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: GOLD }}
                        />
                        LIVE
                      </span>
                    </div>

                    <h2 className="text-[clamp(1.5rem,4vw,2.5rem)] leading-[1] tracking-[-0.03em] font-semibold text-neutral-900 mb-3">
                      {featured.title}
                    </h2>

                    <p className="text-[14px] leading-relaxed text-neutral-600 max-w-xl mb-5">
                      {featured.description}
                    </p>

                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                        {featured.host} · {featured.hostRole}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-neutral-300" />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
                        {featured.venue}
                      </span>
                    </div>

                    {/* Capacity bar */}
                    <div className="max-w-md mt-5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                          Ro'yxatdan o'tganlar
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.2em] tabular-nums font-semibold"
                          style={{ color: GOLD }}
                        >
                          {featured.registered}/{featured.capacity}
                        </span>
                      </div>
                      <div className="h-[3px] w-full bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-[width] duration-1000"
                          style={{
                            width: `${(featured.registered / featured.capacity) * 100}%`,
                            background: `linear-gradient(90deg, ${GOLD}, #d4b483, ${GOLD})`,
                            backgroundSize: "200% 100%",
                            animation: "shimmer-wave 3s linear infinite",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex lg:flex-col items-center gap-3">
                    <span
                      className="inline-flex items-center h-11 px-6 rounded-full font-medium text-[13px] cursor-pointer transition-all duration-300"
                      style={{ background: GOLD, color: "#fff" }}
                    >
                      Ro'yxatdan o'tish
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="text-neutral-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#a8835a]"
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
          )}

          {/* ===== FILTERS ===== */}
          <div className="p-5 sm:px-6 sm:py-5 border-b border-neutral-200 bg-neutral-50/40">
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mr-2 hidden sm:inline">
                Holat:
              </span>
              {data.filters.map((f) => {
                const isActive = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
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
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
            {/* ============ CHAP: EVENTS ============ */}
            <div>
              <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                  Tadbirlar
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                  {String(filtered.length).padStart(2, "0")}
                </span>
              </div>

              <div className="divide-y divide-neutral-200">
                {filtered.length === 0 ? (
                  <div className="p-12 text-center">
                    <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-500">
                      Hech narsa topilmadi
                    </p>
                  </div>
                ) : (
                  filtered.map((ev, i) => (
                    <EventRow key={ev.id} ev={ev} index={i} />
                  ))
                )}
              </div>
            </div>

            {/* ============ O'NG: ACTIVITIES + GUESTS ============ */}
            <div className="flex flex-col">
              {/* ---- ACTIVITIES ---- */}
              <div className="border-b border-neutral-200">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Faoliyatlar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.activities.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.activities.map((a) => (
                    <div
                      key={a.id}
                      className="p-5 hover:bg-neutral-50 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full border text-[14px]"
                          style={{
                            borderColor:
                              a.status === "live" ? `${GOLD}50` : "#e5e5e5",
                            color: a.status === "live" ? GOLD : "#a3a3a3",
                          }}
                        >
                          {activityTypeIcons[a.type]}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[13px] font-semibold text-neutral-900 tracking-[-0.01em]">
                              {a.title}
                            </h4>
                            {a.status === "live" && (
                              <span
                                className="w-1 h-1 rounded-full animate-pulse"
                                style={{ background: GOLD }}
                              />
                            )}
                          </div>
                          <p className="text-[12px] text-neutral-500 leading-snug">
                            {a.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pl-11">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold"
                            style={{ color: GOLD }}
                          >
                            {a.reward}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-neutral-300" />
                          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400 tabular-nums">
                            {a.participants}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400 tabular-nums">
                          → {a.endsAt}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---- GUESTS ---- */}
              <div className="border-b border-neutral-200">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Mehmonlar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.guests.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.guests.map((g) => (
                    <div
                      key={g.id}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-neutral-50 transition-colors duration-300"
                    >
                      <span
                        className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border font-mono text-[11px] font-semibold"
                        style={{
                          borderColor: `${GOLD}50`,
                          color: GOLD,
                          background: `${GOLD}08`,
                        }}
                      >
                        {g.initials}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[12px] font-semibold text-neutral-900 truncate">
                            {g.nickname}
                          </span>
                          <span className="font-mono text-[9px] tracking-[0.15em] text-neutral-400">
                            {g.country}
                          </span>
                        </div>
                        <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5 truncate">
                          {g.team} · {g.role}
                        </div>
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400 shrink-0">
                        {g.appearance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ---- SCHEDULE ---- */}
              <div className="flex-1">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Jadval
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    KUN 01
                  </span>
                </div>

                <div className="relative p-5">
                  {/* Vertical line */}
                  <div
                    className="absolute left-[30px] top-7 bottom-7 w-[1px]"
                    style={{
                      background: `linear-gradient(180deg, ${GOLD}, #e5e5e5)`,
                    }}
                  />

                  <div className="space-y-4">
                    {data.schedule.map((item, i) => {
                      const cfg = statusConfig[item.status];
                      const isLive = item.status === "live";
                      const isEnded = item.status === "ended";

                      return (
                        <div
                          key={item.id}
                          className="relative flex items-start gap-4 pl-1"
                        >
                          {/* Time */}
                          <span
                            className="shrink-0 w-12 font-mono text-[10px] tracking-[0.15em] tabular-nums pt-0.5"
                            style={{
                              color: isLive
                                ? GOLD
                                : isEnded
                                  ? "#a3a3a3"
                                  : "#525252",
                              fontWeight: isLive ? 600 : 400,
                            }}
                          >
                            {item.time}
                          </span>

                          {/* Dot */}
                          <span
                            className="shrink-0 relative z-10 w-[13px] h-[13px] rounded-full border-2 bg-white mt-0.5"
                            style={{
                              borderColor: isLive
                                ? GOLD
                                : isEnded
                                  ? "#d4d4d4"
                                  : "#e5e5e5",
                            }}
                          >
                            {isLive && (
                              <span
                                className="absolute inset-[2px] rounded-full animate-pulse"
                                style={{ background: GOLD }}
                              />
                            )}
                          </span>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pb-2">
                            <h4
                              className="text-[13px] font-medium tracking-[-0.01em] truncate"
                              style={{
                                color: isEnded ? "#a3a3a3" : "#171717",
                                textDecoration: isEnded
                                  ? "line-through"
                                  : "none",
                              }}
                            >
                              {item.title}
                            </h4>
                            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400 mt-0.5">
                              {item.stage} STAGE
                            </span>
                          </div>

                          {isLive && (
                            <span
                              className="font-mono text-[9px] tracking-[0.2em] uppercase font-semibold pt-1 shrink-0"
                              style={{ color: GOLD }}
                            >
                              LIVE
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-5 h-10 border-t border-neutral-200 bg-neutral-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>
              Ko'rsatilmoqda {String(filtered.length).padStart(2, "0")} /{" "}
              {String(data.events.length).padStart(2, "0")}
            </span>
            <span>Fan Fest 2026 · Day 01</span>
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
   Event Row
   ============================================================ */
function EventRow({ ev, index }: { ev: FanFestEvent; index: number }) {
  const cfg = statusConfig[ev.status];
  const isLive = ev.status === "live";
  const isEnded = ev.status === "ended";
  const fillPercent = (ev.registered / ev.capacity) * 100;

  return (
    <Link
      href={`/fan-fest/${ev.id}`}
      className="group block"
      style={{
        animation: `fade-up 0.5s cubic-bezier(0.16,1,0.3,1) both`,
        animationDelay: `${0.05 + index * 0.03}s`,
      }}
    >
      <div className="px-5 sm:px-6 py-5 transition-colors duration-300 hover:bg-neutral-50">
        {/* Top row: code + type + status */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400">
              {ev.code}
            </span>
            <span
              className="inline-flex items-center h-5 px-2 rounded-full border font-mono text-[9px] tracking-[0.15em] uppercase"
              style={{
                borderColor: ev.type === "meetup" ? `${GOLD}50` : "#e5e5e5",
                color: ev.type === "meetup" ? GOLD : "#737373",
              }}
            >
              {eventTypeLabels[ev.type]}
            </span>
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
              {ev.time} · {ev.duration}
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 h-6 px-2.5 rounded-full border border-neutral-200">
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

        {/* Title */}
        <h3
          className="text-[15px] font-semibold text-neutral-900 tracking-[-0.01em] mb-2"
          style={{
            color: isEnded ? "#a3a3a3" : "#171717",
            textDecoration: isEnded ? "line-through" : "none",
          }}
        >
          {ev.title}
        </h3>

        {/* Description */}
        <p className="text-[13px] text-neutral-600 leading-snug mb-3 line-clamp-2">
          {ev.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-3 flex-wrap mb-3">
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
            {ev.host}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-500">
            {ev.venue}
          </span>
        </div>

        {/* Capacity bar */}
        {!isEnded && (
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400">
                Band
              </span>
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400 tabular-nums">
                {ev.registered}/{ev.capacity}
              </span>
            </div>
            <div className="h-[2px] w-full bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${fillPercent}%`,
                  background: isLive
                    ? `linear-gradient(90deg, ${GOLD}, #d4b483, ${GOLD})`
                    : "#a3a3a3",
                  backgroundSize: isLive ? "200% 100%" : "auto",
                  animation: isLive
                    ? "shimmer-wave 3s linear infinite"
                    : "none",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
