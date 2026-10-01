"use client";

import TeamsScreen from "@/components/ui/TeamScreen";
import { teamsData } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <TeamsScreen data={teamsData} />
    </>
  );
}
