import React from "react";

const AdminsTeam = () => {
  return (
    <main className="min-w-0 flex-1 bg-slate-50 px-6 py-8 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-[0_15px_45px_rgba(15,23,42,0.18)]">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-60 w-60 rounded-full bg-slate-800/40 blur-3xl" />

          {/* Subtle gradient */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-transparent" />

          <div className="relative px-7 py-7 lg:px-8 lg:py-8">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div>

                {/* Section */}
                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
                    <div className="h-2.5 w-2.5 rounded-[3px] bg-white" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Workspace
                  </span>

                  <span className="text-slate-600">
                    /
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                    Teams
                  </span>

                </div>

                {/* Title */}
                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-bold tracking-[-0.03em] text-white lg:text-[38px]">
                    Teams
                  </h1>

                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.1)]" />
                    Active
                  </span>

                </div>

                {/* Description */}
                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Create, organize and manage your workspace teams
                  from one central place.
                </p>

                {/* Meta */}
                <div className="mt-5 flex items-center gap-4">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                    Team management
                  </div>

                  <div className="h-3 w-px bg-slate-800" />

                  <span className="text-xs font-medium text-slate-500">
                    Workspace teams
                  </span>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex shrink-0 items-center gap-3">

                {/* Search */}
                <button
                  className="hidden h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 text-sm font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white sm:flex"
                >
                  <span className="text-lg text-slate-400">
                    ⌕
                  </span>

                  Search
                </button>

                {/* Create Team */}
                <button
                  className="group flex h-12 items-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
                >

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-lg leading-none text-white transition-transform duration-300 group-hover:rotate-90">
                    +
                  </span>

                  <span>
                    Create Team
                  </span>

                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Teams
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            8
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Teams
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-600">
            6
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Employees
          </p>
          <p className="mt-2 text-3xl font-bold text-slate-950">
            24
          </p>
        </div>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((team) => (
          <div
            key={team}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 text-white">
                <span className="text-sm font-bold">
                  T
                </span>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
                Active
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-950">
              Development Team
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Software development and engineering
            </p>

            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs text-slate-400">
                  Members
                </p>

                <p className="mt-1 text-sm font-bold text-slate-700">
                  6 Employees
                </p>
              </div>

              <button className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950">
                View Team
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AdminsTeam;