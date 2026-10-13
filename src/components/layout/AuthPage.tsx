"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AuthGame, AuthTab, LoginForm, RegisterForm } from "@/lib/types";

interface AuthPageProps {
  games: AuthGame[];
}

const GOLD = "#a8835a";

export default function AuthPage({ games }: AuthPageProps) {
  const [tab, setTab] = useState<AuthTab>("login");

  // ===== LOGIN STATE =====
  const [login, setLogin] = useState<LoginForm>({
    email: "",
    password: "",
    remember: false,
  });
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // ===== REGISTER STATE =====
  const [register, setRegister] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    game: "",
    gameId: "",
    terms: false,
  });
  const [registerError, setRegisterError] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);

  // Parol ko'rsatish
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ===== LOGIN SUBMIT =====
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Validatsiya
    if (!login.email) {
      setLoginError("Email kiritilishi shart");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(login.email)) {
      setLoginError("Email formati noto'g'ri");
      return;
    }
    if (!login.password) {
      setLoginError("Parol kiritilishi shart");
      return;
    }
    if (login.password.length < 6) {
      setLoginError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }

    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoginLoading(false);

    // Demo xato — real loyihada API'ga yuboriladi
    setLoginError("Email yoki parol noto'g'ri");
  };

  // ===== REGISTER SUBMIT =====
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");

    // Validatsiya
    if (!register.email) {
      setRegisterError("Email kiritilishi shart");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(register.email)) {
      setRegisterError("Email formati noto'g'ri");
      return;
    }
    if (!register.nickname) {
      setRegisterError("Nickname kiritilishi shart");
      return;
    }
    if (register.nickname.length < 3) {
      setRegisterError("Nickname kamida 3 ta belgidan iborat bo'lishi kerak");
      return;
    }
    if (!register.game) {
      setRegisterError("O'yinni tanlang");
      return;
    }
    if (!register.gameId) {
      setRegisterError("Game ID kiritilishi shart");
      return;
    }
    if (!register.password) {
      setRegisterError("Parol kiritilishi shart");
      return;
    }
    if (register.password.length < 6) {
      setRegisterError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }
    if (register.password !== register.confirmPassword) {
      setRegisterError("Parollar mos kelmadi");
      return;
    }
    if (!register.terms) {
      setRegisterError("Shartlarga rozilik bildirishingiz kerak");
      return;
    }

    setRegisterLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setRegisterLoading(false);

    // Demo muvaffaqiyat
    alert("Profil muvaffaqiyatli yaratildi! (demo)");
  };

  // ===== TAB O'ZGARGANDA =====
  useEffect(() => {
    setLoginError("");
    setRegisterError("");
  }, [tab]);

  const selectedGame = games.find((g) => g.id === register.game);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16">
      {/* Ambient grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 80%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${GOLD}08 0%, transparent 60%)`,
        }}
      />

      <div className="relative w-full max-w-[520px]">
        {/* ===== SCREEN ===== */}
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
                  {tab === "login" ? "Sign In" : "Sign Up"}
                </span>
              </span>
              <span className="text-neutral-300">|</span>
              <span>SYS.Auth</span>
            </div>

            <div className="flex items-center gap-[3px] h-3">
              {[...Array(12)].map((_, i) => (
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
          </div>

          {/* ===== LOGO + SARLAVHA ===== */}
          <div className="px-6 sm:px-8 pt-8 pb-6 border-b border-neutral-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 mb-6 select-none group"
            >
              <span className="relative grid place-items-center w-8 h-8">
                <span
                  className="absolute inset-0 border-2 rounded-[6px] transition-transform duration-500"
                  style={{
                    borderColor: GOLD,
                    animation: "spin-tilt 10s linear infinite",
                  }}
                />
                <span
                  className="absolute inset-0 border-2 rounded-[6px]"
                  style={{
                    borderColor: "#d4b483",
                    animation: "spin-tilt-reverse 10s linear infinite",
                  }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-[1px]"
                  style={{
                    background: GOLD,
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }}
                />
              </span>
              <span className="font-mono text-[13px] font-semibold tracking-[0.18em] uppercase text-neutral-900">
                HALDRYX
              </span>
            </Link>

            <h1 className="text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.05] tracking-[-0.03em] font-semibold text-neutral-900">
              {tab === "login" ? (
                <>
                  Xush kelibsiz.
                  <br />
                  <span style={{ color: GOLD }}>Hisobingizga kiring.</span>
                </>
              ) : (
                <>
                  Yangi boshlanish.
                  <br />
                  <span style={{ color: GOLD }}>Profil yarating.</span>
                </>
              )}
            </h1>
          </div>

          {/* ===== TAB SWITCHER ===== */}
          <div className="flex border-b border-neutral-200">
            {(
              [
                { id: "login", label: "Kirish" },
                { id: "register", label: "Ro'yxatdan o'tish" },
              ] as const
            ).map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className="relative flex-1 h-12 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-300"
                  style={{
                    color: isActive ? "#171717" : "#737373",
                  }}
                >
                  {t.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[2px] rounded-t-full"
                      style={{ background: GOLD }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* ===== FORM ===== */}
          <div className="p-6 sm:p-8">
            {tab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <Field label="Email">
                  <input
                    type="email"
                    value={login.email}
                    onChange={(e) =>
                      setLogin({ ...login, email: e.target.value })
                    }
                    placeholder="siz@example.com"
                    autoComplete="email"
                    className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300"
                  />
                </Field>

                {/* Parol */}
                <Field label="Parol">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={login.password}
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="w-full h-11 px-4 pr-11 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="Parolni ko'rsatish"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </Field>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <span className="relative grid place-items-center w-4 h-4">
                      <input
                        type="checkbox"
                        checked={login.remember}
                        onChange={(e) =>
                          setLogin({ ...login, remember: e.target.checked })
                        }
                        className="peer sr-only"
                      />
                      <span className="absolute inset-0 rounded border border-neutral-300 peer-checked:border-[#a8835a] peer-checked:bg-[#a8835a] transition-colors" />
                      {login.remember && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className="relative text-white"
                        >
                          <path
                            d="M1.5 5l2 2 5-5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-[12px] text-neutral-600">
                      Eslab qolish
                    </span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-[12px] text-neutral-500 hover:text-[#a8835a] transition-colors"
                  >
                    Parolni tiklash
                  </Link>
                </div>

                {/* Xato */}
                {loginError && <ErrorBox message={loginError} />}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full h-11 rounded-lg bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {loginLoading ? (
                    <>
                      <span className="dot-wave inline-flex items-center gap-1">
                        <span />
                        <span />
                        <span />
                      </span>
                      Kirish...
                    </>
                  ) : (
                    <>
                      Kirish
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1 6h10M7 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="flex-1 h-[1px] bg-neutral-200" />
                  <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-400">
                    yoki
                  </span>
                  <span className="flex-1 h-[1px] bg-neutral-200" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-3 gap-2">
                  <SocialButton label="Google" icon={<GoogleIcon />} />
                  <SocialButton label="Steam" icon={<SteamIcon />} />
                  <SocialButton label="Discord" icon={<DiscordIcon />} />
                </div>

                {/* Register link */}
                <p className="text-center text-[12px] text-neutral-500 pt-2">
                  Hisobingiz yo'qmi?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("register")}
                    className="font-medium hover:text-[#a8835a] transition-colors"
                    style={{ color: GOLD }}
                  >
                    Ro'yxatdan o'ting
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Email */}
                <Field label="Email">
                  <input
                    type="email"
                    value={register.email}
                    onChange={(e) =>
                      setRegister({ ...register, email: e.target.value })
                    }
                    placeholder="siz@example.com"
                    autoComplete="email"
                    className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300"
                  />
                </Field>

                {/* Nickname */}
                <Field label="Nickname">
                  <input
                    type="text"
                    value={register.nickname}
                    onChange={(e) =>
                      setRegister({ ...register, nickname: e.target.value })
                    }
                    placeholder="kaze"
                    autoComplete="username"
                    className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300 font-mono"
                  />
                </Field>

                {/* Game selector — grid */}
                <Field label="O'yin">
                  <div className="grid grid-cols-4 gap-2">
                    {games.map((g) => {
                      const isSelected = register.game === g.id;
                      return (
                        <button
                          key={g.id}
                          type="button"
                          onClick={() =>
                            setRegister({
                              ...register,
                              game: g.id,
                              gameId: "",
                            })
                          }
                          aria-label={g.name}
                          className="relative aspect-square rounded-lg border transition-all duration-300 flex flex-col items-center justify-center gap-1"
                          style={{
                            borderColor: isSelected ? GOLD : "#e5e5e5",
                            background: isSelected ? `${GOLD}08` : "#fafafa",
                          }}
                        >
                          <span
                            className="text-[16px] transition-transform duration-300"
                            style={{
                              color: isSelected ? GOLD : "#737373",
                              transform: isSelected ? "scale(1.1)" : "scale(1)",
                            }}
                          >
                            {g.icon}
                          </span>
                          <span
                            className="font-mono text-[8px] tracking-[0.1em] uppercase"
                            style={{
                              color: isSelected ? GOLD : "#a3a3a3",
                            }}
                          >
                            {g.shortName}
                          </span>
                          {isSelected && (
                            <span
                              className="absolute top-1 right-1 w-1 h-1 rounded-full animate-pulse"
                              style={{ background: GOLD }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </Field>

                {/* Game ID — faqat o'yin tanlanganда */}
                {selectedGame && (
                  <Field
                    label={`${selectedGame.shortName} ID`}
                    hint={getGameIdHint(selectedGame.id)}
                  >
                    <input
                      type="text"
                      value={register.gameId}
                      onChange={(e) =>
                        setRegister({ ...register, gameId: e.target.value })
                      }
                      placeholder={getGameIdPlaceholder(selectedGame.id)}
                      className="w-full h-11 px-4 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300 font-mono"
                    />
                  </Field>
                )}

                {/* Parol */}
                <Field label="Parol">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={register.password}
                      onChange={(e) =>
                        setRegister({ ...register, password: e.target.value })
                      }
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full h-11 px-4 pr-11 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label="Parolni ko'rsatish"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </Field>

                {/* Confirm parol */}
                <Field label="Parolni tasdiqlash">
                  <div className="relative">
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={register.confirmPassword}
                      onChange={(e) =>
                        setRegister({
                          ...register,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full h-11 px-4 pr-11 rounded-lg bg-neutral-50 border border-neutral-200 text-[14px] text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-[#a8835a] focus:bg-white transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      aria-label="Parolni ko'rsatish"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors"
                    >
                      {showConfirm ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </Field>

                {/* Terms */}
                <label className="flex items-start gap-2 cursor-pointer select-none pt-1">
                  <span className="relative grid place-items-center w-4 h-4 mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={register.terms}
                      onChange={(e) =>
                        setRegister({ ...register, terms: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <span className="absolute inset-0 rounded border border-neutral-300 peer-checked:border-[#a8835a] peer-checked:bg-[#a8835a] transition-colors" />
                    {register.terms && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        className="relative text-white"
                      >
                        <path
                          d="M1.5 5l2 2 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className="text-[12px] text-neutral-600 leading-relaxed">
                    Men{" "}
                    <Link
                      href="/terms"
                      className="hover:text-[#a8835a] underline underline-offset-2 transition-colors"
                    >
                      foydalanish shartlari
                    </Link>{" "}
                    va{" "}
                    <Link
                      href="/privacy"
                      className="hover:text-[#a8835a] underline underline-offset-2 transition-colors"
                    >
                      maxfiylik siyosati
                    </Link>
                    ga rozilik bildiraman
                  </span>
                </label>

                {/* Xato */}
                {registerError && <ErrorBox message={registerError} />}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={registerLoading}
                  className="w-full h-11 rounded-lg bg-neutral-900 text-white text-[14px] font-medium hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {registerLoading ? (
                    <>
                      <span className="dot-wave inline-flex items-center gap-1">
                        <span />
                        <span />
                        <span />
                      </span>
                      Yaratilmoqda...
                    </>
                  ) : (
                    <>
                      Profil yaratish
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M1 6h10M7 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </>
                  )}
                </button>

                {/* Login link */}
                <p className="text-center text-[12px] text-neutral-500 pt-2">
                  Hisobingiz bormi?{" "}
                  <button
                    type="button"
                    onClick={() => setTab("login")}
                    className="font-medium hover:text-[#a8835a] transition-colors"
                    style={{ color: GOLD }}
                  >
                    Kiring
                  </button>
                </p>
              </form>
            )}
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-5 h-9 border-t border-neutral-200 bg-neutral-50/60 font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span className="flex items-center gap-2">
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                className="text-neutral-400"
              >
                <path
                  d="M5 1L1 3v3c0 2 1.5 3 4 3s4-1 4-3V3L5 1z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              SSL Secured
            </span>
            <span>v2.6.1</span>
          </div>
        </div>

        {/* Pastdagi soya */}
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

/* ============================================================
   Yordamchi komponentlar
   ============================================================ */

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          {label}
        </label>
        {hint && (
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-400">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div
      className="flex items-start gap-2 px-3 py-2.5 rounded-lg border"
      style={{
        background: "#fef2f2",
        borderColor: "#fecaca",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="text-red-500 shrink-0 mt-0.5"
      >
        <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M7 4v4M7 10h.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[12px] text-red-700 leading-snug">{message}</span>
    </div>
  );
}

function SocialButton({
  label,
  icon,
}: {
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex items-center justify-center h-10 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-[#a8835a]/50 transition-all duration-300 text-neutral-700 hover:text-neutral-900"
    >
      {icon}
    </button>
  );
}

/* ============================================================
   Icons
   ============================================================ */

function Eye() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function EyeOff() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 2l12 12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M6.5 6.5A2.5 2.5 0 008 11a2.5 2.5 0 002.5-2.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M1 8s2.5-5 7-5c1.2 0 2.3.3 3.2.7M15 8s-1 2-3 3.5M13 5c.7.7 1.3 1.5 2 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16">
      <path
        d="M15.5 8.2c0-.5 0-1-.1-1.5H8v2.8h4.2c-.2 1-.7 1.8-1.5 2.4v2h2.4c1.4-1.3 2.4-3.2 2.4-5.7z"
        fill="#4285F4"
      />
      <path
        d="M8 16c2.2 0 4-.7 5.4-2l-2.4-2c-.7.5-1.6.7-3 .7-2.3 0-4.2-1.5-4.9-3.6H.6v2.2C2 13.8 4.8 16 8 16z"
        fill="#34A853"
      />
      <path
        d="M3.1 9.1c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V3.5H.6C.2 4.5 0 5.7 0 7s.2 2.5.6 3.5l2.5-1.9z"
        fill="#FBBC05"
      />
      <path
        d="M8 3.2c1.2 0 2.3.4 3.2 1.3l2.4-2.4C12 1 10.2 0 8 0 4.8 0 2 2.2.6 5.4l2.5 1.9C3.8 5.2 5.7 3.2 8 3.2z"
        fill="#EA4335"
      />
    </svg>
  );
}

function SteamIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C4.3 0 1.3 2.8 1 6.4l3.7 1.5c.3-.2.7-.3 1.1-.3h.1l1.6-2.4v-.1c0-1.4 1.2-2.6 2.6-2.6S12.7 3.7 12.7 5.1s-1.2 2.6-2.6 2.6h-.1L7.6 9.3v.1c0 .4-.1.7-.2 1L1.1 12.6C2 14.6 4 16 6.3 16h3.4C13.5 16 16 13.5 16 9.7 16 4.4 12 0 8 0z" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.5 3.1a12 12 0 00-3-.9l-.1.2c1.1.3 1.6.7 2.2 1.2A11 11 0 008 2.8a11 11 0 00-4.6.8c.6-.5 1.1-.9 2.2-1.2l-.1-.2c-1.1.2-2.1.5-3 .9C1.2 5.3.6 7.4.7 9.5a12 12 0 003.6 1.8l.8-1.1c-.4-.2-.8-.4-1.2-.7l.3-.2a8.6 8.6 0 007.6 0l.3.2c-.4.3-.8.5-1.2.7l.8 1.1a12 12 0 003.6-1.8c.1-2.1-.5-4.2-1.8-6.4zM5.8 8.6c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4zm4.4 0c-.7 0-1.3-.6-1.3-1.4s.6-1.4 1.3-1.4 1.3.6 1.3 1.4-.6 1.4-1.3 1.4z" />
    </svg>
  );
}

/* ============================================================
   Game ID hints
   ============================================================ */

function getGameIdHint(gameId: string): string {
  const hints: Record<string, string> = {
    cs2: "Steam ID yoki profil linki",
    dota2: "Steam ID (32-bit)",
    valorant: "Riot ID (Nick#TAG)",
    lol: "Summoner Name",
    pubg: "PUBG Nickname",
    apex: "EA ID",
    r6: "Ubisoft Connect ID",
    overwatch: "Battle.net Tag",
  };
  return hints[gameId] ?? "In-game ID";
}

function getGameIdPlaceholder(gameId: string): string {
  const placeholders: Record<string, string> = {
    cs2: "STEAM_0:1:12345678",
    dota2: "123456789",
    valorant: "kaze#UZ1",
    lol: "kaze#1234",
    pubg: "kaze_uz",
    apex: "kaze_apex",
    r6: "kaze.r6",
    overwatch: "kaze#12345",
  };
  return placeholders[gameId] ?? "";
}
