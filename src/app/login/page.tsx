import AuthPage from "@/components/layout/AuthPage";
import { authGames } from "@/lib/mock-data";

export const metadata = {
  title: "Kirish — HALDRYX",
  description: "Hisobingizga kiring yoki yangi profil yarating.",
};

export default function Login() {
  return (
    <main>
      <AuthPage games={authGames} />
    </main>
  );
}
