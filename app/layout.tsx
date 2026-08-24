import type { Metadata } from "next";
import Oneko from "@/components/Oneko";
import { site } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="catppuccin-macchiato" className="bg-base-300">
      <body className="antialiased" suppressHydrationWarning>
        <div className="bgeffect" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        {children}
        <Oneko />
      </body>
    </html>
  );
}
