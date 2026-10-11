import HomeScreen from "@/components/screens/HomeScreen";
import { homeData } from "@/lib/mock-data";
import type { HomeData } from "@/lib/types";

async function getHomeData(): Promise<HomeData> {
  // Variant A: mock-data to'g'ridan-to'g'ri
  return homeData;

  // Variant B: API orqali
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  // const res = await fetch(`${baseUrl}/api/home`, { cache: "no-store" });
  // if (!res.ok) return homeData;
  // return res.json();
}

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <main>
      <HomeScreen data={data} />
    </main>
  );
}
