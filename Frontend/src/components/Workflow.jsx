import React from "react";
import {
  Building2,
  Users,
  UserRound,
  ClipboardCheck,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

const Workflow = () => {
  const steps = [
    {
      number: "01",
      icon: Building2,
      title: "Create organization",
      description:
        "Owners create and manage their organizations from one central workspace.",
    },
    {
      number: "02",
      icon: Users,
      title: "Add administrators",
      description:
        "Assign administrators who can manage teams and employees within the organization.",
    },
    {
      number: "03",
      icon: UserRound,
      title: "Build your teams",
      description:
        "Create teams and organize employees around the work they are responsible for.",
    },
    {
      number: "04",
      icon: ClipboardCheck,
      title: "Assign & track work",
      description:
        "Create tasks, assign them to employees and keep track of their progress.",
    },
  ];

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-slate-950 py-24 text-white lg:py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-100 w-175 -translate-x-1/2 rounded-full bg-slate-800/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <ShieldCheck size={13} />
            Simple workflow
          </div>

          <h2 className="text-4xl font-bold tracking-[-0.035em] sm:text-5xl">
            From organization
            <br />
            <span className="text-slate-500">
              to execution.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400">
            Nexora gives every level of your organization a clear role,
            making it easy to move from planning to completed work.
          </p>

        </div>

        {/* Workflow */}
        <div className="relative mt-16">

          {/* Connecting Line */}
          <div className="absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-slate-800 lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="group relative"
                >

                  {/* Number + Icon */}
                  <div className="relative z-10 flex items-center gap-4 lg:block">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 text-white shadow-xl shadow-black/20 transition duration-300 group-hover:border-slate-500 group-hover:bg-white group-hover:text-slate-950">
                      <Icon size={22} strokeWidth={1.7} />
                    </div>

                    <span className="text-xs font-bold tracking-[0.15em] text-slate-600 lg:absolute lg:-top-7 lg:left-0">
                      {step.number}
                    </span>

                  </div>

                  {/* Content */}
                  <div className="mt-5 lg:pr-5">

                    <h3 className="text-lg font-bold tracking-tight">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      {step.description}
                    </p>

                  </div>

                  {/* Arrow */}
                  {step.number !== "04" && (
                    <ArrowRight
                      size={18}
                      className="absolute right-0 top-10 hidden text-slate-700 lg:block"
                    />
                  )}

                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom Flow */}
        <div className="mt-20 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">

          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Your workflow
              </p>

              <p className="mt-2 text-lg font-semibold text-white">
                Owner → Admin → Team → Employee → Task
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              Everyone knows what to do
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Workflow;