import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Umi Ai's Bakery - Fresh Homemade Baked Goods",
  description: "Family home bakery offering fresh breads, cakes, and pastries with delivery and pickup options",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-cream font-sans antialiased">{children}</body>
    </html>
  );
}
