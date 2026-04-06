import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { TaskProvider } from "@/context/TaskContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Architect Desk | Smart Task Manager",
  description: "A professional-grade task management system driven by a weighted priority engine. High-performance, local-first, and fully configurable.",
  keywords: ["task manager", "priority engine", "productivity", "architect desk", "weighted priority", "nextjs"],
  authors: [{ name: "Architect Desk Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} font-manrope antialiased`}>
        <SettingsProvider>
          <TaskProvider>
            {children}
          </TaskProvider>
        </SettingsProvider>
      </body>
    </html>
  );
}
