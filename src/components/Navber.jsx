
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitlog } from "@/context/fitlogContext";

export default function NavBar() {
  const pathname = usePathname();
  const { plan, saved, ready } = useFitlog();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navItems = [
    { label: "Workouts", href: "/workouts" },
    { label: "My Plan", href: "/myPlan" },
  ];

  return (
    <header className="sticky top-0 z-50 grid min-h-14 w-full grid-cols-[1fr_auto_1fr] items-center gap-2 border-b border-[#202027] bg-[#0c0c10] px-3 sm:px-5">
      {/* Logo */}
      <Link href="/" className="flex w-fit items-center gap-2">
        <span className="text-lg font-black text-[#b7ff00]">⚡</span>
        <span className="text-sm font-black tracking-wide text-white">
          FITLOG
        </span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center justify-center gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-[10px] font-medium transition-colors sm:px-4 sm:text-[11px] ${
              isActive(item.href)
                ? "bg-[#1b2410] text-[#b7ff00]"
                : "text-zinc-400 hover:bg-[#19191f] hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Counters */}
      <div className="flex items-center justify-end gap-3 sm:gap-5">
        <Link
          href="/myPlan"
          className="flex items-center gap-2 text-[10px] text-zinc-400 sm:text-[11px]"
        >
          Plan
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#b7ff00] text-[9px] font-bold text-black">
            {ready ? plan.length : 0}
          </span>
        </Link>

        <Link
          href="/saved"
          className="flex items-center gap-2 text-[10px] text-zinc-400 sm:text-[11px]"
        >
          Saved
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[#292930] text-[9px] text-zinc-300">
            {ready ? saved.length : 0}
          </span>
        </Link>
      </div>
    </header>
  );
}