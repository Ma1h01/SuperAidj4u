import React from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
const SalesActivityCard = (props) => {
  return (
    <>
      <Link
        href={props.href}
        className="shadow rounded-lg border border-slate-200 hover:border-slate-400 cursor-pointer bg-white px-4 py-4 flex flex-col items-center gap-3 transition-all duration-300"
      >
        <h4 className={`font-semibold text-3xl ${props.color}`}>
          {props.number}
        </h4>
        <small className="text-slate-500">{props.unit}</small>
        <div className="flex items-center space-x-2 text-slate-500">
          <CheckCircle2 className="w-4 h-4" />
          <span className="uppercase text-xs">{props.title}</span>
        </div>
      </Link>
    </>
  );
};

export default SalesActivityCard;
