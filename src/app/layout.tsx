import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/navigation/NavigationBar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/shadcn/toaster";

const inter = Inter({ subsets: ["latin"] });

const title = "Delfino Games";

export const metadata: Metadata = {
  applicationName: title,
  title: title,
  description: "Dorset Software Boardgame Inventory Management",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={inter.className}>
          <NavigationBar></NavigationBar>
          <main className="flex min-h-full flex-col items-center justify-between z-0">
            {children}
          </main>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
