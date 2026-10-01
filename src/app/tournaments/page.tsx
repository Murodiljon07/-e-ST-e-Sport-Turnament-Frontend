"use client";

import TournamentsScreen from "@/components/ui/TurnamentScreen";
import { tournamentsData } from "@/lib/mock-data";

export default function Tournaments() {
  return (
    <>
      <TournamentsScreen data={tournamentsData} />
    </>
  );
}
