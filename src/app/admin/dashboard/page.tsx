"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Trophy,
  DollarSign,
  TrendingUp,
  CalendarRange,
  Gamepad2,
  Medal,
  Eye,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  UserPlus,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  registeredAt: string;
  status: "active" | "pending" | "blocked";
}

interface RecentTournament {
  id: string;
  title: string;
  game: string;
  participants: number;
  prizePool: number;
  status: "upcoming" | "ongoing" | "completed";
  startDate: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([
    {
      title: "Total Users",
      value: "12,847",
      change: 12.5,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Tournaments",
      value: "24",
      change: 8.2,
      icon: Trophy,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Revenue",
      value: "$48,294",
      change: 23.1,
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Active Players",
      value: "3,245",
      change: -2.4,
      icon: Activity,
      color: "from-orange-500 to-red-500",
    },
  ]);

  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "JD",
      registeredAt: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "JS",
      registeredAt: "2024-01-14",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike@example.com",
      avatar: "MJ",
      registeredAt: "2024-01-13",
      status: "pending",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "SW",
      registeredAt: "2024-01-12",
      status: "active",
    },
    {
      id: "5",
      name: "Chris Brown",
      email: "chris@example.com",
      avatar: "CB",
      registeredAt: "2024-01-11",
      status: "blocked",
    },
  ]);

  const [recentTournaments, setRecentTournaments] = useState<
    RecentTournament[]
  >([
    {
      id: "1",
      title: "Weekly Championship",
      game: "CS2",
      participants: 64,
      prizePool: 5000,
      status: "ongoing",
      startDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Pro League Season 3",
      game: "Valorant",
      participants: 128,
      prizePool: 10000,
      status: "upcoming",
      startDate: "2024-01-20",
    },
    {
      id: "3",
      title: "Ultimate Showdown",
      game: "League of Legends",
      participants: 32,
      prizePool: 7500,
      status: "completed",
      startDate: "2024-01-10",
    },
    {
      id: "4",
      title: "Rookie Tournament",
      game: "Dota 2",
      participants: 48,
      prizePool: 3000,
      status: "upcoming",
      startDate: "2024-01-18",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "blocked":
        return "bg-red-500/20 text-red-400";
      case "ongoing":
        return "bg-yellow-500/20 text-yellow-400";
      case "upcoming":
        return "bg-blue-500/20 text-blue-400";
      case "completed":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">
          Welcome back! Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#0f1322]/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5 hover:border-purple-500/40 transition group"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}
              >
                {stat.change >= 0 ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                <span>{Math.abs(stat.change)}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
            <p className="text-gray-400 text-sm mt-1">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-[#0f1322]/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Revenue Overview
            </h3>
            <select className="px-3 py-1.5 bg-[#0a0e1a] border border-purple-500/20 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-500">
            {/* Chart component here - you can add Recharts or Chart.js */}
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Revenue chart will appear here</p>
            </div>
          </div>
        </div>

        {/* User Activity */}
        <div className="bg-[#0f1322]/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">User Activity</h3>
            <Link
              href="/admin/users"
              className="text-purple-400 text-sm hover:text-purple-300"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "New Users Today",
                value: "156",
                change: "+23%",
                icon: UserPlus,
                color: "text-green-400",
              },
              {
                label: "Active Sessions",
                value: "2,345",
                change: "+12%",
                icon: Activity,
                color: "text-blue-400",
              },
              {
                label: "Completed Matches",
                value: "89",
                change: "+5%",
                icon: CheckCircle,
                color: "text-purple-400",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b border-purple-500/20 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 bg-${item.color.split("-")[1]}/10 rounded-lg flex items-center justify-center`}
                  >
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">{item.label}</p>
                    <p className="text-lg font-bold text-white">{item.value}</p>
                  </div>
                </div>
                <span className="text-green-400 text-sm">{item.change}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Users & Tournaments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users Table */}
        <div className="bg-[#0f1322]/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-purple-500/20">
            <h3 className="text-lg font-semibold text-white">Recent Users</h3>
            <Link
              href="/admin/users"
              className="text-purple-400 text-sm hover:text-purple-300"
            >
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1a0f2e]/50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    User
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Registered
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/20">
                {recentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-sm">
                      {new Date(user.registeredAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3">
                      <button className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Tournaments */}
        <div className="bg-[#0f1322]/50 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-purple-500/20">
            <h3 className="text-lg font-semibold text-white">
              Recent Tournaments
            </h3>
            <Link
              href="/admin/tournaments"
              className="text-purple-400 text-sm hover:text-purple-300"
            >
              View All
            </Link>
          </div>
          <div className="divide-y divide-purple-500/20">
            {recentTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="p-4 hover:bg-white/5 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Gamepad2 className="w-4 h-4 text-purple-400" />
                      <h4 className="text-white font-medium">
                        {tournament.title}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}
                      >
                        {tournament.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>{tournament.game}</span>
                      <span>👥 {tournament.participants}</span>
                      <span>💰 ${tournament.prizePool.toLocaleString()}</span>
                    </div>
                  </div>
                  <button className="p-1 rounded-lg text-gray-400 hover:text-purple-400">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-xl text-white font-medium hover:from-purple-500 hover:to-pink-500 transition text-center">
          + Create Tournament
        </button>
        <button className="bg-[#0f1322] border border-purple-500/20 p-4 rounded-xl text-white font-medium hover:bg-white/5 transition text-center">
          📊 Generate Report
        </button>
        <button className="bg-[#0f1322] border border-purple-500/20 p-4 rounded-xl text-white font-medium hover:bg-white/5 transition text-center">
          👥 Manage Users
        </button>
        <button className="bg-[#0f1322] border border-purple-500/20 p-4 rounded-xl text-white font-medium hover:bg-white/5 transition text-center">
          🏆 View Analytics
        </button>
      </div>
    </div>
  );
}
