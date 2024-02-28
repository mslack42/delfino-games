import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/navigation/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delfino Games",
  description: "Dorset Software Boardgame Inventory Management"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavigationBar></NavigationBar>
        <main className="flex min-h-full flex-col items-center justify-between z-0">
        {children}
        </main>
        </body>
    </html>
  );
}
