import React from "react";
import {
  ClipboardList,
  CalendarDays,
  Clock3,
  CheckCircle2,
  Circle,
  UserRound,
} from "lucide-react";
import { useSelector } from "react-redux";

const TaskEmployee = () => {
  const { task = [], totalTask = 0 } = useSelector(
    (store) => store.employeeTask
  );
// console.log(task)
  // Task status count
  const pendingTask = task.filter(
    (item) => item.status === "todo"
  ).length;

  const inProgressTask = task.filter(
    (item) => item.status === "in-progress"
  ).length;

  const completedTask = task.filter(
    (item) => item.status === "completed"
  ).length;

  return (
    <main className="w-full min-h-[calc(100vh-64px)] bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-indigo-600">
            Work Management
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Tasks
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            View and manage the tasks assigned to you by your admin.
          </p>
        </div>

        {/* Task Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <ClipboardList size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                All
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {totalTask}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Tasks
            </p>
          </div>

          {/* Todo */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Circle size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Todo
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {pendingTask}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Pending Tasks
            </p>
          </div>

          {/* In Progress */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Clock3 size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Active
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {inProgressTask}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              In Progress
            </p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CheckCircle2 size={21} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Done
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {completedTask}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Completed
            </p>
          </div>
        </div>

        {/* Tasks Container */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Table Header */}
          <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="font-bold text-slate-900">
                Assigned Tasks
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Tasks assigned by your administrator
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
              <ClipboardList size={16} />
              {totalTask} Tasks
            </div>

          </div>

          {/* Task List */}
          <div className="divide-y divide-slate-100">

            {task.length === 0 ? (
              <div className="px-5 py-12 text-center">
                <ClipboardList
                  size={40}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  No tasks assigned
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  You currently don't have any tasks.
                </p>
              </div>
            ) : (
              task.map((item) => (
                <div
                  key={item._id}
                  className="p-5 transition hover:bg-slate-50"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Task Information */}
                    <div className="flex gap-4">

                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          item.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "in-progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {item.status === "completed" ? (
                          <CheckCircle2 size={20} />
                        ) : item.status === "in-progress" ? (
                          <Clock3 size={20} />
                        ) : (
                          <ClipboardList size={20} />
                        )}
                      </div>

                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 max-w-2xl text-sm text-slate-500">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">

                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={14} />

                            Created:{" "}
                            {new Date(
                              item.createdAt
                            ).toLocaleDateString("en-GB")}
                          </span>

                          <span className="flex items-center gap-1.5">
                            <UserRound size={14} />
                            Admin
                          </span>

                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                        item.status === "completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : item.status === "in-progress"
                          ? "bg-blue-50 text-blue-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.status === "in-progress"
                        ? "In Progress"
                        : item.status === "completed"
                        ? "Completed"
                        : "Todo"}
                    </span>

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

      </div>
    </main>
  );
};

export default TaskEmployee;