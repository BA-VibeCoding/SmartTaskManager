import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { TaskProvider } from "@/context/TaskContext";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Architect Desk - Smart Task Manager",
  description: "A smart, configurable task manager with weighted priority.",
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
