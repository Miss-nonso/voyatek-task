// components/Sidebar.tsx

"use client";

import {
  Plane,
  Hotel,
  Mountain,
  GraduationCap,
  FileText,
  BookAlertIcon,
  Hospital,
  PackageSearch,
  ChevronDown
  //   Search
} from "lucide-react";

// import Image from "next/image";
// Utility function for conditional classes
import { cn } from "lib/utils";
import Link from "next/link";

const navItems = [
  { label: "Activities", icon: Mountain, href: "/activities" },
  { label: "Hotels", icon: Hotel, href: "/hotels" },
  { label: "Flights", icon: Plane, href: "/flights" },
  { label: "Study", icon: GraduationCap, href: "/study" },
  { label: "Visa", icon: FileText, href: "/visa" },
  { label: "Immigration", icon: BookAlertIcon, href: "/immigration" },
  { label: "Medical", icon: Hospital, href: "/medical" },
  { label: "Vacation Packages", icon: PackageSearch, href: "/packages" }
];

interface SidebarProps {
  active?: string;
}

export default function Sidebar({ active = "Activities" }: SidebarProps) {
  return (
    <div className="fixed top-0 left-0 h-screen bg-white z-50 pt-4 w-64">
      {/* Logo + Search */}
      {/* <div className="flex items-center gap-3 px-4 py-4 bg-white border-b border-gray-200">
        <Image src="/logo.svg" alt="Go Logo" width={30} height={30} />
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-9 pr-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div> */}

      {/* Nav */}
      <nav className="flex flex-col gap-3 px-4 py-6 mt-16 bg-[#f7f9fc]">
        {navItems.map(({ label, icon: Icon, href }) => (
          <Link
            href={href}
            key={label}
            className={cn(
              "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors hover:bg-blue-50",
              active === label
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-700"
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto px-4 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-sm rounded-md font-medium">
            Go
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-700">
            Personal Account
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
