"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { dark } from "@clerk/themes";
import { Providers } from "@/components/providers";
import { usePathname } from "next/navigation";

import {
  Authenticated,
  Unauthenticated,
  ConvexReactClient,
  AuthLoading,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { UnauthenticatedView } from "../../features/auth/components/unauthenticated-view";
import { AuthLoadingView } from "../../features/auth/components/auth-loading-view";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  // const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");
  const isAuthPage = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up") || pathname === "/home" || pathname?.startsWith("/home/");

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider
          appearance={{
            theme: dark,
          }}
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {isAuthPage ? (
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Providers>
                  {children}
                </Providers>
              </ThemeProvider>
            ) : (
              <>
                <Authenticated>
                  <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                  >
                    <Providers>
                      {children}
                    </Providers>
                  </ThemeProvider>
                </Authenticated>
                <Unauthenticated>
                  <UnauthenticatedView />
                </Unauthenticated>
                <AuthLoading>
                  <AuthLoadingView />
                </AuthLoading>
              </>
            )}
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </body>
    </html>
  );
}