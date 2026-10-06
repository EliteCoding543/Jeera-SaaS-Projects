import React from "react";
import {
  Users,
  CheckSquare,
  BriefcaseBusiness,
  ArrowUpRight,
  MoreHorizontal,
  Building2,
} from "lucide-react";

import { useSelector } from "react-redux";

const AdminDashPre = ({
  teams = [],
  totalTeams = 0,
  task = [],
  totalTask = 0,
  employee = [],
  totalEmployee = 0,
  completedTasks = 0,
  todoTasks = 0,
  inProgressTasks = 0,
  completionRate = 0,
}) => {

  const user = useSelector((store) => store.user);

  return (
    <main className="min-w-0 flex-1 p-6 lg:p-8">

      {/* =========================
          HEADER
      ========================= */}

<div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

  {/* Organization Header */}
  <div className="relative overflow-hidden bg-slate-950 px-7 py-7">

    {/* Background Glow */}
    <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />

    <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

    <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

      {/* Organization Info */}
      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white shadow-lg backdrop-blur-sm">
          <Building2 className="h-6 w-6" />
        </div>

        <div>

          <div className="mb-1 flex items-center gap-2">

            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
              Organization
            </p>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-300">
              Active
            </span>

          </div>

          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
            {user?.organizationId?.name || "Your Organization"}
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Organization workspace
          </p>

        </div>

      </div>

      {/* Admin Profile */}
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
          {user?.name?.charAt(0)?.toUpperCase() || "A"}
        </div>

        <div>

          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Admin
          </p>

          <p className="text-sm font-semibold text-white">
            {user?.name || "Admin"}
          </p>

        </div>

      </div>

    </div>

  </div>

  {/* Welcome Section */}
  <div className="px-7 py-6">

    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

      <div>

        <div className="flex flex-wrap items-center gap-2">

          <h1 className="text-2xl font-bold tracking-tight text-slate-950">
            Welcome back,
          </h1>

          <span className="text-2xl font-semibold tracking-tight text-indigo-600">
            {user?.name || "Admin"}
          </span>

        </div>

        <p className="mt-2 text-sm text-slate-500">
          Manage your teams, employees and tasks from one place.
        </p>

      </div>

      <div className="hidden text-right sm:block">

        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700">
          Admin Dashboard
        </p>

      </div>

    </div>

  </div>

</div>


      {/* =========================
          STATS
      ========================= */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* TEAMS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Teams
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                {totalTeams}
              </h2>

            </div>

            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
              <BriefcaseBusiness size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-400">
            Active teams
          </p>

        </div>


        {/* EMPLOYEES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Employees
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                {totalEmployee}
              </h2>

            </div>

            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
              <Users size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs text-emerald-600">
            {totalEmployee} currently active
          </p>

        </div>


        {/* TOTAL TASKS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Total Tasks
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                {totalTask}
              </h2>

            </div>

            <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
              <CheckSquare size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs text-slate-400">
            Across all teams
          </p>

        </div>


        {/* COMPLETED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex items-start justify-between">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                {completedTasks}
              </h2>

            </div>

            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
              <CheckSquare size={19} />
            </div>

          </div>

          <p className="mt-3 text-xs text-emerald-600">
            {completionRate}% completion rate
          </p>

        </div>

      </div>


      {/* =========================
          MAIN SECTIONS
      ========================= */}

      <div className="mt-6 grid gap-6 xl:grid-cols-3">

        {/* TASK OVERVIEW */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-base font-semibold text-slate-950">
                Task Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current task distribution
              </p>

            </div>

            <button className="text-sm font-semibold text-slate-950 hover:text-slate-600">
              View tasks
            </button>

          </div>


          <div className="mt-7 space-y-6">

            {/* TODO */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-600">
                  To Do
                </span>

                <span className="text-sm font-semibold text-slate-950">
                  {todoTasks}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-slate-400"
                  style={{
                    width:
                      totalTask > 0
                        ? `${(todoTasks / totalTask) * 100}%`
                        : "0%",
                  }}
                />

              </div>

            </div>


            {/* IN PROGRESS */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-600">
                  In Progress
                </span>

                <span className="text-sm font-semibold text-slate-950">
                  {inProgressTasks}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-slate-700"
                  style={{
                    width:
                      totalTask > 0
                        ? `${(inProgressTasks / totalTask) * 100}%`
                        : "0%",
                  }}
                />

              </div>

            </div>


            {/* COMPLETED */}

            <div>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium text-slate-600">
                  Completed
                </span>

                <span className="text-sm font-semibold text-slate-950">
                  {completedTasks}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{
                    width:
                      totalTask > 0
                        ? `${(completedTasks / totalTask) * 100}%`
                        : "0%",
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* =========================
            TEAMS
        ========================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-base font-semibold text-slate-950">
                Your Teams
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Team overview
              </p>

            </div>

            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
              <MoreHorizontal size={19} />
            </button>

          </div>


          <div className="mt-5 space-y-4">

            {teams.length > 0 ? (

              teams.map((team) => (

                <div
                  key={team._id}
                  className="flex items-center justify-between"
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                      {team.name?.slice(0, 2).toUpperCase()}
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-slate-950">
                        {team.name}
                      </p>

                      <p className="text-xs text-slate-400">
                        Active team
                      </p>

                    </div>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400"
                  />

                </div>

              ))

            ) : (

              <p className="py-4 text-sm text-slate-400">
                No active teams found.
              </p>

            )}

          </div>


          <button className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            View all teams
          </button>

        </div>

      </div>


      {/* =========================
          RECENT TASKS
      ========================= */}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-base font-semibold text-slate-950">
              Recent Tasks
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest tasks across your organization
            </p>

          </div>

          <button className="text-sm font-semibold text-slate-950 hover:text-slate-600">
            View all
          </button>

        </div>


        <div className="mt-5 divide-y divide-slate-100">

          {task.length > 0 ? (

            task.map((item) => (

              <div
                key={item._id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >

                {/* TASK INFO */}

                <div className="flex items-start gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                    <CheckSquare size={16} />
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-slate-950">
                      {item.title}
                    </p>

                    <p className="mt-1 max-w-xl text-xs text-slate-400">
                      {item.description}
                    </p>

                  </div>

                </div>


                {/* STATUS + PRIORITY */}

                <div className="flex items-center gap-3">

                  {/* PRIORITY */}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.priority === "high"
                        ? "bg-red-50 text-red-600"
                        : item.priority === "medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.priority}
                  </span>


                  {/* STATUS */}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : item.status === "in-progress"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status}
                  </span>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-400"
                  />

                </div>

              </div>

            ))

          ) : (

            <p className="py-8 text-center text-sm text-slate-400">
              No tasks found.
            </p>

          )}

        </div>

      </div>

    </main>
  );
};

export default AdminDashPre;