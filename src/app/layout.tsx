import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ILP Performance Report 2026 | Instituto Luciane Prado",
  description: "Dashboard de Performance de Marketing - Instituto Luciane Prado. Análise de tráfego pago, orgânico e fechamentos do período Set-Dez 2025.",
  keywords: ["marketing", "performance", "dermatologia", "estética", "ILP", "Instituto Luciane Prado"],
  authors: [{ name: "ALMA Marketing" }],
  openGraph: {
    title: "ILP Performance Report 2026",
    description: "Dashboard de Performance de Marketing - Instituto Luciane Prado",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
