import React from "react";
import { ArrowUpRight } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-900/5">

      {/* Hover Glow */}
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-slate-100 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

      {/* Icon */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      {/* Content */}
      <div className="relative mt-6">

        <div className="flex items-start justify-between gap-3">

          <h3 className="text-lg font-bold tracking-tight text-slate-950">
            {title}
          </h3>

          <ArrowUpRight
            size={17}
            className="shrink-0 text-slate-300 transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-slate-950"
          />

        </div>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {description}
        </p>

      </div>
    </div>
  );
};

export default FeatureCard;