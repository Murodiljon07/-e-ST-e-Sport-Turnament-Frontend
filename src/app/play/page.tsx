import PlayPage from "@/components/layout/PlayPage";
import { playData } from "@/lib/mock-data";

export const metadata = {
  title: "Play — HALDRYX ",
  description: "O'yinchi profili, statistika va live matchlar.",
};

export default function Play() {
  return (
    <main>
      <PlayPage data={playData} />
    </main>
  );
}
