"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { authServices } from "@/api/services/auth.service";

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?:()=>void
  onRegister?:()=>void
}

export  function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authServices.loginUser({ email, password });

      // Token va rolni localStorage ga saqlash
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("user", JSON.stringify(data.user));

      console.log("Login success:", data);

      // Role asosida yo'naltirish
      if (data.user.role === "admin") {
        router.push("/admin/dashboard");
      } else if (data.user.role === "user") {
        router.push("/user/dashboard");
      } else {
        // Default - home page
        router.push("/");
      }

      // Agar onSuccess callback berilgan bo'lsa
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.response?.data?.message || "Login failed! Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Email input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0f1322] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>

        {/* Password input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            Parol
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-[#0f1322] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition"
              placeholder="••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-purple-400 hover:text-purple-300 transition"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Login
            </>
          )}
        </button>

        {/* Switch to register */}
        <p className="text-center text-gray-400 text-sm">
          Hisobingiz yo‘qmi?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-purple-400 hover:text-purple-300 font-medium transition"
          >
            Ro‘yxatdan o‘tish
          </button>
        </p>
      </form>
    </div>
  );
}