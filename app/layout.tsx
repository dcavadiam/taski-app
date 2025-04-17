import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taski",
  description: "Taski es una aplicación de gestión de tareas que te ayuda a completar tus objetivos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen`}
      >
        <Sidebar />
        <main className="flex-1">
          <header className="p-4">
            {/* TODO: Add search bar */}
            {/* TODO: Add notifications button */}
            {/* TODO: Add user menu */}
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
