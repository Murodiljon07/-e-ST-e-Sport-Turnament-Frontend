"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Trophy,
  CalendarRange,
  Users,
  User,
  Gamepad2,
  Menu,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Btn from "../ui/Btn";

/* hooks */
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hooks";

// Bu qism keyinchalik auth hook bilan almashtiriladi
const useAuth = () => {
  // Demo uchun - keyinchalik next-auth yoki custom auth bilan almashtiriladi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    avatar?: string;
    email: string;
  } | null>(null);

  return { isLoggedIn, user, setIsLoggedIn, setUser };
};

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Turnaments", href: "/tournaments", icon: Trophy },
  { name: "Live", href: "/live", icon: Gamepad2 },
  { name: "Clans", href: "/teams", icon: Users },
  { name: "Upcoming Matches", href: "/upcmatches", icon: CalendarRange },
];

function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, user } = useAuth();

  return (
    <>
      {/* ===== DESKTOP NAVBAR ===== */}
      <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0e1a] via-[#1a0f2e] to-[#0a0e1a] border-b border-purple-500/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ULTIMATE
                </span>
                <span className="text-[10px] font-medium tracking-[0.2em] text-gray-400 -mt-1">
                  ESPORTS TOURNAMENT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Auth Section */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                // Logged In User Menu
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {user?.name || "User"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0f1322] border border-purple-500/20 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Mening profilim
                        </Link>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Trophy className="w-4 h-4" />
                          Mening turnirlarim
                        </Link>
                        <Link
                          href="/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Sozlamalar
                        </Link>
                        <hr className="my-2 border-purple-500/20" />
                        <button
                          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-red-400 hover:bg-red-600/10 hover:text-red-300 transition"
                          onClick={() => {
                            // Logout logic
                            setDropdownOpen(false);
                          }}
                        >
                          <LogOut className="w-4 h-4" />
                          Chiqish
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Login/Register Buttons
                <>
                  <Btn
                    onClick={() => {
                      setAuthTab("login");
                      setAuthModalOpen(true);
                      router.push("/auth/loging");
                    }}
                    btnType="second"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </Btn>
                  <Btn
                    onClick={() => {
                      setAuthTab("register");
                      setAuthModalOpen(true);
                      router.push("/auth/register");
                    }}
                    btnType="main"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Btn>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM NAVBAR ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-purple-500/20 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            if (item.requiresAuth && !isLoggedIn) return null;

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-2xl
                  transition-all duration-200 min-w-[64px]
                  ${
                    isActive
                      ? "text-purple-400 bg-purple-600/10"
                      : "text-gray-500 hover:text-gray-300"
                  }
                `}
              >
                <div className="relative">
                  <item.icon
                    className={`w-6 h-6 ${isActive ? "drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]" : ""}`}
                  />
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                  )}
                </div>
                <span
                  className={`text-[11px] font-medium ${isActive ? "text-purple-400" : ""}`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-2xl text-gray-500 hover:text-gray-300 transition-all min-w-[64px]"
          >
            <Menu className="w-6 h-6" />
            <span className="text-[11px] font-medium">Menyu</span>
          </button>
        </div>

        {/* Mobile Expanded Menu */}
        {mobileMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-[#0a0e1a]/95 backdrop-blur-xl border-t border-purple-500/20 p-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex flex-col gap-2">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setAuthTab("login");
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-white/5 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition flex items-center justify-center gap-2"
                  >
                    <LogIn className="w-4 h-4" />
                    Kirish
                  </button>
                  <button
                    onClick={() => {
                      setAuthTab("register");
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Ro'yxatdan o'tish
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 px-2 py-2 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/profile"
                    className="w-full py-3 bg-white/5 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    👤 Mening profilim
                  </Link>
                  <button className="w-full py-3 bg-red-600/10 rounded-xl text-sm text-red-400 hover:bg-red-600/20 transition">
                    🚪 Chiqish
                  </button>
                </>
              )}
              <hr className="my-1 border-purple-500/20" />
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
