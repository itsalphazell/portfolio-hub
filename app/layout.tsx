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
  title: "Thomas | UI, UX & Product Engineering Portfolio",
  description:
    "Design-led portfolio for websites, product surfaces, and digital systems built end-to-end.",
  openGraph: {
    title: "Thomas | UI, UX & Product Engineering Portfolio",
    description:
      "A design-led portfolio built to sell websites, product surfaces, and digital systems delivered end-to-end.",
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
