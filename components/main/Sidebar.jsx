"use client";
import {
  BarChart4,
  Cable,
  ChevronLeft,
  FileText,
  Home,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { React } from "react";
import SubscriptionReminder from "./SubscriptionReminder";
import SidebarDropdownMenu from "./SidebarDropdownMenu";

const Sidebar = () => {
  const inventoryLinks = [
    {
      title: "Items",
      href: "/inventory/items",
    },
    {
      title: "Categories",
      href: "/inventory/categories/new",
    },
    {
      title: "Brands",
      href: "/inventory/brands/new",
    },
    {
      title: "Units",
      href: "/inventory/units/new",
    },
    {
      title: "Warehouses",
      href: "/inventory/warehouses/new",
    },
    {
      title: "Inventory Adjustment",
      href: "/inventory/adjustments/new",
    },
  ];
  const salesLinks = [
    {
      title: "Customers",
      href: "/",
    },
    {
      title: "Sales Orders",
      href: "/",
    },
    {
      title: "Packages",
      href: "/",
    },
    {
      title: "Shipments",
      href: "/",
    },
    {
      title: "Invoices",
      href: "/",
    },
    {
      title: "Sales Receipts",
      href: "/",
    },
    {
      title: "Payments Received",
      href: "/",
    },
    {
      title: "Sales Returns",
      href: "/",
    },
    {
      title: "Credit Notes",
      href: "/",
    },
  ];
  return (
    <div className="w-60 min-h-screen bg-slate-800 text-slate-50 fixed">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex space-x-2 items-center bg-slate-950 py-3 px-2"
        >
          <ShoppingCart />
          <span className="text-xl font-semibold">SuperAidJ4u</span>
        </Link>
      </div>

      <nav className="flex flex-col px-3 py-3">
        <Link
          href="/home/dashboard"
          className="flex items-center space-x-2 bg-blue-500 text-slate-50 p-2 rounded-md"
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </Link>
        <SidebarDropdownMenu
          title="Inventory"
          inventoryLinks={inventoryLinks}
          icon={ShoppingCart}
        />
        <SidebarDropdownMenu
          title="Sales"
          inventoryLinks={salesLinks}
          icon={ShoppingBasket}
        />
        <button href="" className="flex items-center space-x-2 p-2">
          <ShoppingBag className="w-4 h-4" />
          <span>Purchases</span>
        </button>
        <button href="" className="flex items-center space-x-2 p-2">
          <Cable className="w-4 h-4" />
          <span>Integrations</span>
        </button>
        <button href="" className="flex items-center space-x-2 p-2">
          <BarChart4 className="w-4 h-4" />
          <span>Reports</span>
        </button>
        <button href="" className="flex items-center space-x-2 p-2">
          <FileText className="w-4 h-4" />
          <span>Documents</span>
        </button>
      </nav>

      <div className="flex flex-col">
        <SubscriptionReminder />
        <div className="flex justify-center bg-slate-950 py-3 px-2">
          <button>
            <ChevronLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
