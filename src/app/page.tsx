import NavBar from "@/components/layout/NavBar";
import HeroScreen from "@/components/ui/HeroScreen";
import { SoundWaveLine } from "@/components/ui/SoundEffect";
import TeamsScreen from "@/components/ui/TeamScreen";
import TournamentsScreen from "@/components/ui/TurnamentScreen";
import { heroData, tournamentsData, teamsData } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <HeroScreen data={heroData} />
      <TournamentsScreen data={tournamentsData} />
      <TeamsScreen data={teamsData} />
    </>
  );
}
