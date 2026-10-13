import CompetitionsPage from "@/components/layout/CompetitionsPage";
import { competitionsData } from "@/lib/mock-data";

export const metadata = {
  title: "Musobaqalar — HALDRYX",
  description: "Turnirlar, ligalar va kuboklar — barchasi bir joyda.",
};

export default function Competitions() {
  return (
    <main>
      <CompetitionsPage data={competitionsData} />
    </main>
  );
}
