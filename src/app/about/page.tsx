import AboutPage from "@/components/layout/AboutPage";
import { aboutData } from "@/lib/mock-data";

export const metadata = {
  title: "Biz haqimizda — CyberArena",
  description:
    "CyberArena — O'zbekistondagi birinchi va eng yirik e-sport platformasi.",
};

export default function About() {
  return (
    <main>
      <AboutPage data={aboutData} />
    </main>
  );
}
