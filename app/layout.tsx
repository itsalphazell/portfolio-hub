import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Thomas | Premium Front-End Portfolio",
  description:
    "Premium front-end portfolio focused on conversion-led landing pages, product UI, and motion-rich case studies.",
  openGraph: {
    title: "Thomas | Premium Front-End Portfolio",
    description:
      "A front-end portfolio built to sell premium marketing UI, product surfaces, and design-led rebuilds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${spaceGrotesk.variable} antialiased`}>{children}</body>
    </html>
  );
}
