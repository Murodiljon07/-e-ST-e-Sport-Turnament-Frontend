"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PlayData, PlayerGameStat } from "@/lib/types";

interface PlayPageProps {
  data: PlayData;
}

const GOLD = "#a8835a";

const rankColors: Record<string, string> = {
  Bronze: "#8a6a45",
  Silver: "#a3a3a3",
  Gold: "#d4b483",
  Platinum: "#a8835a",
  Diamond: "#8a6a45",
  Master: "#a8835a",
  Grandmaster: "#d4b483",
  Elite: GOLD,
};

export default function PlayPage({ data }: PlayPageProps) {
  const [time, setTime] = useState("");
  const [activeGameIndex, setActiveGameIndex] = useState(0);

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

  const activeGame = data.games[activeGameIndex];

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

          {/* ===== PROFILE HEADER ===== */}
          <div className="relative p-6 sm:p-8 border-b border-neutral-200">
            {/* Scan line */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 right-0 h-[1px] animate-[scan-line_6s_linear_infinite]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}30, transparent)`,
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-8">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full grid place-items-center font-mono text-[24px] sm:text-[28px] font-semibold border-2"
                  style={{
                    borderColor: GOLD,
                    color: GOLD,
                    background: `${GOLD}08`,
                  }}
                >
                  {data.profile.avatarInitials}
                </div>
                {/* Live indikator */}
                {data.liveMatch && (
                  <span
                    className="absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: GOLD }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                {/* Nick + country */}
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-none tracking-[-0.03em] font-semibold text-neutral-900 font-mono">
                    {data.profile.nickname}
                  </h1>
                  <span
                    className="inline-flex items-center h-6 px-2 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
                    style={{ background: `${GOLD}15`, color: GOLD }}
                  >
                    {data.profile.country}
                  </span>
                  {data.team.isCaptain && (
                    <span className="inline-flex items-center h-6 px-2 rounded-full border border-neutral-200 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-600">
                      ★ CAPTAIN
                    </span>
                  )}
                </div>

                {/* Real name + age */}
                <p className="text-[14px] text-neutral-600 mb-3">
                  {data.profile.realName} · {data.profile.age} yosh
                </p>

                {/* Bio */}
                <p className="text-[13px] leading-relaxed text-neutral-500 max-w-xl mb-4">
                  {data.profile.bio}
                </p>

                {/* Team + role + since */}
                <div className="flex items-center gap-3 flex-wrap">
                  <Link
                    href={`/teams/${data.team.id}`}
                    className="group inline-flex items-center gap-2 h-8 px-3 rounded-full border transition-all duration-300"
                    style={{ borderColor: `${GOLD}50` }}
                  >
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-neutral-300 font-mono text-[8px] tracking-[0.1em] text-neutral-700">
                      {data.team.tag}
                    </span>
                    <span className="text-[12px] font-medium text-neutral-900 group-hover:text-[#a8835a] transition-colors">
                      {data.team.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400">
                      {data.team.role}
                    </span>
                  </Link>

                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                    {data.team.joinedAt} DAN
                  </span>
                </div>
              </div>

              {/* Global rank badge */}
              <div className="shrink-0 text-right">
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-1">
                  Global Rank
                </div>
                <div
                  className="text-[36px] sm:text-[44px] leading-none font-bold tracking-[-0.04em] tabular-nums"
                  style={{ color: GOLD }}
                >
                  #{String(data.overview.globalRank).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>

          {/* ===== OVERVIEW STATS ===== */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-neutral-200 border-b border-neutral-200">
            <StatBox
              label="Daromad"
              value={data.overview.totalEarnings}
              accent
            />
            <StatBox
              label="O'yinlar"
              value={data.overview.totalMatches.toLocaleString()}
            />
            <StatBox
              label="G'alaba"
              value={`${data.overview.winRate}%`}
              accent
            />
            <StatBox
              label="Turnirlar"
              value={String(data.overview.tournamentsPlayed)}
            />
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
            {/* ============ CHAP USTUN ============ */}
            <div className="flex flex-col">
              {/* ---- LIVE MATCH ---- */}
              {data.liveMatch && (
                <div className="border-b border-neutral-200">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: GOLD }}
                      />
                      <span
                        className="font-mono text-[10px] tracking-[0.25em] uppercase font-semibold"
                        style={{ color: GOLD }}
                      >
                        Live Match
                      </span>
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                      {data.liveMatch.viewers} KO'RUVCHI
                    </span>
                  </div>

                  <Link
                    href={`/match/${data.liveMatch.id}`}
                    className="group block p-5 hover:bg-neutral-50 transition-colors duration-300"
                  >
                    {/* Tournament */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                        {data.liveMatch.tournament}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                        {data.liveMatch.round}
                      </span>
                    </div>

                    {/* Teams + score */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 font-mono text-[10px] tracking-[0.1em] text-neutral-700 shrink-0">
                          {data.liveMatch.teamA.tag}
                        </span>
                        <span className="text-[15px] font-semibold text-neutral-900 truncate">
                          {data.liveMatch.teamA.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className="text-[28px] font-bold tabular-nums tracking-[-0.03em]"
                          style={{
                            color:
                              data.liveMatch.teamA.score >
                              data.liveMatch.teamB.score
                                ? GOLD
                                : "#a3a3a3",
                          }}
                        >
                          {data.liveMatch.teamA.score}
                        </span>
                        <span className="text-neutral-300 text-[16px]">:</span>
                        <span
                          className="text-[28px] font-bold tabular-nums tracking-[-0.03em]"
                          style={{
                            color:
                              data.liveMatch.teamB.score >
                              data.liveMatch.teamA.score
                                ? GOLD
                                : "#a3a3a3",
                          }}
                        >
                          {data.liveMatch.teamB.score}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 min-w-0 flex-1 justify-end">
                        <span className="text-[15px] font-semibold text-neutral-900 truncate">
                          {data.liveMatch.teamB.name}
                        </span>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-neutral-300 font-mono text-[10px] tracking-[0.1em] text-neutral-700 shrink-0">
                          {data.liveMatch.teamB.tag}
                        </span>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                        {data.liveMatch.map}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                        {data.liveMatch.startedAt} BOSHLANGAN
                      </span>
                    </div>
                  </Link>
                </div>
              )}

              {/* ---- GAMES (Tab) ---- */}
              <div className="border-b border-neutral-200">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    O'yinlar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.games.length).padStart(2, "0")} TA
                  </span>
                </div>

                {/* Game tabs */}
                <div className="flex border-b border-neutral-200 overflow-x-auto">
                  {data.games.map((g, i) => {
                    const isActive = activeGameIndex === i;
                    return (
                      <button
                        key={g.gameId}
                        onClick={() => setActiveGameIndex(i)}
                        className="relative flex items-center gap-2 h-11 px-4 shrink-0 text-[12px] font-medium tracking-[-0.01em] transition-colors duration-300"
                        style={{
                          color: isActive ? "#171717" : "#737373",
                        }}
                      >
                        <span
                          className="text-[14px]"
                          style={{ color: isActive ? GOLD : "#a3a3a3" }}
                        >
                          {g.gameIcon}
                        </span>
                        <span>{g.gameShort}</span>
                        {g.isPrimary && (
                          <span
                            className="w-1 h-1 rounded-full"
                            style={{ background: GOLD }}
                          />
                        )}
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-t-full"
                            style={{ background: GOLD }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Active game stats */}
                <div className="p-5">
                  {/* Rank + Level */}
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-4">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-1">
                        Rank
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-[20px] font-bold tracking-[-0.02em]"
                          style={{ color: rankColors[activeGame.rank] ?? GOLD }}
                        >
                          {activeGame.rank}
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.15em] text-neutral-400 tabular-nums">
                          {activeGame.rankPoints.toLocaleString()} RP
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400 mb-1">
                        Level
                      </div>
                      <div className="text-[20px] font-bold tracking-[-0.02em] text-neutral-900 tabular-nums">
                        {activeGame.level}
                      </div>
                    </div>
                  </div>

                  {/* Stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden mb-5">
                    <MiniStat
                      label="O'yinlar"
                      value={activeGame.matches.toLocaleString()}
                    />
                    <MiniStat
                      label="G'alaba"
                      value={String(activeGame.wins)}
                      accent
                    />
                    <MiniStat
                      label="Mag'lubiyat"
                      value={String(activeGame.losses)}
                    />
                    <MiniStat label="K/D" value={activeGame.kd.toFixed(2)} />
                  </div>

                  {/* Win rate bar */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                        Win Rate
                      </span>
                      <span
                        className="font-mono text-[10px] tracking-[0.2em] tabular-nums font-semibold"
                        style={{ color: GOLD }}
                      >
                        {activeGame.winRate}%
                      </span>
                    </div>
                    <div className="h-[3px] w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-[width] duration-1000"
                        style={{
                          width: `${activeGame.winRate}%`,
                          background: `linear-gradient(90deg, ${GOLD}, #d4b483, ${GOLD})`,
                          backgroundSize: "200% 100%",
                          animation: "shimmer-wave 3s linear infinite",
                        }}
                      />
                    </div>
                  </div>

                  {/* Meta info */}
                  <div className="flex items-center gap-3 flex-wrap pt-3 border-t border-neutral-100">
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                      {activeGame.hoursPlayed.toLocaleString()} SOAT
                    </span>
                    <span className="w-1 h-1 rounded-full bg-neutral-300" />
                    <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                      {activeGame.since} DAN
                    </span>
                    {activeGame.isPrimary && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        <span
                          className="inline-flex items-center h-5 px-2 rounded-full font-mono text-[9px] tracking-[0.2em] uppercase font-semibold"
                          style={{
                            background: `${GOLD}15`,
                            color: GOLD,
                          }}
                        >
                          ★ ASOSIY
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* ---- ACHIEVEMENTS ---- */}
              <div>
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Yutuqlar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.achievements.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.achievements.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors duration-300"
                    >
                      {/* Placement badge */}
                      <span
                        className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border font-mono text-[12px] font-semibold"
                        style={{
                          borderColor: a.placement === "1st" ? GOLD : "#e5e5e5",
                          color: a.placement === "1st" ? GOLD : "#a3a3a3",
                          background:
                            a.placement === "1st" ? `${GOLD}10` : "transparent",
                        }}
                      >
                        {a.placement}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-semibold text-neutral-900 tracking-[-0.01em] truncate">
                          {a.title}
                        </h4>
                        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5">
                          {a.tournament} · {a.date}
                        </p>
                      </div>

                      <span
                        className="font-mono text-[12px] font-semibold tabular-nums shrink-0"
                        style={{ color: GOLD }}
                      >
                        {a.prize}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ============ O'NG USTUN ============ */}
            <div className="flex flex-col">
              {/* ---- UPCOMING MATCHES ---- */}
              <div className="border-b border-neutral-200">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Keyingi o'yinlar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.upcomingMatches.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.upcomingMatches.map((m) => (
                    <Link
                      key={m.id}
                      href={`/match/${m.id}`}
                      className="block px-5 py-4 hover:bg-neutral-50 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 truncate">
                          {m.tournament}
                        </span>
                        <span
                          className="font-mono text-[10px] tracking-[0.15em] uppercase font-semibold shrink-0 ml-2"
                          style={{ color: GOLD }}
                        >
                          {m.startedAt}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-neutral-300 font-mono text-[8px] text-neutral-700 shrink-0">
                            {m.teamA.tag}
                          </span>
                          <span className="text-[13px] font-medium text-neutral-900 truncate">
                            {m.teamA.name}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] tracking-[0.15em] text-neutral-400 shrink-0">
                          VS
                        </span>
                        <div className="flex items-center gap-2 min-w-0 justify-end">
                          <span className="text-[13px] font-medium text-neutral-900 truncate">
                            {m.teamB.name}
                          </span>
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-neutral-300 font-mono text-[8px] text-neutral-700 shrink-0">
                            {m.teamB.tag}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400">
                          {m.round}
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400">
                          {m.gameShort}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* ---- ACTIVITY ---- */}
              <div className="flex-1">
                <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Faoliyat
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.activity.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.activity.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-start gap-3 px-5 py-4 hover:bg-neutral-50 transition-colors duration-300"
                    >
                      {/* Icon */}
                      <span
                        className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border border-neutral-200 font-mono text-[11px]"
                        style={{
                          color: a.type === "achievement" ? GOLD : "#737373",
                        }}
                      >
                        {a.type === "match"
                          ? "◆"
                          : a.type === "tournament"
                            ? "▲"
                            : "★"}
                      </span>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-[13px] font-medium text-neutral-900 tracking-[-0.01em] truncate">
                          {a.title}
                        </h4>
                        <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                          {a.description}
                        </p>
                      </div>

                      <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400 shrink-0 pt-1">
                        {a.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-5 h-10 border-t border-neutral-200 bg-neutral-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>
              {data.overview.totalWins}W · {data.overview.totalLosses}L ·{" "}
              {data.overview.winRate}% WR
            </span>
            <span>{data.overview.totalHours.toLocaleString()} SOAT</span>
          </div>

          {/* ===== TICKER ===== */}
          <div className="relative h-9 border-t border-neutral-200 bg-neutral-50/60 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex items-center h-full animate-[marquee_30s_linear_infinite] whitespace-nowrap">
              {[...data.ticker, ...data.ticker].map((item, i) => (
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
   Yordamchi komponentlar
   ============================================================ */

function StatBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="p-4 sm:p-5">
      <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 mb-2">
        {label}
      </div>
      <div
        className="text-[24px] sm:text-[28px] leading-none font-semibold tracking-[-0.03em] tabular-nums"
        style={{ color: accent ? GOLD : "#171717" }}
      >
        {value}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-white p-3">
      <div className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-1.5">
        {label}
      </div>
      <div
        className="text-[16px] font-semibold tracking-[-0.02em] tabular-nums"
        style={{ color: accent ? GOLD : "#171717" }}
      >
        {value}
      </div>
    </div>
  );
}
