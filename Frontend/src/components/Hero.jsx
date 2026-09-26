import React from "react";
import { ArrowRight, Play, CheckCircle2, Sparkles } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-20 lg:pt-40 lg:pb-28">
      
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 w-175 -translate-x-1/2 rounded-full bg-slate-100/70 blur-3xl" />
        <div className="absolute -left-40 top-40 h-72 w-72 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute -right-40 top-60 h-72 w-72 rounded-full bg-violet-100/40 blur-3xl" />
      </div>

      {/* Grid */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">

          {/* Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
            <Sparkles size={14} className="text-slate-950" />

            Modern workspace for modern teams

            <span className="ml-1 rounded-full bg-slate-950 px-2 py-0.5 text-[10px] text-white">
              NEW
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
            One workspace.
            <br />

            <span className="bg-linear-to-r from-slate-950 via-slate-700 to-slate-400 bg-clip-text text-transparent">
              Your entire team.
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
            Nexora brings organizations, teams, employees and tasks into one
            powerful workspace — giving everyone the tools they need to work
            better together.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

            <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 sm:w-auto">
              Get started

              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </button>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto">
              <Play size={15} fill="currentColor" />

              See how it works
            </button>

          </div>

          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-400">

            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-slate-700" />
              Role-based access
            </div>

            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-slate-700" />
              Multi-organization
            </div>

            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-slate-700" />
              Team collaboration
            </div>

          </div>
        </div>

        {/* Dashboard Preview */}
        <DashboardPreview />
      </div>
    </section>
  );
};

export default Hero;