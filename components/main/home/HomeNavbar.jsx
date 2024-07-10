"use client";
import { Building2 } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeNavbar = () => {
    const pathName = usePathname();   
    
  const navLinks = [
    {
      title: "Dashboard",
      href: "/home/dashboard",
    },
    {
      title: "Getting Started",
      href: "/home/getting-started",
    },
    {
      title: "Recent Updates",
      href: "/home/updates",
    },
    {
      title: "Announcements",
      href: "/home/announcements",
    },
  ];
  return (
    <div className="h-32 p-5 bg-blue-50 border-b border-slate-300">
      <div className="flex space-x-3">
        <div className="flex w-12 h-12 bg-white rounded-lg items-center justify-center">
          <Building2 />
        </div>
        <div className="flex flex-col">
          <p className=" font-semibold"> Hello, Developer</p>
          <span className="text-sm">Yihao</span>
        </div>
      </div>
      <nav className="sticky mt-6 space-x-4">
        {navLinks.map((item, index) => {
          return (
            <Link
              key={index}
              href={item.href}
              className={`${pathName === item.href ? "py-3 border-b-2 border-blue-600" : "py-3"}`}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default HomeNavbar;
