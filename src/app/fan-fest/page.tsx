import FanFestPage from "@/components/layout/FanFestPage";
import { fanFestData } from "@/lib/mock-data";

export const metadata = {
  title: "Fan Fest 2026 — CyberArena",
  description:
    "Muxlislar bayrami: yulduzlar, shoular, sovrinli o'yinlar va esda qolarli lahzalar.",
};

export default function FanFest() {
  return (
    <main>
      <FanFestPage data={fanFestData} />
    </main>
  );
}
