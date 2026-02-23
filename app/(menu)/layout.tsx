"use client";

import BottomNavbar from "@/components/layout/BottomNavbar";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  console.log(pathname);

  const hideNavbar = pathname.startsWith("/milestones/");

  return (
    <div>
      {children}
      {!hideNavbar && <BottomNavbar />}
    </div>
  );
}
