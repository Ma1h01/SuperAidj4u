import Header from "@/components/main/Header";
import Sidebar from "@/components/main/Sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="bg-gray-300 min-h-screen">
      <div className="flex">
        <Sidebar />
        <main className="ml-60 w-full bg-slate-100 min-h-screen text-slate-950">
          <Header />
          {children}
        </main>
      </div>
    </div>
  );
};

export default layout;
