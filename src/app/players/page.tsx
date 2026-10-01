"use client";

import PlayersScreen from "@/components/ui/PlayerScreen";
import { playersData } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <PlayersScreen data={playersData} />
    </>
  );
}
