import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "RHEMA 2026 - Séminaire National HEEAM | Inscription",
  description: "Inscription au Séminaire National RHEMA 2026 organisé par HEEAM. Rejoignez-nous du 15 au 17 Mai 2026 à Casablanca pour grandir ensemble dans la Parole et l'Esprit.",
  keywords: ["RHEMA", "HEEAM", "séminaire", "Casablanca", "Maroc", "2026", "inscription", "église évangélique"],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
