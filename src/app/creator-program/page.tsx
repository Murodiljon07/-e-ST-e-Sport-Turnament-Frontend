import CreatorProgramPage from "@/components/layout/CreatorProgramPage";
import { creatorProgramData } from "@/lib/mock-data";

export const metadata = {
  title: "Creator Program — CyberArena",
  description:
    "O'yin kontent yaratuvchilar uchun maxsus dastur. Daromad, imtiyozlar va global hamjamiyat.",
};

export default function CreatorProgram() {
  return (
    <main>
      <CreatorProgramPage data={creatorProgramData} />
    </main>
  );
}
