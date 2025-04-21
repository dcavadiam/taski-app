import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";

import Sidebar from "@/components/layout/Sidebar";
import { Toaster } from "sonner";
import StorageProvider from "@/components/providers/StorageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - Taski",
  description: "Dashboard de Taski, donde puedes ver tus proyectos y tareas pendientes de una manera organizada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-screen p-4`}
      >
        <StorageProvider>
          <Sidebar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </StorageProvider>
      </body>
    </html>
  );
}
