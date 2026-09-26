import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute top-1/2 -right-40 h-125 w-125 rounded-full bg-indigo-600/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex h-18 items-center justify-between border-b border-white/10 bg-slate-950/70 px-6 backdrop-blur-xl lg:px-10">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <div className="h-4 w-4 rotate-45 rounded-sm bg-slate-950" />
            <div className="absolute h-2 w-2 rounded-full bg-slate-100" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              Nexora
            </h1>

            <p className="text-[9px] uppercase tracking-[0.22em] text-slate-500">
              Workspace
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-200">
              Welcome back
            </p>
            <p className="text-xs text-slate-500">
              Your workspace
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-bold">
            S
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8 lg:px-10">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>
            <p className="text-sm font-medium text-blue-400">
              Dashboard
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Good to see you 👋
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              Manage your teams, employees and tasks from your
              workspace.
            </p>
          </div>

          <button className="w-fit rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200">
            + Create Task
          </button>

        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20">
            <p className="text-sm text-slate-500">
              Total Teams
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h3 className="text-3xl font-bold">
                12
              </h3>

              <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400">
                +12%
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20">
            <p className="text-sm text-slate-500">
              Employees
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h3 className="text-3xl font-bold">
                84
              </h3>

              <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                +8%
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20">
            <p className="text-sm text-slate-500">
              Active Tasks
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h3 className="text-3xl font-bold">
                128
              </h3>

              <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                +18%
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/20">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <div className="mt-3 flex items-end justify-between">
              <h3 className="text-3xl font-bold">
                92%
              </h3>

              <span className="rounded-full bg-orange-500/10 px-2.5 py-1 text-xs font-medium text-orange-400">
                +5%
              </span>
            </div>
          </div>

        </div>

        {/* Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Activity */}
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  Recent Activity
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  Latest activity across your workspace
                </p>
              </div>

              <button className="text-xs font-medium text-blue-400 hover:text-blue-300">
                View all
              </button>
            </div>

            <div className="mt-6 space-y-5">

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-sm font-bold text-blue-400">
                  AK
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-300">
                    Aman created a new task
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Complete employee dashboard
                  </p>
                </div>

                <span className="text-xs text-slate-600">
                  10m
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-sm font-bold text-purple-400">
                  RK
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-300">
                    Rahul completed a task
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Authentication module
                  </p>
                </div>

                <span className="text-xs text-slate-600">
                  32m
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/10 text-sm font-bold text-green-400">
                  PS
                </div>

                <div className="flex-1">
                  <p className="text-sm text-slate-300">
                    Priya joined Development
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    New employee
                  </p>
                </div>

                <span className="text-xs text-slate-600">
                  1h
                </span>
              </div>

            </div>
          </div>

          {/* Progress */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl">

            <h3 className="text-lg font-semibold">
              Task Progress
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Current workspace progress
            </p>

            <div className="mt-8 flex justify-center">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-14 border-white/5">
                <div className="absolute -inset-3.5 rounded-full border-14 border-transparent border-t-blue-500 border-r-indigo-500 rotate-45" />

                <div className="text-center">
                  <p className="text-3xl font-bold">
                    78%
                  </p>

                  <p className="text-[10px] uppercase tracking-wider text-slate-600">
                    Completed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Completed
                </span>

                <span className="font-medium text-green-400">
                  92
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  In Progress
                </span>

                <span className="font-medium text-blue-400">
                  24
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Pending
                </span>

                <span className="font-medium text-orange-400">
                  12
                </span>
              </div>

            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default Dashboard;