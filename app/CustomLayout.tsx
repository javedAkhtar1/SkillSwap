"use client";
import React, { Suspense, useState } from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const hiddenRoutes = {
  nav: ["/login", "/signup", "/verify-email"],
  footer: ["/login", "/signup", "/profile", "/verify-email"],
};

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [queryClient] = useState(() => new QueryClient());

  const hideNav = hiddenRoutes.nav.some((route) => pathname.startsWith(route));
  const hideFooter = hiddenRoutes.footer.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      <SessionProvider>
        <Toaster />
        <QueryClientProvider client={queryClient}>
          <Suspense
            fallback={
              <main className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-3xl space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-12 w-1/2" />
                </div>
              </main>
            }
          >
            {!hideNav && <Navbar />}
            <main className="min-h-screen">{children}</main>
            {!hideFooter && <Footer />}
          </Suspense>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default LayoutWrapper;
