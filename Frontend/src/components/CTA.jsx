import React from "react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

const CTA = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-slate-950 py-24 lg:py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800/40 blur-3xl" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400">
          <Sparkles size={14} />
          Built for modern teams
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
          Ready to bring your
          <br />
          <span className="text-slate-500">
            team together?
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Create your workspace, organize your teams and start managing
          your work from one powerful platform.
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-xl transition hover:-translate-y-0.5 hover:bg-slate-100 sm:w-auto">
            Get started

            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <button className="w-full rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 sm:w-auto">
            Explore workspace
          </button>

        </div>

        {/* Trust */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-slate-500">

          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            Role-based access
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-700" />

          <div>
            Organization management
          </div>

          <div className="h-1 w-1 rounded-full bg-slate-700" />

          <div>
            Team collaboration
          </div>

        </div>

      </div>
    </section>
  );
};

export default CTA;