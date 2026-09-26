import React from "react";

const DashboardPreview = () => {
  return (
    <div className="relative mx-auto mt-20 max-w-6xl">
      {/* Glow */}
      <div className="absolute -inset-4 -z-10 rounded-4xl bg-slate-300/30 blur-3xl" />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">

        {/* Browser Header */}
        <div className="flex h-12 items-center border-b border-slate-200 bg-slate-50 px-5">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>

          <div className="mx-auto hidden h-7 w-72 rounded-lg border border-slate-200 bg-white sm:block" />
        </div>

        {/* Dashboard */}
        <div className="flex min-h-105">

          {/* Sidebar */}
          <div className="hidden w-52 border-r border-slate-200 bg-slate-50/70 p-5 sm:block">

            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950">
                <div className="h-3 w-3 rotate-45 rounded-sm bg-white" />
              </div>

              <span className="text-sm font-bold text-slate-900">
                Nexora
              </span>
            </div>

            {/* Menu */}
            <div className="space-y-1">
              {[
                "Dashboard",
                "Teams",
                "Employees",
                "Tasks",
                "Messages",
              ].map((item, index) => (
                <div
                  key={item}
                  className={`rounded-lg px-3 py-2.5 text-xs font-medium ${
                    index === 0
                      ? "bg-slate-950 text-white"
                      : "text-slate-500"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Main Dashboard */}
          <div className="flex-1 bg-white p-5 sm:p-7">

            {/* Header */}
            <div className="flex items-center justify-between">

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Monday, September 22
                </p>

                <h3 className="mt-1 text-xl font-bold text-slate-950">
                  Good morning, Shubham
                </h3>
              </div>

              {/* Profile */}
              <div className="h-9 w-9 rounded-full bg-slate-200" />
            </div>

            {/* Stats */}
            <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">

              {[
                ["Active Teams", "12"],
                ["Employees", "148"],
                ["Open Tasks", "36"],
                ["Completed", "84%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <p className="text-[11px] font-medium text-slate-400">
                    {label}
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-950">
                    {value}
                  </p>
                </div>
              ))}

            </div>

            {/* Bottom Cards */}
            <div className="mt-5 grid gap-5 lg:grid-cols-3">

              {/* Activity Chart */}
              <div className="rounded-xl border border-slate-200 p-5 lg:col-span-2">

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    Team activity
                  </p>

                  <span className="text-[11px] text-slate-400">
                    This week
                  </span>
                </div>

                {/* Chart */}
                <div className="mt-8 flex h-36 items-end gap-3">
                  {[
                    45, 65, 50, 80, 60, 90,
                    72, 95, 78, 88, 70, 100
                  ].map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-slate-200 transition hover:bg-slate-950"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  ))}
                </div>

              </div>

              {/* Completion */}
              <div className="rounded-xl border border-slate-200 p-5">

                <p className="text-sm font-semibold text-slate-900">
                  Task completion
                </p>

                <div className="mx-auto mt-7 flex h-32 w-32 items-center justify-center rounded-full border-12 border-slate-100 border-t-slate-950 border-r-slate-700">

                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-950">
                      84%
                    </p>

                    <p className="text-[10px] text-slate-400">
                      completed
                    </p>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;