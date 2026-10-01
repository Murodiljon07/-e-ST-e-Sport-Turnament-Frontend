"use client";

import HeroScreen from "@/components/ui/HeroScreen";

import { heroData } from "@/lib/mock-data";

export default function Home() {
  return (
    <>
      <HeroScreen data={heroData} />
    </>
  );
}
