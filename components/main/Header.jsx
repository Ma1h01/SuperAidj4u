import {
  History,
  Plus,
  Users,
  Settings,
  Bell,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import React from "react";
import SearchInput from "./SearchInput";
import Image from "next/image";
const Header = () => {
  return (
    <div className="bg-gray-100 h-12 flex items-center justify-between px-4 border-b border-slate-200">
      <div className="flex gap-3">
        <button className="w-5">
          <History />
        </button>
        <SearchInput />
      </div>

      <div className="flex">
        <div className="flex pr-2 border-r border-gray-300 items-center">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="bg-blue-500 rounded">
                <Plus className="text-slate-50" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex border-r border-gray-300 space-x-2 px-2">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger className="p-1 hover:bg-slate-200 rounded">
                <Users className="text-slate-900 w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Users</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="p-1 hover:bg-slate-200 rounded">
                <Bell className="text-slate-900 w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Notification</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger className="p-1 hover:bg-slate-200 rounded">
                <Settings className="text-slate-900 w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Setting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex gap-3 px-2">
          <button className="flex items-center">
            <span>Yihao</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button>
            <Image
              width={96}
              height={96}
              className="rounded-full w-8 h-8 border border-slate-900"
              src="/Myself.png"
              alt="avatar"
            />
          </button>
          <button>
            <LayoutGrid className="w-6 h-6 test-slate-900" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
