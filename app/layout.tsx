import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/app/theme-provider";
import { Topbar } from "@/components/app/topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokéRiddle",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <ClerkProvider>
            <Topbar />
            <main className="w-full p-8 pt-24">{children}</main>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
