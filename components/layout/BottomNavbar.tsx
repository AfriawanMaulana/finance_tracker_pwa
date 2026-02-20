"use client";
import { ChartNoAxesColumn, Circle, Home, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", path: "/", icon: Home },
  { name: "milestone", path: "/milestones", icon: Circle },
  { name: "Add", path: "/add", icon: Plus },
  { name: "Stats", path: "/stats", icon: ChartNoAxesColumn },
  { name: "Profile", path: "/profile", icon: User },
];

export default function BottomNavbar() {
  const currentPath = usePathname();

  return (
    <div className="fixed bottom-0 bg-background left-0 right-0 shadow-primary shadow-md rounded-t-2xl p-2 flex justify-around">
      {navigation.map((item) =>
        item.name !== "Add" ? (
          <Link href={item.path} key={item.name} className="p-3">
            <item.icon
              className={
                currentPath === item.path ? "text-primary" : "text-slate-600"
              }
            />
          </Link>
        ) : (
          <Link href={item.path} key={item.name} className="p-3">
            <item.icon className="w-12 h-12 absolute left-1/2 -translate-x-1/2 -top-6 bg-primary text-primary-foreground rounded-xl p-2" />
          </Link>
        )
      )}
    </div>
  );
}
