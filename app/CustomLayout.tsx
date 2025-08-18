"use client";
import React from "react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { usePathname } from "next/navigation";

const hiddenRoutes = {
  nav: ["/login", "/signup"],
  footer: ["/login", "/signup"],
};

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideNav = hiddenRoutes.nav.some((route) => pathname.startsWith(route));
  const hideFooter = hiddenRoutes.footer.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {!hideNav && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}

export default LayoutWrapper;
