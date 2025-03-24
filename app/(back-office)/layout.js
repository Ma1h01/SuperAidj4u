'use client';
import Header from "@/components/main/Header";
import Sidebar from "@/components/main/Sidebar";
import { React, useState } from "react";
import FixedHeader from "@/components/main/inventory/FixedHeader";

const layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="flex">      
          <main className="ml-0 w-full bg-slate-100 min-h-screen text-slate-950">          
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
