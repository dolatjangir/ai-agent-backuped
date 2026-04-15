"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header/header";
import WhiteHeader from "@/components/whiteHeader/Whiteheader";

export default function HeaderSwitcher() {
  const pathname = usePathname();

  const lightHeaderRoutes = [
    "/resources/help-center",
    "/resources/contact-support",
    "/resources/community",
    "/pricing/cloud-vs-on-prem",
  ];

  const isLightHeader = lightHeaderRoutes.some(route =>
    pathname.startsWith(route)
  );

  return isLightHeader ? <WhiteHeader /> : <Header />;
}
