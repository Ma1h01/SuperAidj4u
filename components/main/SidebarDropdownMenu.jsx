"use client";
import { React, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import CollapsibleLink from "./CollapsibleLink";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
const SidebarDropdownMenu = ({
  title,
  inventoryLinks,
  icon,
  setShowSidebar,
}) => {
  const [open, setOpen] = useState(false);
  const Icon = icon;
  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex justify-between items-center w-full">
        <div className="flex items-center space-x-2 p-2">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
        {open ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        {inventoryLinks.map((link, i) => (
          <CollapsibleLink
            key={i}
            title={link.title}
            href={link.href}
            setShowSidebar={setShowSidebar}
          />
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default SidebarDropdownMenu;
