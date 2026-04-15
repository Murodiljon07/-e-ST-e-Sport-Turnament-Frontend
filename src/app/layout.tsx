"use client";

import "./global.css";

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="eng">
      <head></head>
      <body>{children}</body>
    </html>
  );
}
