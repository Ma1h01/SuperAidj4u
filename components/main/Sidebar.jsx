"use client";
import {
  BarChart4,
  Cable,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  ShoppingBag,
  ShoppingBasket,
  ShoppingCart,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { React, useState, useEffect } from "react";
import SubscriptionReminder from "./SubscriptionReminder";
import SidebarDropdownMenu from "./SidebarDropdownMenu";
import { getMockWarehouses } from "@/lib/adjustmentData";

const Sidebar = ({showSidebar, setShowSidebar, isCollapsed, setIsCollapsed}) => {
  const [warehouses, setWarehouses] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    // Initial fetch
    setWarehouses(getMockWarehouses());
  }, []);

  const inventoryLinks = [
    { title: 'All', href: '/inventory' },
    ...warehouses.map((warehouse) => ({
      title: warehouse.name,
      href: `/inventory/warehouses/${warehouse.id}`,
    })),
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

  const sidebarDivStyle = showSidebar
    ? `min-h-screen bg-slate-800 text-slate-50 fixed lg:block z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`
    : `min-h-screen bg-slate-800 text-slate-50 fixed lg:block z-50 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      } hidden`;

  const onShowSidebarClick = () => {
    setShowSidebar((prev) => !prev);
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  const isHomeActive = pathname === '/home/dashboard';

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={sidebarDivStyle}>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row bg-slate-950 justify-between">
          <Link
            href="/"
            className="flex space-x-2 items-center bg-slate-950 py-3 px-2"
          >
            <ShoppingCart />
            {!isCollapsed && <span className="text-xl font-semibold">SuperAidJ4u</span>}
          </Link>
          <div className="flex flex-col justify-center items-center mr-2 lg:hidden">
            <button onClick={onShowSidebarClick}>
              <X className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
          <nav className="flex flex-col px-3 py-3">
            <Link
              href="/home/dashboard"
              className={`flex items-center space-x-2 p-2 rounded-md ${
                isHomeActive ? 'bg-blue-500 text-white' : 'hover:bg-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              {!isCollapsed && <span>Home</span>}
            </Link>
            <SidebarDropdownMenu
              title="Inventory"
              inventoryLinks={inventoryLinks}
              icon={ShoppingCart}
              setShowSidebar={setShowSidebar}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <SidebarDropdownMenu
              title="Sales"
              inventoryLinks={salesLinks}
              icon={ShoppingBasket}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
            <button href={null} className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded-md">
              <ShoppingBag className="w-4 h-4" />
              {!isCollapsed && <span>Purchases</span>}
            </button>
            <button href={null} className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded-md">
              <Cable className="w-4 h-4" />
              {!isCollapsed && <span>Integrations</span>}
            </button>
            <button href={null} className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded-md">
              <BarChart4 className="w-4 h-4" />
              {!isCollapsed && <span>Reports</span>}
            </button>
            <button href={null} className="flex items-center space-x-2 p-2 hover:bg-slate-700 rounded-md">
              <FileText className="w-4 h-4" />
              {!isCollapsed && <span>Documents</span>}
            </button>
          </nav>
        </div>

        <div className="flex flex-col">
          {!isCollapsed && <SubscriptionReminder />}
          <div className="flex justify-center bg-slate-950 py-3 px-2">
            <button onClick={toggleCollapse}>
              {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
