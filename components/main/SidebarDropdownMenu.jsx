"use client";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const SidebarDropdownMenu = ({ title, inventoryLinks, icon: Icon, setShowSidebar, isCollapsed, setIsCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isActive = inventoryLinks.some(link => pathname === link.href);

  const handleClick = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      // Wait for the sidebar to expand before opening the dropdown
      setTimeout(() => {
        setIsOpen(true);
      }, 300); // Match the transition duration
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={handleClick}
        className={`flex items-center space-x-2 p-2 rounded-md ${
          isActive ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
        }`}
      >
        <Icon className="w-4 h-4" />
        {!isCollapsed && (
          <>
            <span>{title}</span>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 ml-auto" />
            ) : (
              <ChevronRight className="w-4 h-4 ml-auto" />
            )}
          </>
        )}
      </button>
      {isOpen && !isCollapsed && (
        <div className="flex flex-col pl-4 mt-1">
          {inventoryLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              onClick={() => setShowSidebar?.(false)}
              className={`p-2 rounded-md text-sm border-l-2 my-0.5 ${
                pathname === link.href
                  ? "bg-blue-500/20 text-blue-300 border-blue-400"
                  : "hover:bg-slate-700/50 border-transparent"
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdownMenu;
