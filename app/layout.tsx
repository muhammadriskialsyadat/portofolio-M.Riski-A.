import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ── Viewport ──────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

// ── Metadata ──────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL("https://riskialsyadat.vercel.app"),
  title: {
    default: "Muhammad Riski Alsyadat Portofolio",
    template: "%s | Muhammad Riski Alsyadat",
  },
  description:
    "Portfolio Muhammad Riski Alsyadat — Fresh Graduate Sistem Informasi Universitas Gunadarma. Memiliki pengalaman magang Back End Developer (.NET Core Web API) dan proyek fullstack (Laravel 12, Filament). Sedang mencari kesempatan pertama untuk belajar dan berkembang.",
  keywords: [
    "Muhammad Riski Alsyadat",
    "Full Stack Developer",
    "Back End Developer",
    "Laravel Developer",
    ".NET Core Developer",
    "Web Developer Indonesia",
    "Filament Admin Panel",
    "Portfolio Developer",
    "Fresh Graduate IT",
    "Depok",
    "Indonesia",
  ],
  authors: [{ name: "Muhammad Riski Alsyadat", url: "https://riskialsyadat.vercel.app" }],
  creator: "Muhammad Riski Alsyadat",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://riskialsyadat.vercel.app",
    siteName: "Muhammad Riski Alsyadat Portfolio",
    title: "Muhammad Riski Alsyadat Portofolio",
    description:
      "Fresh Graduate dengan pengalaman Back End & Full Stack Development. Keahlian: .NET Core Web API, Laravel 12, Filament, Spatie Permissions.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Muhammad Riski Alsyadat Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Riski Alsyadat Portofolio",
    description:
      "Fresh Graduate dengan pengalaman Back End & Full Stack Development.",
    images: ["/assets/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body className="antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
