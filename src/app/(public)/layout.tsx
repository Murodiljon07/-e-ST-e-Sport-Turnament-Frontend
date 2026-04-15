import type { Metadata } from "next";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "EST • Ultimate Esports Tournament",
  description: "O'zbekistondagi eng yirik kiber sport turnirlari platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col ">
      <header>
        <NavBar />
      </header>

      <main className="grow ">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
