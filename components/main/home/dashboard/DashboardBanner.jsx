"use client";
import { CreditCard, X } from "lucide-react";
import { React, useState } from "react";

const DashboardBanner = () => {
  const [hidden, setHidden] = useState(false);
  return (
    <>
      {!hidden && (
        <div className="flex justify-center items-center py-6 px-16 bg-white gap-8 relative">
          {/* Icon */}

          <CreditCard className=" w-20 h-20 text-slate-500" />

          {/* Text */}
          <div className="w-1/2">
            <h2 className=" font-bold text-2xl">
              Start accpeting online payments
            </h2>
            <p>
              Businesses are moving towoards online payments as they're easy,
              secure and fast. Try them for your business today.
            </p>
          </div>
          {/* Button */}
          <button className="uppercase bg-blue-500 text-white rounded-lg py-2 px-4">
            Enable
          </button>
          {/* Close Button */}
          <button
            className="absolute top-0 right-0 p-2"
            onClick={() => setHidden(true)}
          >
            <X />
          </button>
        </div>
      )}
    </>
  );
};

export default DashboardBanner;
