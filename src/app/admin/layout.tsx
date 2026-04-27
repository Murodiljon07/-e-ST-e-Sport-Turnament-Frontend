"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Trophy,
  CalendarRange,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  Search,
  Shield,
  Gamepad2,
  DollarSign,
  FileText,
  MessageSquare,
  TrendingUp,
  Crown,
} from "lucide-react";
import { useAuth } from "@/components/hooks/useAuth";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Tournaments", href: "/admin/tournaments", icon: Trophy },
  { name: "Matches", href: "/admin/matches", icon: CalendarRange },
  { name: "Games", href: "/admin/games", icon: Gamepad2 },
  { name: "Payments", href: "/admin/payments", icon: DollarSign },
  { name: "Reports", href: "/admin/reports", icon: FileText },
  { name: "Support", href: "/admin/support", icon: MessageSquare },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user, role, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  //   const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New user registered", time: "5 min ago", read: false },
    { id: 2, title: "Tournament created", time: "1 hour ago", read: false },
    { id: 3, title: "Payment received", time: "2 hours ago", read: true },
  ]);

  //   useEffect(() => {
  //     if (!loading && (!isLoggedIn || role !== "admin")) {
  //       router.push("/auth/login");
  //     }
  //   }, [isLoggedIn, role, loading, router]);

  //   // Close sidebar on route change (mobile)
  //   useEffect(() => {
  //     setSidebarOpen(false);
  //   }, [pathname]);

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] to-[#1a0f2e]">
  //         <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
  //       </div>
  //     );
  //   }

  if (!isLoggedIn || role !== "admin") {
    return null;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#1a0f2e] to-[#0a0e1a]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#0f1322]/95 backdrop-blur-xl border-r border-purple-500/20 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Admin Panel
              </span>
              <p className="text-[10px] text-gray-500">ULTIMATE ESPORTS</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 overflow-y-auto h-[calc(100vh-73px)]">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-purple-400 border border-purple-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`w-5 h-5 ${isActive ? "text-purple-400" : "group-hover:text-white"}`}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-purple-500/20">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition group"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#0f1322]/80 backdrop-blur-xl border-b border-purple-500/20">
          <div className="flex items-center justify-between px-4 py-3 lg:px-6">
            {/* Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-9 pr-4 py-2 bg-[#0a0e1a] border border-purple-500/20 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {/* Notifications */}
              <div className="relative">
                <button className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user?.name?.charAt(0) || "A"}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">
                      {user?.name || "Admin"}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">{role}</p>
                  </div>
                  <ChevronDown className="hidden md:block w-4 h-4 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[#0f1322] border border-purple-500/20 rounded-xl shadow-2xl overflow-hidden z-50">
                      <div className="p-2">
                        <Link
                          href="/admin/profile"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Users className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          href="/admin/settings"
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </Link>
                        <hr className="my-2 border-purple-500/20" />
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-red-400 hover:bg-red-600/10 hover:text-red-300 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
