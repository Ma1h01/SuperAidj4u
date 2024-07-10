"use client";
import React from "react";
import { Shirt } from "lucide-react";
import Link from "next/link";
const OptionCard = ({
  title,
  href,
  description,
  linkText,
  isEnabled,
  icon,
}) => {
  const Icon = icon;
  return (
    <div className="shadow-md bg-white flex flex-col items-center justify-center gap-4 p-6 rounded-md">
      <h2 className="font-semibold">{title}</h2>
      <div>
        <Icon strokeWidth="0.5" className="w-32 h-32" />
      </div>
      <p className="line-clamp-1 text-sm">{description}</p>
      {isEnabled ? (
        <Link
          href={href}
          className="rounded bg-blue-500 items-center px-3 py-2 space-x-2 text-white inline-flex"
        >
          {linkText}
        </Link>
      ) : (
        <button className="rounded bg-blue-500 items-center px-3 py-2 space-x-2 text-white inline-flex">
          Enable
        </button>
      )}
    </div>
  );
};

export default OptionCard;
