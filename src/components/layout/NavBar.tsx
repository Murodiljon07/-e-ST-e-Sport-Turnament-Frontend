"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "Bosh sahifa", href: "/" },
  { label: "Turnirlar", href: "#tournaments" },
  { label: "Jamoalar", href: "/#teams" },
  { label: "O'yinchilar", href: "/#players" },
  { label: "Yangiliklar", href: "/#news" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-apple border-b ${
        isScrolled || isMenuOpen
          ? "bg-ink-0/80 backdrop-blur-2xl backdrop-saturate-150 border-ink-200"
          : "bg-ink-0/60 backdrop-blur-xl backdrop-saturate-150 border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-[1200px] px-6 h-16 flex items-center justify-between">
        {/* Logo — Wordmark */}
        <Link
          href="/"
          aria-label="CyberArena"
          className="group flex items-center gap-2 select-none"
        >
          {/* Minimal geometric mark */}
          <div className="flex">
            <span className="relative grid place-items-center w-8 h-8 left-2">
              <span className="absolute inset-0 border border-ink-1000 rounded-[5px] animate-spin-slow" />
              <span className="w-3 h-3 bg-ink-1000 rounded-[1px] animate-pulse-soft" />
            </span>
            <span className="relative grid place-items-center w-8 h-8 right-6 rotate-45">
              <span className="absolute inset-0 border border-ink-1000 rounded-[5px] animate-spin-reverse" />
              <span className="w-1.5 h-1.5 bg-ink-1000 rounded-[1px] animate-pulse-soft" />
            </span>
          </div>
          <span className="font-mono text-[13px] font-medium tracking-[0.18em] text-ink-1000 uppercase ">
            CyberArena
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-[13px] tracking-[-0.01em] transition-colors duration-300 ease-apple ${
                    isActive
                      ? "text-ink-1000"
                      : "text-ink-600 hover:text-ink-1000"
                  }`}
                >
                  {link.label}
                  {/* Apple-like underline dot */}
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-[3px] w-[3px] rounded-full bg-ink-1000 transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right — Apple-like actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden md:inline-flex items-center h-8 px-3 text-[13px] text-ink-700 hover:text-ink-1000 transition-colors duration-300 ease-apple"
          >
            Kirish
          </Link>

          <Link
            href="/signup"
            className="hidden md:inline-flex items-center h-8 px-4 rounded-full text-[13px] font-medium bg-ink-1000 text-ink-0 hover:bg-ink-800 transition-colors duration-300 ease-apple"
          >
            Boshlash
          </Link>

          {/* Mobile toggle — Apple style */}
          <button
            aria-label={isMenuOpen ? "Yopish" : "Menyu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden relative w-9 h-9 grid place-items-center text-ink-1000"
          >
            <span className="sr-only">Menyu</span>
            <span className="relative block w-4 h-[10px]">
              <span
                className={`absolute left-0 w-full h-[1.5px] bg-ink-1000 rounded-full transition-all duration-400 ease-apple-out ${
                  isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[1.5px] bg-ink-1000 rounded-full transition-all duration-400 ease-apple-out ${
                  isMenuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45"
                    : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu — full screen, Apple-like */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-apple-out ${
          isMenuOpen ? "max-h-[70vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pt-2 pb-8 border-t border-ink-200">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className="animate-fade-down border-b border-ink-200/60 last:border-b-0"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-4 text-[17px] tracking-[-0.01em] transition-colors duration-300 ${
                      isActive
                        ? "text-ink-1000"
                        : "text-ink-600 hover:text-ink-1000"
                    }`}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="7"
                      height="12"
                      viewBox="0 0 7 12"
                      fill="none"
                      className="text-ink-500"
                      aria-hidden
                    >
                      <path
                        d="M1 1l5 5-5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className="mt-6 flex flex-col gap-2 animate-fade-down"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 rounded-full text-[15px] font-medium border border-ink-300 text-ink-1000 hover:bg-ink-100 transition-colors duration-300"
            >
              Kirish
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-11 rounded-full text-[15px] font-medium bg-ink-1000 text-ink-0 hover:bg-ink-800 transition-colors duration-300"
            >
              Boshlash
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
