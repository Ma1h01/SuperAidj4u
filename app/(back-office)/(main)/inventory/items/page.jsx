"use client";
import FixedHeader from "@/components/main/inventory/FixedHeader";
import {
  LayoutPanelTop,
  PackagePlus,
  Scale,
  Truck,
  Warehouse,
  Wallpaper,
} from "lucide-react";
import React from "react";
import OptionCard from "@/components/main/inventory/items/OptionCard";
const Items = () => {
  const optionCards = [
    {
      title: "Items",
      href: "/inventory/items/new",
      description: "Create standalone items and services that you buy and sell",
      linkText: "New Item",
      isEnabled: true,
      icon: PackagePlus,
    },
    {
      title: "Categories",
      href: "/inventory/categories/new",
      description: "Bundle different items together and sell them as kits",
      linkText: "New Category",
      isEnabled: true,
      icon: LayoutPanelTop,
    },
    {
      title: "Units",
      href: "/inventory/units/new",
      description:
        "Create multiple variants of the same item using Item Groups",
      linkText: "New Unit",
      isEnabled: true,
      icon: Scale,
    },
    {
      title: "Brands",
      href: "/inventory/brands/new",
      description:
        "Tweak your item prices for specific contacts or transactions",
      linkText: "New Brand",
      isEnabled: true,
      icon: Wallpaper,
    },
    {
      title: "Warehouses",
      href: "/inventory/warehouses/new",
      description:
        "Tweak your item prices for specific contacts or transactions",
      linkText: "New Warehouse",
      isEnabled: true,
      icon: Warehouse,
    },
    {
      title: "Inventory Adjustments",
      href: "/inventory/adjustments/new",
      description: "Transfer items to the Main warehouse or other branches",
      linkText: "New Transfer",
      isEnabled: true,
      icon: Truck,
    },
  ];
  return (
    <div>
      <FixedHeader newLink="/inventory/items/new" />
      <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 m-6 py-6 px-16 gap-6">
        {optionCards.map((optionCard, index) => (
          <OptionCard key={index} {...optionCard} />
        ))}
      </div>
    </div>
  );
};

export default Items;
