import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <head>
        {/* Reveal animations start at opacity 0; without JS they must not stay there. */}
        <noscript>
          <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      {/* Browser extensions (ColorZilla, Grammarly, password managers) inject
          attributes into <body> before React hydrates. Scoped to this element's
          own attributes — children are still hydration-checked. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
