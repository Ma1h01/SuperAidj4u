"use client";
import { useEffect, useState } from "react";
import { useUserMeta } from "@/lib/context/UserMetaContext";
import { mockWarehouses, getWarehouseAdjustments } from "@/lib/mockData";
import WarehouseTable from "@/components/main/inventory/items/WarehouseTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import FixedHeader from "@/components/main/inventory/FixedHeader";

export default function Inventory() {
  const { warehouses } = useUserMeta();
  const [layout, setLayout] = useState("single");
  console.log("Inventory page - warehouses from context:", warehouses);

  // Use mock warehouses instead of context for now
  const displayWarehouses = mockWarehouses;
  console.log("Inventory page - using mock warehouses:", displayWarehouses);

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  if (!displayWarehouses) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-slate-900">No Warehouses Found</h1>
          <p className="text-slate-600">Create your first warehouse to get started.</p>
          <Link href="/inventory/warehouses/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Warehouse
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <FixedHeader onLayoutChange={handleLayoutChange} />
      <div className="p-6">
        <div className={`space-y-6 ${layout === "double" ? "grid grid-cols-2 gap-6" : ""}`}>
          {displayWarehouses.map((warehouse) => {
            console.log(`Processing warehouse ${warehouse.id}:`, warehouse);
            const adjustments = getWarehouseAdjustments(warehouse.id);
            console.log(`Got adjustments for warehouse ${warehouse.id}:`, adjustments);
            
            return (
              <WarehouseTable
                key={warehouse.id}
                warehouse={warehouse}
                adjustments={adjustments}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
