import React, { useEffect } from "react";
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  CircleAlert,
  Building2,
  UserRound,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addTasks } from "../../utlis/Redux/employeeTask";
import { getEmployeTask } from "../../API's/employee";

const EmpDashboard = () => {
  const user = useSelector((store) => store.user);

  const { task = [], totalTask = 0 } = useSelector(
    (store) => store.employeeTask
  );

//   console.log(task);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmployeTask();

        dispatch(addTasks(res.data.data));
        // console.log(res.data.data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

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
          <div className="mb-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Organization Header */}
            <div className="relative overflow-hidden bg-slate-950 px-7 py-7">
              <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl" />
              <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="relative flex items-center gap-4">
                {/* Organization Icon */}
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
                      {user?.name || "Employee"} 👋
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-500">
                    View your tasks, progress, organization and account information.
                  </p>
                </div>

                {/* Employee Workspace */}
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Workspace
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    Employee Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <ClipboardList size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Total
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {totalTask}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Total Tasks
            </p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Pending
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
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
                <CircleAlert size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Active
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
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
                <CheckCircle2 size={22} />
              </div>

              <span className="text-xs font-medium text-slate-400">
                Done
              </span>
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">
              {completedTask}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Completed Tasks
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Tasks */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <h2 className="font-bold text-slate-900">
                  My Tasks
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Tasks assigned by your admin
                </p>
              </div>

              <ClipboardList
                size={20}
                className="text-slate-400"
              />
            </div>

            {/* Dynamic Tasks */}
            <div className="divide-y divide-slate-100">

              {task.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <ClipboardList
                    size={35}
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
                task.slice(0, 3).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between gap-4 px-5 py-5"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        Assigned by Admin
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
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
                ))
              )}

            </div>
          </div>

          {/* Employee + Organization */}
          <div className="space-y-6">

            {/* Profile */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-xl font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    {user?.name}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {user?.role}
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">

                <div className="flex items-center gap-3">
                  <UserRound
                    size={17}
                    className="text-slate-400"
                  />

                  <div>
                    <p className="text-xs text-slate-400">
                      Email
                    </p>

                    <p className="text-sm font-medium text-slate-700">
                      {user?.email}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Organization */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                  <Building2 size={21} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Organization
                  </h2>

                  <p className="text-xs text-slate-500">
                    Your workplace
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-xl bg-slate-50 p-4">

                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Organization Name
                </p>

                <p className="mt-1 font-semibold text-slate-800">
                  {user?.organizationId?.name}
                </p>

              </div>

            </div>

          </div>
        </div>

      </div>
    </main>
  );
};

export default EmpDashboard;