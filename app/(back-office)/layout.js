'use client';
import Header from "@/components/main/Header";
import Sidebar from "@/components/main/Sidebar";
import { React, useState } from "react";

const layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="flex">
          <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
          <main className="lg:ml-60 ml-0 w-full bg-slate-100 min-h-screen text-slate-950">
          <Header setShowSidebar={setShowSidebar}/>
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
