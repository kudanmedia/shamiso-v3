import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shamiso | The Sovereign Distributor: Afro House, 3-Step & Funding",
  description:
    "Distribute Lekompo, Maskandi & Afro House to 450+ stores. Save 30% on US Tax. Get funded up to $5M. Sell direct on EVEN. Join Africa's Sovereign Distributor.",
  keywords: [
    "music distribution",
    "Afro House",
    "Lekompo",
    "Maskandi",
    "3-Step",
    "African music",
    "music funding",
    "independent artist",
    "music distribution Africa",
  ],
  openGraph: {
    title: "Shamiso | The Sovereign Distributor: Afro House, 3-Step & Funding",
    description:
      "Distribute Lekompo, Maskandi & Afro House to 450+ stores. Save 30% on US Tax. Get funded up to $5M.",
    type: "website",
    siteName: "Shamiso Music Distribution",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shamiso | The Sovereign Distributor",
    description:
      "Distribute Lekompo, Maskandi & Afro House to 450+ stores. Save 30% on US Tax.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased font-sans`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
