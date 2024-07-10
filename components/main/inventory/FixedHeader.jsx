import { Grid, HelpCircle, List, MoreHorizontal, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const FixedHeader = ({newLink}) => {
  return (
    <div className="flex items-center justify-between bg-white py-5 px-4">
      <button className="text-2xl">All Items</button>
      <div className="flex gap-4">
          {/* New Button */}
          <Link href={newLink} className="rounded bg-blue-500 flex items-center px-3 py-1 space-x-2 text-white">
            <Plus className=" w-4 h-4" />
            <span>New</span>
          </Link> 
          {/* Layout */}
          <div className="flex rounded overflow-hidden">
            <button className="bg-gray-300 p-2 border-r border-gray-400">
              <List className="w-4 h-4"/>
            </button>
            <button className="bg-gray-100 p-2">
              <Grid className="w-4 h-4"/>
            </button>
          </div>
          {/* More */}
          <div className="flex bg-gray-100 p-2 rounded">
            <button>
              <MoreHorizontal className="w-4 h-4"/>
            </button>
          </div>
          <div className="flex bg-orange-600 p-2 rounded">
            <button>
              <HelpCircle className="w-4 h-4 text-white"/>
            </button>
          </div>
      </div>
    </div>
  );
};

export default FixedHeader;
