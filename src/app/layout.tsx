import { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Sport Tournament",
  description: "E-Sport Tournament",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body>{children}</body>
    </html>
  );
}
