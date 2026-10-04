import React from "react";
import {
  Building2,
  UsersRound,
  ArrowUpRight,
  Activity,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  MoreHorizontal,
} from "lucide-react";

import ModalOrg from "../../comonComp/ModalOrg";

const OnwerDashboradPre = ({
  analytics,
  allOrgs,
  activeOrganizations,
  inactiveOrganizations,
  activePercentage,
  isModalOpen,
  setIsModalOpen,
  setActivePage,
  user
}) => {
  return (
    <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          HERO HEADER
      ====================================================== */}

      <section className="relative mb-7 overflow-hidden rounded-[28px] bg-slate-950 px-6 py-7 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:px-8">

        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-white/5" />

        <div className="absolute right-20 top-20 h-16 w-16 rounded-full border border-white/5" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5">

              <span className="relative flex h-2 w-2">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-300">
                System online
              </span>

            </div>

            <h1 className="max-w-xl text-3xl  font-bold tracking-[-0.03em] text-white sm:text-4xl">

              Welcome Back's

              <span className="text-slate-400 text-2xl mx-3">
                {user.name}.
              </span>

            </h1>

            <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
              Monitor organizations, administrators and
              workspace activity from one central command center.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          STATS
      ====================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Organizations */}

        <div className="group relative overflow-hidden rounded-[22px] border border-slate-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]">

          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Organizations
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-slate-950">
                  {analytics?.totalOrganizations || 0}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-slate-950 text-white shadow-lg shadow-slate-950/15">

                <Building2
                  size={19}
                  strokeWidth={1.8}
                />

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <span className="text-xs font-medium text-slate-400">
                Total workspaces
              </span>

              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">

                <TrendingUp size={12} />

                Live

              </span>

            </div>

          </div>

        </div>


        {/* Administrators */}

        <div className="group relative overflow-hidden rounded-[22px] border border-slate-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]">

          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

          <div className="relative">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Administrators
                </p>

                <h2 className="mt-3 text-4xl font-bold tracking-[-0.04em] text-slate-950">
                  {analytics?.totalAdmins || 0}
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-violet-50 text-violet-600">

                <UsersRound
                  size={19}
                  strokeWidth={1.8}
                />

              </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <span className="text-xs font-medium text-slate-400">
                Across all organizations
              </span>

              <span className="text-[11px] font-bold text-violet-600">
                Admins
              </span>

            </div>

          </div>

        </div>


        {/* Active / Inactive Organizations */}

        <div className="group relative overflow-hidden rounded-[22px] border border-slate-200/70 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(15,23,42,0.08)]">

          <div className="relative">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Organizations
                </p>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-slate-100 text-slate-600">

                <Activity
                  size={19}
                  strokeWidth={1.8}
                />

              </div>

            </div>

            {/* Status */}

            <div className="mt-6 grid grid-cols-2 gap-3">

              {/* Active */}

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-semibold text-emerald-700">
                    Active
                  </span>

                </div>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {activeOrganizations}
                </p>

              </div>


              {/* Inactive */}

              <div className="rounded-xl border border-red-100 bg-red-50/50 p-3">

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-red-400" />

                  <span className="text-xs font-semibold text-slate-500">
                    Inactive
                  </span>

                </div>

                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {inactiveOrganizations}
                </p>

              </div>

            </div>


            {/* Health bar */}

            <div className="mt-5">

              <div className="mb-2 flex items-center justify-between">

                <span className="text-xs font-medium text-slate-400">
                  Organization health
                </span>

                <span className="text-xs font-bold text-emerald-600">
                  {activePercentage}%
                </span>

              </div>

              <div className="flex h-1.5 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full bg-emerald-500 transition-all duration-700"
                  style={{
                    width: `${activePercentage}%`,
                  }}
                />

                <div
                  className="h-full bg-slate-300 transition-all duration-700"
                  style={{
                    width: `${100 - activePercentage}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* System */}

        <div className="relative overflow-hidden rounded-[22px] bg-linear-to-br from-slate-900 to-slate-950 p-5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.14)]">

          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-400/10 blur-2xl" />

          <div className="relative">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  System
                </p>

                <h2 className="mt-3 text-xl font-bold">
                  Operational
                </h2>

              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/10">

                <ShieldCheck
                  size={20}
                  strokeWidth={1.8}
                />

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2">

              <span className="relative flex h-2 w-2">

                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />

              </span>

              <span className="text-xs font-semibold text-emerald-400">
                All systems operational
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.7fr_1fr]">

        {/* Organizations */}

        <div className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div>

              <div className="flex items-center gap-2">

                <h2 className="text-base font-bold tracking-tight text-slate-950">
                  Organizations
                </h2>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {analytics?.totalOrganizations || 0}
                </span>

              </div>

              <p className="mt-1 text-xs text-slate-400">
                Your organization ecosystem
              </p>

            </div>

            <button className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-950">

              View all

              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />

            </button>

          </div>


          {/* Organization list */}

          <div className="divide-y divide-slate-100">

            {allOrgs?.map((item, index) => (

              <div
                key={item._id || index}
                className="group flex items-center justify-between gap-4 px-6 py-4 transition-all duration-200 hover:bg-slate-50/70"
              >

                <div className="flex min-w-0 items-center gap-3">

                  {/* Avatar */}

                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-linear-to-br from-slate-100 to-slate-200 text-sm font-black text-slate-700">

                    {item.name?.slice(0, 1).toUpperCase()}

                    <span
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${
                        item.isActive
                          ? "bg-emerald-500"
                          : "bg-red-400"
                      }`}
                    />

                  </div>


                  <div className="min-w-0">

                    <p className="truncate text-sm font-bold text-slate-950">
                      {item.name}
                    </p>

                    <div className="mt-1 flex items-center gap-2">

                      <span className="text-xs text-slate-400">
                        {item.adminCount} administrators
                      </span>

                      <span className="h-1 w-1 rounded-full bg-slate-300" />

                      <span className="text-xs text-slate-400">
                        Workspace
                      </span>

                    </div>

                  </div>

                </div>


                <div className="flex items-center gap-3">

                  <span
                    className={`hidden rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide sm:inline-flex ${
                      item.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {item.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>

                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-300 opacity-0 transition-all group-hover:bg-white group-hover:text-slate-600 group-hover:opacity-100">

                    <MoreHorizontal size={17} />

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* RIGHT PANEL */}

        <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-7 text-white shadow-[0_18px_45px_rgba(15,23,42,0.15)]">

          {/* Decorative grid */}

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative">

            <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-white/10 ring-1 ring-white/10">

              <Sparkles
                size={20}
                strokeWidth={1.7}
              />

            </div>

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Quick action
            </p>

            <h2 className="mt-3 text-2xl font-bold tracking-[-0.03em]">

              Build something

              <br />

              <span className="text-slate-500">
                new today.
              </span>

            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Create a new organization and assign its
              administrator in a single workflow.
            </p>


            {/* Create Organization Button */}

            <button
              onClick={() => {
                setActivePage("organization"),
                setIsModalOpen(true)
              }}
              className="group mt-8 flex w-full items-center justify-between rounded-2xl bg-white p-2 pl-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-slate-100"
            >

              <span>
                Create Organization
              </span>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white transition-transform duration-300 group-hover:translate-x-0.5">

                <ArrowUpRight size={17} />

              </span>

            </button>


            {/* Bottom info */}

            <div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5">

              <CheckCircle2
                size={14}
                className="text-emerald-400"
              />

              <span className="text-[11px] font-medium text-slate-500">
                Secure workspace management
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CREATE ORGANIZATION MODAL
      ====================================================== */}

      {isModalOpen && (
        <ModalOrg setIsModalOpen={setIsModalOpen} />
      )}

    </main>
  );
};

export default OnwerDashboradPre;