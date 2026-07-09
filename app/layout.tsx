import type { Metadata } from "next";
import { Auth } from "better-auth";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/app/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-mono", jetbrainsMono.variable)}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
