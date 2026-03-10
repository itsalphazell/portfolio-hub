import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk, Syncopate } from "next/font/google";
import { LocaleProvider } from "@/components/locale-provider";
import type { ReactNode } from "react";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thomas | UI, UX & Product Engineering Portfolio / Portfolio UI, UX et ingenierie produit",
  description:
    "Design-led portfolio for websites, product surfaces, and digital systems built end-to-end, available in English and French.",
  openGraph: {
    title: "Thomas | UI, UX & Product Engineering Portfolio",
    description:
      "A design-led portfolio built to sell websites, product surfaces, and digital systems delivered end-to-end, available in English and French.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      className={`${playfair.variable} ${spaceGrotesk.variable} ${syncopate.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
