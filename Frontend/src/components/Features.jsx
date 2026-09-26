import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Kanban,
  MessageSquare,
  Zap,
  ArrowUpRight,
} from "lucide-react";

import FeatureCard from "../components/FeatureCard";

const Features = () => {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Role-based dashboards",
      description:
        "Give every role a focused workspace with the information and tools they need.",
    },
    {
      icon: Users,
      title: "Team management",
      description:
        "Create teams, manage employees and keep your organization structured.",
    },
    {
      icon: ClipboardCheck,
      title: "Task management",
      description:
        "Create, assign and track tasks from one centralized workspace.",
    },
    {
      icon: Kanban,
      title: "Progress tracking",
      description:
        "Monitor work progress and understand what your teams are working on.",
    },
    {
      icon: MessageSquare,
      title: "Team collaboration",
      description:
        "Keep your teams connected with communication built around their work.",
    },
    {
      icon: Zap,
      title: "Real-time productivity",
      description:
        "Keep your organization aligned with fast updates and a streamlined workflow.",
    },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-4 inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Everything you need
          </div>

          <h2 className="text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl">
            Built for the way
            <br />
            <span className="text-slate-400">
              modern teams work.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500">
            Nexora brings your people, teams and work together in one
            simple workspace designed for productivity.
          </p>

        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}

        </div>

        {/* Bottom Highlight */}
        <div className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white sm:p-10">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-xl">

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                One connected workspace
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                Everything your organization needs,
                <span className="text-slate-400">
                  {" "}without the complexity.
                </span>
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                From organization management to employee tasks, keep your
                entire workflow connected and easy to manage.
              </p>

            </div>

            <button className="group flex w-fit shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
              Explore workspace

              <ArrowUpRight
                size={16}
                className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;