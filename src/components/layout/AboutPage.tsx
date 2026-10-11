"use client";

import Link from "next/link";
import type { AboutData } from "@/lib/types";

interface AboutPageProps {
  data: AboutData;
}

const GOLD = "#a8835a";

export default function AboutPage({ data }: AboutPageProps) {
  return (
    <div className="relative w-full">
      {/* Ambient grid — nozik */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
        {/* ============================================================
            HERO
            ============================================================ */}
        <section className="mb-24 sm:mb-32">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-10 sm:mb-14">
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

          {/* Sarlavha */}
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] font-semibold text-neutral-900 max-w-3xl">
            {data.hero.title.line1}
            <br />
            <span style={{ color: GOLD }}>{data.hero.title.line2}</span>
          </h1>

          {/* Tavsif */}
          <p className="mt-8 max-w-xl text-[15px] sm:text-[16px] leading-relaxed text-neutral-600">
            {data.hero.description}
          </p>
        </section>
        {/* ============================================================
            STATS — katta raqamlar
            ============================================================ */}
        <section className="mb-24 sm:mb-32 border-y border-neutral-200">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {data.stats.map((s, i) => (
              <div
                key={s.id}
                className={`py-8 sm:py-10 px-2 sm:px-4 ${
                  i < data.stats.length - 1
                    ? "md:border-r border-neutral-200"
                    : ""
                } ${i % 2 === 0 ? "border-r md:border-r" : ""} ${
                  i >= 2 ? "border-t md:border-t-0 border-neutral-200" : ""
                }`}
              >
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3 flex items-center gap-1.5">
                  {i === 0 && (
                    <span
                      className="w-1 h-1 rounded-full animate-pulse"
                      style={{ background: GOLD }}
                    />
                  )}
                  {s.label}
                </div>
                <div className="text-[clamp(2rem,5vw,3rem)] leading-none font-semibold tracking-[-0.04em] tabular-nums text-neutral-900">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </section>
        {/* ============================================================
            MISSION — 2 ustun
            ============================================================ */}
        <section className="mb-24 sm:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20">
            {/* Chap — label */}
            <div>
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase font-semibold"
                style={{ color: GOLD }}
              >
                {data.mission.label}
              </span>
            </div>

            {/* O'ng — kontent */}
            <div>
              <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] tracking-[-0.03em] font-semibold text-neutral-900 mb-6">
                {data.mission.title}
              </h2>

              <p className="text-[15px] sm:text-[16px] leading-relaxed text-neutral-600 mb-10">
                {data.mission.body}
              </p>

              {/* Quote */}
              <blockquote
                className="relative pl-6 border-l-2"
                style={{ borderColor: GOLD }}
              >
                <p className="text-[16px] sm:text-[18px] leading-relaxed text-neutral-900 italic tracking-[-0.01em]">
                  "{data.mission.quote}"
                </p>
                <footer className="mt-4 font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                  — {data.mission.author}
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
        {/* ============================================================
            VALUES — 4 karta
            ============================================================ */}
        <section className="mb-24 sm:mb-32">
          {/* Header */}
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              Qadriyatlar
            </span>
            <span className="flex-1 h-[1px] bg-neutral-200" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              {String(data.values.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
            {data.values.map((v) => (
              <div
                key={v.id}
                className="group bg-white p-6 sm:p-8 hover:bg-neutral-50 transition-colors duration-300"
              >
                {/* Icon — geometric */}
                <span
                  className="inline-block text-[20px] mb-6 transition-transform duration-500 group-hover:rotate-180"
                  style={{ color: GOLD }}
                >
                  {v.icon}
                </span>

                <h3 className="text-[15px] font-semibold text-neutral-900 tracking-[-0.01em] mb-3">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-neutral-600">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            TEAM — 4 kishi
            ============================================================ */}
        <section className="mb-24 sm:mb-32">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              Asoschi
            </span>
            <span className="flex-1 h-[1px] bg-neutral-200" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              {String(data.team.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid  gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
            {data.team.map((m) => (
              <div
                key={m.id}
                className="group bg-white p-6 sm:p-8 hover:bg-neutral-50 transition-colors duration-300"
              >
                {/* Avatar — initials */}
                <div
                  className="w-12 h-12 rounded-full grid place-items-center mb-5 font-mono text-[14px] font-semibold border transition-colors duration-300"
                  style={{
                    borderColor: "#e5e5e5",
                    color: GOLD,
                  }}
                >
                  {m.initials}
                </div>

                <h3 className="text-[14px] font-semibold text-neutral-900 tracking-[-0.01em] mb-1">
                  {m.name}
                </h3>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400">
                  {m.role}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* ============================================================
            CONTACT
            ============================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              Aloqa
            </span>
            <span className="flex-1 h-[1px] bg-neutral-200" />
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400">
              Get in touch
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 rounded-lg overflow-hidden">
            {data.contact.map((c) => (
              <a
                key={c.id}
                href={c.href}
                className="group bg-white p-6 hover:bg-neutral-50 transition-colors duration-300 flex flex-col gap-3"
              >
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
                  {c.label}
                </span>
                <span className="text-[14px] font-medium text-neutral-900 tracking-[-0.01em] group-hover:text-[#a8835a] transition-colors duration-300">
                  {c.value}
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
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/competitions"
              className="group inline-flex items-center gap-2 h-11 px-6 rounded-full bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 transition-colors duration-300"
            >
              Turnirlarga qo'shilish
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

            <Link
              href="/contact"
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
              Bog'lanish
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
