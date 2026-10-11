"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Tilla rang — butun sahifaning asosiy accent'i
const GOLD = "#a8835a";

export default function ComingSoonScreen() {
  const [time, setTime] = useState("");
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  // Countdown — 30 kun keyin
  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 30);

    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16 overflow-hidden">
      {/* ===== Ambient fon effektlar ===== */}
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />

      {/* Radial glow — tilla */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${GOLD}15 0%, transparent 70%)`,
        }}
      />

      {/* Orbital nuqtalar */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] animate-[spin_40s_linear_infinite] opacity-40">
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: GOLD }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[620px] animate-[spin_60s_linear_infinite_reverse] opacity-25">
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: GOLD }}
          />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] animate-[spin_90s_linear_infinite] opacity-15">
          <span
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
            style={{ background: GOLD }}
          />
        </div>
      </div>

      {/* ===== SCREEN / DISPLAY ===== */}
      <div className="relative w-full max-w-[720px]">
        <div className="relative rounded-2xl border border-neutral-200 bg-white/70 backdrop-blur-xl overflow-hidden shadow-sm">
          {/* ===== TOP BAR ===== */}
          <div className="flex items-center justify-between px-5 h-10 border-b border-neutral-200 bg-neutral-50/60">
            <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
              <span className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: GOLD }}
                />
                <span className="text-neutral-900 font-semibold">
                  Tez Kunda
                </span>
              </span>
              <span className="text-neutral-300 hidden sm:inline">|</span>
              <span className="hidden sm:inline">SYS.Building</span>
            </div>

            <div className="hidden md:flex items-center gap-[3px] h-3">
              {[...Array(16)].map((_, i) => (
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

          {/* ===== ASOSIY KONTENT ===== */}
          <div className="relative p-8 sm:p-12 md:p-16 text-center">
            {/* Scan line — tilla */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div
                className="absolute left-0 right-0 h-[1px] animate-[scan-line_5s_linear_infinite]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)`,
                }}
              />
            </div>

            {/* Eyebrow */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="w-8 h-[1px]" style={{ background: GOLD }} />
              <span
                className="font-mono text-[10px] tracking-[0.4em] uppercase"
                style={{ color: GOLD }}
              >
                Coming Soon
              </span>
              <span className="w-8 h-[1px]" style={{ background: GOLD }} />
            </div>

            {/* ===== TILLA SARLAVHA ===== */}
            <h1 className="relative select-none">
              {/* 1-qator: "Tez" */}
              <span
                className="block text-[clamp(3rem,10vw,6rem)] leading-[0.9] font-bold tracking-[-0.05em] animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
                style={{
                  background: `linear-gradient(135deg, #d4b483 0%, ${GOLD} 40%, #8a6a45 60%, #d4b483 100%)`,
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  animation:
                    "shimmer 4s ease-in-out infinite, fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both",
                  textShadow: `0 0 40px ${GOLD}20`,
                }}
              >
                Tez Kunda
              </span>

              {/* 2-qator: "kunda" */}
              <span
                className="block text-[clamp(3rem,10vw,6rem)] leading-[0.9] font-bold tracking-[-0.05em]"
                style={{
                  background: `linear-gradient(135deg, ${GOLD} 0%, #d4b483 50%, ${GOLD} 100%)`,
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  animation: "shimmer 4s ease-in-out infinite",
                  animationDelay: "0.3s",
                  textShadow: `0 0 40px ${GOLD}20`,
                }}
              >
                qo'shiladi
              </span>

              {/* Nuqtalar — tilla */}
              <span className="inline-flex items-center gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full animate-[bounce-dot_1.4s_ease-in-out_infinite]"
                    style={{
                      background: GOLD,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </span>
            </h1>

            {/* Tavsif */}
            <p className="mt-8 max-w-md mx-auto text-[14px] sm:text-[15px] leading-relaxed text-neutral-600 animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.3s_both]">
              Biz yangi bo'lim ustida ishlayapmiz. Juda tez orada sizni hayratda
              qoldiradigan narsa bilan qaytamiz.
            </p>

            {/* ===== COUNTDOWN ===== */}
            <div className="mt-12 grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto">
              {[
                { label: "Kun", value: countdown.days },
                { label: "Soat", value: countdown.hours },
                { label: "Daqiqa", value: countdown.minutes },
                { label: "Soniya", value: countdown.seconds },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="relative rounded-lg border border-neutral-200 bg-white/60 px-2 py-3 sm:py-4 overflow-hidden animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
                  style={{ animationDelay: `${0.4 + i * 0.05}s` }}
                >
                  {/* Tilla accent — yuqorida */}
                  <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[1px]"
                    style={{ background: GOLD }}
                  />

                  <div
                    className="text-[24px] sm:text-[32px] leading-none font-bold tabular-nums tracking-[-0.03em]"
                    style={{ color: GOLD }}
                  >
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-2">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* ===== CTA ===== */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 animate-[fade-up_0.8s_cubic-bezier(0.16,1,0.3,1)_0.7s_both]">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 h-11 px-6 rounded-full text-white text-[14px] font-medium transition-all duration-300"
                style={{ background: "#171717" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#171717";
                }}
              >
                Bosh sahifaga qaytish
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

              <button
                type="button"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full text-[14px] font-medium transition-all duration-300 border"
                style={{ borderColor: GOLD, color: GOLD }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${GOLD}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: GOLD }}
                />
                Xabar berish
              </button>
            </div>
          </div>

          {/* ===== PASTKI BAR — status ===== */}
          <div className="flex items-center justify-between px-5 h-9 border-t border-neutral-200 bg-neutral-50/60 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span className="flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: GOLD }}
              />
              Progress: 84%
            </span>
            <span>v2.7.0</span>
          </div>

          {/* ===== Progress bar — pastki chiziq ===== */}
          <div className="relative h-[2px] bg-neutral-100 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 animate-[progress_3s_ease-in-out_infinite]"
              style={{
                background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
                width: "40%",
              }}
            />
          </div>
        </div>

        {/* ===== Pastdagi dekorativ chiziq ===== */}
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
