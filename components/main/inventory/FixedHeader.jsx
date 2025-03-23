"use client";
import { Grid, List, Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const FixedHeader = ({ onLayoutChange }) => {
  const [layout, setLayout] = useState("single"); // "single" or "double"

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  return (
    <div className="flex items-center justify-between bg-white border-b border-slate-200 py-6 px-8 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
        All Recent Adjustments
      </h1>
      <div className="flex items-center gap-4">
        {/* Layout Toggle */}
        <div className="flex rounded-lg overflow-hidden bg-slate-100">
          <button
            onClick={() => handleLayoutChange("single")}
            className={`p-2 transition-colors ${
              layout === "single"
                ? "bg-blue-500 text-white"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleLayoutChange("double")}
            className={`p-2 transition-colors ${
              layout === "double"
                ? "bg-blue-500 text-white"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>
        {/* New Warehouse Button */}
        <Link
          href="/inventory/warehouses/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>New Warehouse</span>
        </Link>
      </div>
    </div>
  );
};

export default FixedHeader;
