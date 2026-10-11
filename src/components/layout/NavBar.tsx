"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Trophy,
  Play,
  Crown,
  PartyPopper,
  Monitor,
  Images,
  ShoppingBag,
  CircleHelp,
  Globe,
  CircleUser,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Home", shortLabel: "Home", icon: Home, href: "/" },
  {
    label: "Competitions",
    shortLabel: "Comps",
    icon: Trophy,
    href: "/competitions",
  },
  { label: "Play", shortLabel: "Play", icon: Play, href: "/play" },
  { label: "Ranking", shortLabel: "Rank", icon: Crown, href: "/ranking" },
  {
    label: "Fan Fest",
    shortLabel: "Fest",
    icon: PartyPopper,
    href: "/fan-fest",
  },
  {
    label: "Creator Program",
    shortLabel: "Creator",
    icon: Monitor,
    href: "/creator-program",
  },
  { label: "Media", shortLabel: "Media", icon: Images, href: "/media" },
  { label: "Shop", shortLabel: "Shop", icon: ShoppingBag, href: "/shop" },
  { label: "About", shortLabel: "About", icon: CircleHelp, href: "/about" },
];

// Pastdagi nav uchun asosiy 5 ta element
const MOBILE_PRIMARY = ["Home", "Competitions", "Play", "Ranking", "Shop"];

interface SidebarProps {
  logoSrc?: string;
  logoAlt?: string;
  defaultActive?: string;
  onLanguageClick?: () => void;
  onLoginClick?: () => void;
}

export default function Sidebar({
  logoSrc = "/logo.png",
  logoAlt = "Logo",
  defaultActive = "Home",
  onLanguageClick,
  onLoginClick,
}: SidebarProps) {
  const pathname = usePathname();
  const [active, setActive] = useState(defaultActive);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Route o'zgarganda active'ni yangilash
  useEffect(() => {
    const found = NAV_ITEMS.find((i) => i.href === pathname);
    if (found) setActive(found.label);
  }, [pathname]);

  // Drawer ochilganda body scroll to'xtatish
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const mobilePrimaryItems = NAV_ITEMS.filter((i) =>
    MOBILE_PRIMARY.includes(i.label),
  );

  return (
    <>
      {/* ============================================================
          DESKTOP — chap tomonda vertikal sidebar (lg+)
          ============================================================ */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-40 h-screen w-[240px] flex-col bg-white text-neutral-900 border-r border-neutral-200">
        {/* Logo */}
        <div className="flex h-[100px] items-center justify-center px-6 border-b border-neutral-100">
          <Link
            href="/"
            className="group flex items-center gap-2.5 select-none"
          >
            {/* Geometric mark — CyberArena uslubi */}
            <span className="relative grid place-items-center w-8 h-8">
              <span className=" absolute inset-0  border-2 border-neutral-900 rounded-[6px] transition-transform duration-500  ease-in-out  group-hover:rotate-135" />
              <span className="absolute inset-0  border-2 border-neutral-900 rounded-[6px] transition-transform duration-500  ease-out -rotate-45 group-hover:rotate-90" />
              <span className="w-1.5 h-1.5 bg-neutral-900 rounded-[1px]" />
            </span>
            <span className="font-mono text-[13px] font-semibold tracking-[0.18em] uppercase text-neutral-900">
              CyberArena
            </span>
          </Link>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 flex flex-col gap-1 px-3 py-4 overflow-y-auto">
          <div className="px-3 pb-3">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
              Menu
            </span>
          </div>

          {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
            const isActive = active === label;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setActive(label)}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-3 h-11 px-3 rounded-lg transition-all duration-300 ease-out ${
                  isActive
                    ? "bg-neutral-100 text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {/* Chap accent chiziq */}
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] rounded-r-full bg-[#a8835a] transition-all duration-300 ease-out ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className={`shrink-0 transition-colors duration-300 ${
                    isActive
                      ? "text-[#a8835a]"
                      : "text-neutral-500 group-hover:text-neutral-900"
                  }`}
                />
                <span
                  className={`text-[13px] tracking-[-0.01em] truncate ${
                    isActive ? "font-semibold" : "font-medium"
                  }`}
                >
                  {label}
                </span>

                {/* Faol indikator nuqtasi */}
                {isActive && (
                  <span className="ml-auto w-1 h-1 rounded-full bg-[#a8835a]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom — Language + Login */}
        <div className="border-t border-neutral-100 p-3 flex flex-col gap-1">
          {/* Language */}
          <button
            type="button"
            onClick={onLanguageClick}
            className="group flex items-center gap-3 h-11 px-3 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition-all duration-300 ease-out"
          >
            <Globe
              size={20}
              strokeWidth={1.75}
              className="shrink-0 text-neutral-500 group-hover:text-neutral-900 transition-colors"
            />
            <span className="text-[13px] font-medium tracking-[-0.01em]">
              Uzbekistan
            </span>
            <span className="ml-auto font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
              UZ
            </span>
          </button>

          {/* Login — accent tugma */}
          <button
            type="button"
            onClick={onLoginClick}
            className="group flex items-center gap-3 h-11 px-3 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-all duration-300 ease-out"
          >
            <CircleUser size={20} strokeWidth={2} className="shrink-0" />
            <span className="text-[13px] font-semibold tracking-[-0.01em]">
              Login
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="ml-auto transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path
                d="M1 6h10M7 2l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* ============================================================
          MOBILE / TABLET — bottom nav (lg dan kichik)
          ============================================================ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-neutral-200">
        <div className="grid grid-cols-6 h-16">
          {mobilePrimaryItems.map(({ label, shortLabel, icon: Icon, href }) => {
            const isActive = active === label;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setActive(label)}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center justify-center gap-1 transition-colors duration-300"
              >
                {/* Faol indikator — yuqorida chiziq */}
                <span
                  className={`absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-b-full bg-[#a8835a] transition-all duration-300 ease-out ${
                    isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                  }`}
                />

                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-[#a8835a]" : "text-neutral-500"
                  }`}
                />
                <span
                  className={`text-[10px] tracking-[-0.01em] ${
                    isActive
                      ? "font-semibold text-neutral-900"
                      : "font-medium text-neutral-500"
                  }`}
                >
                  {shortLabel}
                </span>
              </Link>
            );
          })}

          {/* "Ko'proq" tugmasi — drawer ochadi */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Ko'proq"
            className="relative flex flex-col items-center justify-center gap-1 transition-colors duration-300"
          >
            <Menu size={20} strokeWidth={1.75} className="text-neutral-500" />
            <span className="text-[10px] font-medium tracking-[-0.01em] text-neutral-500">
              Ko'proq
            </span>
          </button>
        </div>
      </nav>

      {/* ============================================================
          MOBILE DRAWER — "Ko'proq" bosilganda ochiladi
          ============================================================ */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden
        />

        {/* Drawer — pastdan chiqadi */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isMenuOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          {/* Drawer handle */}
          <div className="flex items-center justify-center pt-3 pb-2">
            <span className="w-10 h-1 rounded-full bg-neutral-300" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 pb-4 border-b border-neutral-100">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400">
              Barcha bo'limlar
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Yopish"
              className="w-8 h-8 grid place-items-center rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X size={16} className="text-neutral-700" />
            </button>
          </div>

          {/* Nav items */}
          <div className="flex-1 overflow-y-auto py-3">
            {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
              const isActive = active === label;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => {
                    setActive(label);
                    setIsMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 h-12 px-5 transition-colors duration-200 ${
                    isActive ? "bg-neutral-50" : "hover:bg-neutral-50"
                  }`}
                >
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.25 : 1.75}
                    className={isActive ? "text-[#a8835a]" : "text-neutral-500"}
                  />
                  <span
                    className={`text-[14px] tracking-[-0.01em] ${
                      isActive
                        ? "font-semibold text-neutral-900"
                        : "font-medium text-neutral-700"
                    }`}
                  >
                    {label}
                  </span>
                  {isActive && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-[#a8835a]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom actions */}
          <div className="border-t border-neutral-100 p-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onLanguageClick?.();
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-3 h-11 px-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              <Globe
                size={20}
                strokeWidth={1.75}
                className="text-neutral-700"
              />
              <span className="text-[13px] font-medium text-neutral-900">
                Uzbekistan
              </span>
              <span className="ml-auto font-mono text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                UZ
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                onLoginClick?.();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 h-11 px-3 rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
            >
              <CircleUser size={20} strokeWidth={2} />
              <span className="text-[13px] font-semibold">Login</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
