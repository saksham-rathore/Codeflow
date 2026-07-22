// import type { Metadata } from "next";
import "./globals.css";

import { JetBrains_Mono } from "next/font/google";
const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased font-mono ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-[#010101]">
        {children}
      </body>
    </html>
  );
}