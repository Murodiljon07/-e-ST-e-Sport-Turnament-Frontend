"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  User,
  Gamepad2,
  Calendar,
  Flag,
  ChevronRight,
  ChevronLeft,
  Check,
  Trophy,
} from "lucide-react";
import { authServices } from "@/api/services/auth.service";
import { decodeJWT } from "@/lib/jwt";
import { setCookie } from "cookies-next";

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

// Step 1: Email va Password
interface Step1Data {
  email: string;
  password: string;
  confirmPassword: string;
}

// Step 2: Player profile
interface Step2Data {
  fullName: string;
  nickname: string;
  age: number;
  country: string;
  avatar?: string;
}

// Step 3: Games
interface Game {
  name: string;
  playerId: string;
}

interface Step3Data {
  mainGame: {
    game: string;
    playerId: string;
  };
  games: Game[];
}

export default function RegisterForm({
  onSuccess,
  onSwitchToLogin,
}: RegisterFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1 state
  const [step1Data, setStep1Data] = useState<Step1Data>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Step 2 state
  const [step2Data, setStep2Data] = useState<Step2Data>({
    fullName: "",
    nickname: "",
    age: 16,
    country: "",
    avatar: "",
  });

  // Step 3 state
  const [step3Data, setStep3Data] = useState<Step3Data>({
    mainGame: {
      game: "",
      playerId: "",
    },
    games: [],
  });
  const [showAddGame, setShowAddGame] = useState(false);
  const [newGame, setNewGame] = useState({ name: "", playerId: "" });

  // Country list
  const countries = [
    "Uzbekistan",
    "Kazakhstan",
    "Russia",
    "USA",
    "UK",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Turkey",
    "South Korea",
    "China",
    "Japan",
    "Brazil",
    "Argentina",
    "Other",
  ];

  // Game options
  const gameOptions = [
    "Valorant",
    "CS2",
    "League of Legends",
    "Dota 2",
    "PUBG",
    "Fortnite",
    "Apex Legends",
    "Call of Duty",
    "Mobile Legends",
    "Free Fire",
    "Rocket League",
    "Other",
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (step1Data.password !== step1Data.confirmPassword) {
      setError("Parollar mos kelmadi!");
      return;
    }

    if (step1Data.password.length < 6) {
      setError("Parol kamida 6 belgidan iborat bo‘lishi kerak!");
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!step2Data.fullName.trim()) {
      setError("To‘liq ismni kiriting!");
      return;
    }
    if (!step2Data.nickname.trim()) {
      setError("Nikneymni kiriting!");
      return;
    }
    if (step2Data.age < 16) {
      setError("Yoshingiz kamida 16 bo‘lishi kerak!");
      return;
    }
    if (!step2Data.country) {
      setError("Mamlakatni tanlang!");
      return;
    }

    setStep(3);
  };

  const handleAddGame = () => {
    if (!newGame.name || !newGame.playerId.trim()) {
      setError("Game nomi va Player ID ni kiriting!");
      return;
    }
    setStep3Data({
      ...step3Data,
      games: [
        ...step3Data.games,
        { name: newGame.name, playerId: newGame.playerId },
      ],
    });
    setNewGame({ name: "", playerId: "" });
    setShowAddGame(false);
    setError("");
  };

  const handleRemoveGame = (index: number) => {
    const updatedGames = step3Data.games.filter((_, i) => i !== index);
    setStep3Data({ ...step3Data, games: updatedGames });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validate main game
    if (!step3Data.mainGame.game || !step3Data.mainGame.playerId.trim()) {
      setError("Asosiy o‘yin va Player ID ni kiriting!");
      setLoading(false);
      return;
    }

    // Prepare data for backend - backend kutilgan format
    const registerData = {
      email: step1Data.email,
      password: step1Data.password,
      fullName: step2Data.fullName,
      nickname: step2Data.nickname,
      age: step2Data.age,
      country: step2Data.country,
      avatar: step2Data.avatar || "",
      mainGame: {
        game: step3Data.mainGame.game,
        playerId: step3Data.mainGame.playerId,
      },
      games: step3Data.games,
    };

    try {
      const response = await authServices.registerUser(registerData);
      console.log("Register success:", response);

      // Backend dan kelayotgan response formatiga qarab
      // Agar response.user va response.token kelsa
      if (response.token) {
        localStorage.setItem("token", response.token);
        setCookie("token", response.token, { maxAge: 60 * 60 * 24 });

        // Tokendan role olish
        const decoded = decodeJWT(response.token);
        const userRole = decoded?.role || decoded?.Role || "user";
        localStorage.setItem("role", userRole);
        setCookie("role", userRole, { maxAge: 60 * 60 * 24 });
      }

      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      // onSuccess callback yoki login sahifasiga yo'naltirish
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/auth/login");
      }
    } catch (err: any) {
      console.error("Register error:", err);
      // Backend dan kelayotgan error message
      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Ro‘yxatdan o‘tishda xatolik!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const progressWidth = ((step - 1) / 2) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      {/* Logo */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg shadow-purple-500/30 mb-3">
          <Trophy className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Join the Battle
        </h2>
        <p className="text-gray-400 text-sm mt-1">Create your gaming profile</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span
            className={`text-xs ${step >= 1 ? "text-purple-400" : "text-gray-500"}`}
          >
            1. Account
          </span>
          <span
            className={`text-xs ${step >= 2 ? "text-purple-400" : "text-gray-500"}`}
          >
            2. Profile
          </span>
          <span
            className={`text-xs ${step >= 3 ? "text-purple-400" : "text-gray-500"}`}
          >
            3. Games
          </span>
        </div>
        <div className="h-1 bg-[#0f1322] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-[#0f1322]/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-5 sm:p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Step 1: Email & Password */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={step1Data.email}
                  onChange={(e) =>
                    setStep1Data({ ...step1Data, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={step1Data.password}
                  onChange={(e) =>
                    setStep1Data({ ...step1Data, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={step1Data.confirmPassword}
                  onChange={(e) =>
                    setStep1Data({
                      ...step1Data,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full pl-10 pr-12 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition flex items-center justify-center gap-2 mt-4"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </form>
        )}

        {/* Step 2: Player Profile */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={step2Data.fullName}
                  onChange={(e) =>
                    setStep2Data({ ...step2Data, fullName: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Nickname
              </label>
              <div className="relative">
                <Trophy className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={step2Data.nickname}
                  onChange={(e) =>
                    setStep2Data({ ...step2Data, nickname: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="ProGamer123"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Age
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="number"
                  min="16"
                  max="100"
                  value={step2Data.age}
                  onChange={(e) =>
                    setStep2Data({
                      ...step2Data,
                      age: parseInt(e.target.value),
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Country
              </label>
              <div className="relative">
                <Flag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  value={step2Data.country}
                  onChange={(e) =>
                    setStep2Data({ ...step2Data, country: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition appearance-none"
                  required
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Avatar URL (Optional)
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="url"
                  value={step2Data.avatar}
                  onChange={(e) =>
                    setStep2Data({ ...step2Data, avatar: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-[#0f1322] border border-purple-500/20 text-white py-3 rounded-xl font-medium hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition flex items-center justify-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Games */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Main Game <span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select
                  value={step3Data.mainGame.game}
                  onChange={(e) =>
                    setStep3Data({
                      ...step3Data,
                      mainGame: { ...step3Data.mainGame, game: e.target.value },
                    })
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition appearance-none"
                  required
                >
                  <option value="">Select main game</option>
                  {gameOptions.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">
                Player ID <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                value={step3Data.mainGame.playerId}
                onChange={(e) =>
                  setStep3Data({
                    ...step3Data,
                    mainGame: {
                      ...step3Data.mainGame,
                      playerId: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-3 bg-[#0a0e1a] border border-purple-500/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                placeholder="Your in-game ID"
                required
              />
            </div>

            {/* Additional Games */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Other Games
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddGame(!showAddGame)}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  + Add Game
                </button>
              </div>

              {showAddGame && (
                <div className="bg-[#0a0e1a] rounded-xl p-4 space-y-3 border border-purple-500/20">
                  <select
                    value={newGame.name}
                    onChange={(e) =>
                      setNewGame({ ...newGame, name: e.target.value })
                    }
                    className="w-full px-4 py-2 bg-[#0f1322] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="">Select game</option>
                    {gameOptions.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={newGame.playerId}
                    onChange={(e) =>
                      setNewGame({ ...newGame, playerId: e.target.value })
                    }
                    placeholder="Player ID"
                    className="w-full px-4 py-2 bg-[#0f1322] border border-purple-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleAddGame}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-500"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddGame(false)}
                      className="flex-1 bg-gray-600 text-white py-2 rounded-lg text-sm hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {step3Data.games.length > 0 && (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {step3Data.games.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-[#0a0e1a] rounded-lg p-3 border border-purple-500/20"
                    >
                      <div>
                        <p className="text-white text-sm font-medium">
                          {game.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          ID: {game.playerId}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveGame(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-[#0f1322] border border-purple-500/20 text-white py-3 rounded-xl font-medium hover:bg-white/5 transition flex items-center justify-center gap-2"
              >
                <ChevronLeft className="w-5 h-5" /> Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-medium hover:from-purple-500 hover:to-pink-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Complete Registration
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Switch to login */}
      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-purple-400 hover:text-purple-300 font-medium transition"
        >
          Sign In
        </button>
      </p>
    </div>
  );
}
