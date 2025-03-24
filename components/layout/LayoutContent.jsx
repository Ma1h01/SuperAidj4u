"use client";
import { useState } from "react";
import Header from "../main/Header";
import Sidebar from "../main/Sidebar";

export default function LayoutContent({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar 
        showSidebar={showSidebar} 
        setShowSidebar={setShowSidebar}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <div 
        className={`flex-1 transition-all duration-300 overflow-y-auto`}
        onScroll={handleScroll}
      >
        <div className={`transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-60'
        }`}>
          <Header 
            setShowSidebar={setShowSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
          />
          <main className="pt-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 