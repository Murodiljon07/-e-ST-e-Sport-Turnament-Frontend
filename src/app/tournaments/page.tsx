import TournamentsScreen from "@/components/ui/TurnamentScreen";
import { tournamentsData } from "@/lib/mock-data";
import type { TournamentsData } from "@/lib/types";

async function getTournamentsData(): Promise<TournamentsData> {
  // Variant A: mock-data to'g'ridan-to'g'ri
  return tournamentsData;

  // Variant B: API orqali
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  // const res = await fetch(`${baseUrl}/api/tournaments`, { cache: "no-store" });
  // if (!res.ok) return tournamentsData;
  // return res.json();
}

export default async function TournamentsPage() {
  const data = await getTournamentsData();

  return (
    <main>
      <TournamentsScreen data={data} />
    </main>
  );
}
