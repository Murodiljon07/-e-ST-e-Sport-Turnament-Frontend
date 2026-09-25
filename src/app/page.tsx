import NavBar from "@/components/layout/NavBar";
import HeroScreen from "@/components/ui/HeroScreen";
import { SoundWaveLine } from "@/components/ui/SoundEffect";
import { heroData } from "@/lib/mock-data";

export default function Home() {
  return (
    <header>
      <HeroScreen data={heroData} />
    </header>
  );
}
