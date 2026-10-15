"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type {
  CreatorProgramData,
  CreatorTierInfo,
  Platform,
  RequirementStatus,
  TopCreator,
} from "@/lib/types";

interface CreatorProgramPageProps {
  data: CreatorProgramData;
}

const GOLD = "#a8835a";

const platformLabels: Record<Platform, string> = {
  twitch: "TWITCH",
  youtube: "YOUTUBE",
  tiktok: "TIKTOK",
  instagram: "INSTAGRAM",
  kick: "KICK",
  twitter: "X",
};

const requirementStatusConfig: Record<
  RequirementStatus,
  { label: string; color: string; bg: string }
> = {
  met: { label: "✓", color: GOLD, bg: `${GOLD}15` },
  partial: { label: "◐", color: "#d4b483", bg: "#d4b48315" },
  unmet: { label: "✕", color: "#a3a3a3", bg: "#f5f5f5" },
};

export default function CreatorProgramPage({ data }: CreatorProgramPageProps) {
  const [time, setTime] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>("f1");

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

  const tickerLoop = [...data.ticker, ...data.ticker];

  const metCount = data.requirements.filter((r) => r.status === "met").length;

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
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900 max-w-3xl">
              {data.hero.title.line1}
              <br />
              <span style={{ color: GOLD }}>{data.hero.title.line2}</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-neutral-600">
              {data.hero.description}
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={data.hero.ctaPrimary.href}
                className="group inline-flex items-center gap-2 h-11 px-6 rounded-full bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors duration-300"
              >
                {data.hero.ctaPrimary.label}
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

              <a
                href={data.hero.ctaSecondary.href}
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full border text-neutral-900 text-[14px] font-medium transition-all duration-300"
                style={{ borderColor: `${GOLD}50` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = GOLD;
                  e.currentTarget.style.background = `${GOLD}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${GOLD}50`;
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {data.hero.ctaSecondary.label}
              </a>
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

          {/* ===== BENEFITS ===== */}
          <div className="border-b border-neutral-200">
            <div className="flex items-center gap-3 px-5 sm:px-8 py-4 border-b border-neutral-200">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                Imtiyozlar
              </span>
              <span className="flex-1 h-[1px] bg-neutral-200" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                {String(data.benefits.length).padStart(2, "0")}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
              {data.benefits.map((b) => (
                <div
                  key={b.id}
                  className="group bg-white p-6 hover:bg-neutral-50 transition-colors duration-300"
                >
                  <span
                    className="inline-block text-[20px] mb-5 transition-transform duration-500 group-hover:rotate-180"
                    style={{ color: GOLD }}
                  >
                    {b.icon}
                  </span>
                  <h3 className="text-[14px] font-semibold text-neutral-900 tracking-[-0.01em] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-[12px] leading-relaxed text-neutral-600">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ===== TIERS ===== */}
          <div className="border-b border-neutral-200">
            <div className="flex items-center gap-3 px-5 sm:px-8 py-4 border-b border-neutral-200">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                Darajalar
              </span>
              <span className="flex-1 h-[1px] bg-neutral-200" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                {String(data.tiers.length).padStart(2, "0")}
              </span>
            </div>

            <div className="p-5 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {data.tiers.map((t) => (
                  <TierCard key={t.id} tier={t} />
                ))}
              </div>
            </div>
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] divide-y lg:divide-y-0 lg:divide-x divide-neutral-200">
            {/* ============ CHAP: REQUIREMENTS + STEPS ============ */}
            <div>
              {/* ---- REQUIREMENTS ---- */}
              <div id="requirements" className="border-b border-neutral-200">
                <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Talablar
                  </span>
                  <span
                    className="font-mono text-[10px] tracking-[0.2em] tabular-nums font-semibold"
                    style={{ color: GOLD }}
                  >
                    {metCount}/{data.requirements.length} ✓
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-3">
                  {data.requirements.map((r) => {
                    const cfg = requirementStatusConfig[r.status];
                    return (
                      <div
                        key={r.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors duration-300"
                      >
                        {/* Status badge */}
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-[12px] font-semibold"
                          style={{
                            background: cfg.bg,
                            color: cfg.color,
                          }}
                        >
                          {cfg.label}
                        </span>

                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-neutral-900 tracking-[-0.01em] truncate">
                            {r.label}
                          </div>
                          <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5 truncate">
                            {r.description}
                          </div>
                        </div>

                        <div className="shrink-0 text-right">
                          <div
                            className="font-mono text-[12px] font-semibold tabular-nums"
                            style={{ color: cfg.color }}
                          >
                            {r.current}
                          </div>
                          <div className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400 mt-0.5">
                            {r.target}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ---- STEPS ---- */}
              <div>
                <div className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                    Qanday ishlaydi
                  </span>
                  <span className="flex-1 h-[1px] bg-neutral-200" />
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
                    {String(data.steps.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative p-5 sm:p-6">
                  {/* Vertical line */}
                  <div
                    className="absolute left-[26px] top-8 bottom-8 w-[1px]"
                    style={{
                      background: `linear-gradient(180deg, ${GOLD}, #e5e5e5)`,
                    }}
                  />

                  <div className="space-y-5">
                    {data.steps.map((st, i) => (
                      <div
                        key={st.id}
                        className="relative flex items-start gap-4"
                      >
                        {/* Number */}
                        <span
                          className="shrink-0 inline-flex items-center justify-center w-[26px] h-[26px] rounded-full border-2 bg-white font-mono text-[10px] font-semibold z-10"
                          style={{
                            borderColor: i === 0 ? GOLD : "#d4d4d4",
                            color: i === 0 ? GOLD : "#525252",
                          }}
                        >
                          {st.number}
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[13px] font-semibold text-neutral-900 tracking-[-0.01em] mb-1">
                            {st.title}
                          </h4>
                          <p className="text-[12px] leading-relaxed text-neutral-600">
                            {st.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ============ O'NG: TOP CREATORS + FAQ ============ */}
            <div>
              {/* ---- TOP CREATORS ---- */}
              <div className="border-b border-neutral-200">
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Top Creatorlar
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.topCreators.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.topCreators.map((c) => (
                    <CreatorRow key={c.id} creator={c} />
                  ))}
                </div>
              </div>

              {/* ---- FAQ ---- */}
              <div className="flex-1">
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                    Ko'p so'raladigan
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-400 tabular-nums">
                    {String(data.faqs.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="divide-y divide-neutral-200">
                  {data.faqs.map((f) => {
                    const isOpen = openFaq === f.id;
                    return (
                      <div key={f.id}>
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : f.id)}
                          className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left hover:bg-neutral-50 transition-colors duration-300"
                        >
                          <span className="text-[13px] font-medium text-neutral-900 tracking-[-0.01em]">
                            {f.question}
                          </span>
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 12 12"
                            fill="none"
                            className={`shrink-0 mt-0.5 transition-all duration-300 ${
                              isOpen ? "rotate-45" : ""
                            }`}
                            style={{ color: isOpen ? GOLD : "#a3a3a3" }}
                          >
                            <path
                              d="M6 1v10M1 6h10"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? "max-h-[300px]" : "max-h-0"
                          }`}
                        >
                          <p className="px-5 pb-4 text-[12px] leading-relaxed text-neutral-600">
                            {f.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA in FAQ */}
                <div className="p-5 border-t border-neutral-200 bg-neutral-50/40">
                  <Link
                    href="/creator-program/apply"
                    className="group flex items-center justify-between w-full h-11 px-5 rounded-full bg-neutral-900 text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors duration-300"
                  >
                    <span>Ariza topshirish</span>
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
                </div>
              </div>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-5 h-10 border-t border-neutral-200 bg-neutral-100/30 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span>Creator Program · 2026</span>
            <span>{data.stats[0].value} FAOL</span>
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
   Tier Card
   ============================================================ */
function TierCard({ tier }: { tier: CreatorTierInfo }) {
  return (
    <div
      className={`relative rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
        tier.isFeatured ? "shadow-sm" : ""
      }`}
      style={{
        borderColor: tier.isFeatured ? GOLD : "#e5e5e5",
        background: tier.isFeatured ? `${GOLD}06` : "#ffffff",
      }}
    >
      {/* Featured badge */}
      {tier.isFeatured && (
        <span
          className="absolute -top-2 left-1/2 -translate-x-1/2 inline-flex items-center h-4 px-2 rounded-full font-mono text-[8px] tracking-[0.2em] uppercase font-semibold"
          style={{ background: GOLD, color: "#fff" }}
        >
          Mashhur
        </span>
      )}

      {/* Icon */}
      <span
        className="inline-block text-[20px] mb-4"
        style={{ color: tier.color }}
      >
        ◆
      </span>

      {/* Nom */}
      <div
        className="font-mono text-[11px] tracking-[0.2em] uppercase font-semibold mb-1"
        style={{ color: tier.color }}
      >
        {tier.name}
      </div>

      {/* Followers */}
      <div className="text-[18px] font-semibold text-neutral-900 tracking-[-0.02em] tabular-nums mb-3">
        {tier.followers}
      </div>

      {/* Revenue share */}
      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 mb-3">
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400">
          Ulush
        </span>
        <span
          className="font-mono text-[13px] font-semibold tabular-nums"
          style={{ color: GOLD }}
        >
          {tier.revenueShare}
        </span>
      </div>

      {/* Perks */}
      <ul className="space-y-1.5">
        {tier.perks.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[11px] text-neutral-600 leading-snug"
          >
            <span
              className="shrink-0 mt-1 w-1 h-1 rounded-full"
              style={{ background: tier.color }}
            />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   Creator Row
   ============================================================ */
function CreatorRow({ creator: c }: { creator: TopCreator }) {
  return (
    <Link
      href={`/creators/${c.id}`}
      className="group flex items-center gap-3 px-5 py-3.5 hover:bg-neutral-50 transition-colors duration-300"
    >
      {/* Avatar */}
      <span
        className="shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full border font-mono text-[11px] font-semibold"
        style={{
          borderColor: `${GOLD}50`,
          color: GOLD,
          background: `${GOLD}08`,
        }}
      >
        {c.initials}
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[12px] font-semibold text-neutral-900 truncate">
            {c.nickname}
          </span>
          <span className="font-mono text-[9px] tracking-[0.15em] text-neutral-400">
            {c.country}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400">
            {platformLabels[c.platform]}
          </span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400 tabular-nums">
            {c.followers}
          </span>
        </div>
      </div>

      {/* Tier + earnings */}
      <div className="text-right shrink-0">
        <div
          className="font-mono text-[10px] tracking-[0.2em] uppercase font-semibold"
          style={{ color: GOLD }}
        >
          {c.tier}
        </div>
        <div className="font-mono text-[10px] tracking-[0.15em] text-neutral-400 tabular-nums mt-0.5">
          {c.earnings}
        </div>
      </div>
    </Link>
  );
}
