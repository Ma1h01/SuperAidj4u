import React from "react";

const InventorySummaryCard = (props) => {
  return (
    <div className="mb-4 shadow rounded-lg border border-slate-200 hover:border-slate-400 cursor-pointer bg-white px-4 py-2 flex items-center justify-between gap-3 transition-all duration-300">
      <h2 className="uppercase text-slate-500 text-sm">{props.title}</h2>
      <h4 className="text-2xl">{props.number}</h4>
    </div>
  );
};

export default InventorySummaryCard;
