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
  X,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Btn from "../ui/Btn";

// Bu qism keyinchalik auth hook bilan almashtiriladi
const useAuth = () => {
  // Demo uchun - keyinchalik next-auth yoki custom auth bilan almashtiriladi
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    avatar?: string;
    email: string;
  } | null>({
    name: "John Doe",
    email: "john@example.com",
  });

  return { isLoggedIn, user, setIsLoggedIn, setUser };
};

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Turnaments", href: "/tournaments", icon: Trophy },
  { name: "Live", href: "/live", icon: Gamepad2 },
  { name: "Clans", href: "/teams", icon: Users },
  { name: "Upcoming", href: "/upcmatches", icon: CalendarRange },
];

function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const { isLoggedIn, user } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuOpen
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ===== DESKTOP & TABLET NAVBAR ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0a0e1a] via-[#1a0f2e] to-[#0a0e1a] border-b border-purple-500/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 group flex-shrink-0"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-xl font-black tracking-wider bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ULTIMATE
                </span>
                <span className="hidden sm:block text-[8px] sm:text-[10px] font-medium tracking-[0.2em] text-gray-400 -mt-1">
                  ESPORTS TOURNAMENT
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links - Hidden on tablet */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium
                      transition-all duration-200 whitespace-nowrap
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

            {/* Tablet Navigation - Icons only */}
            <nav className="hidden md:flex lg:hidden items-center gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      p-2 rounded-xl transition-all duration-200
                      ${
                        isActive
                          ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }
                    `}
                    title={item.name}
                  >
                    <item.icon className="w-5 h-5" />
                  </Link>
                );
              })}
            </nav>

            {/* Desktop & Tablet Auth Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {isLoggedIn ? (
                // Logged In User Menu
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-xl hover:bg-white/5 transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/30">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-gray-300 group-hover:text-white">
                        {user?.name || "User"}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform hidden sm:block ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0f1322] border border-purple-500/20 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
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
                      router.push("/auth/login");
                    }}
                    btnType="second"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Btn>
                  <Btn
                    onClick={() => {
                      setAuthTab("register");
                      setAuthModalOpen(true);
                      router.push("/auth/register");
                    }}
                    btnType="main"
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Btn>
                </>
              )}

              {/* Mobile Menu Button - Hidden on tablet and desktop */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ===== MOBILE SIDEBAR MENU ===== */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gradient-to-b from-[#0a0e1a] to-[#1a0f2e] shadow-2xl transition-transform duration-300 ease-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ULTIMATE
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Info if logged in */}
            {isLoggedIn && (
              <div className="p-4 border-b border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }
                      `}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
              <hr className="my-4 mx-4 border-purple-500/20" />
              {/* Auth Links for Mobile */}
              {isLoggedIn ? (
                <div className="px-4 space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Mening profilim</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Trophy className="w-5 h-5" />
                    <span>Mening turnirlarim</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Sozlamalar</span>
                  </Link>
                  <button
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-600/10 hover:text-red-300 transition"
                    onClick={() => {
                      // Logout logic
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Chiqish</span>
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-purple-500/20">
              <p className="text-center text-xs text-gray-500">
                © 2024 ULTIMATE ESPORTS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}

export default NavBar;
