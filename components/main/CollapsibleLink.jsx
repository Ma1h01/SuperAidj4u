import React from "react";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
const CollapsibleLink = ({ title, href }) => {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded pl-8 pr-4 py-2 hover:bg-slate-900 transition-all duration-300 space-x-3"
    >
      <span className="text-sm">{title}</span>
      <PlusCircle className="w-4 h-4" />
    </Link>
  );
};

export default CollapsibleLink;
