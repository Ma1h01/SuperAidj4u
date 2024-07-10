import { Check, CheckCircle2 } from "lucide-react";
import React from "react";
import SalesActivityCard from "./SalesActivityCard";
import InventorySummaryCard from "./InventorySummaryCard";

const SalesOverview = () => {
  const salesActivity = [
    {
      title: "To be Packed",
      number: 10,
      unit: "Qty",
      href: "/",
      color: "text-blue-600",
    },
    {
      title: "To be Shipped",
      number: 0,
      unit: "Pkgs",
      href: "/",
      color: "text-red-600",
    },
    {
      title: "To be Delivered",
      number: 0,
      unit: "Pkgs",
      href: "/",
      color: "text-green-600",
    },
    {
      title: "To be Invoiced",
      number: 0,
      unit: "Qty",
      href: "/",
      color: "text-orange-600",
    },
  ];
  const inventorySummary = [
    {
      title: "Quantity in Hand",
      number: 10,
    },
    {
      title: "Quantity to be received",
      number: 0,
    },
  ];
  return (
    <div className=" bg-blue-100 border-b border-slate-300 grid grid-cols-12 gap-4">
      {/* Sales Activity */}
      <div className="col-span-8 border-r border-slate-300 p-8">
        <h2 className="mb-6 text-xl">Sales Activity</h2>
        <div className="grid grid-cols-4 gap-4 pr-8">
          {/* Card */}
          {salesActivity.map((activity, i) => (
            <SalesActivityCard key={i} {...activity} />
          ))}
        </div>
      </div>
      {/* Inventory Summary */}
      <div className="col-span-4 p-8">
        <h2 className="mb-6 text-xl">Inventory Summary</h2>
        <div>
          {inventorySummary.map((summary, i) => (
            <InventorySummaryCard key={i} {...summary} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
