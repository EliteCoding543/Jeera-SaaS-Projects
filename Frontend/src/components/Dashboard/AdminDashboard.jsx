import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

import {
  Users,
  CheckSquare,
  BriefcaseBusiness,
  ArrowUpRight,
  MoreHorizontal,
  LayoutDashboard,
  Building2,
  ShieldCheck,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { getAllTeams } from "../../API's/teamsAPI";
import { addTeams } from "../../utlis/Redux/teamSlice";

import { getAllAdminTask } from "../../API's/adminTask";
import { addAdminTask } from "../../utlis/Redux/adminTaskSlice";
import { addEmployees } from "../../utlis/Redux/employeeSlice";
import { getEmployee } from "../../API's/employee";


const links = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    key: "/dashboard",
  },
  {
    label: "Teams",
    icon: Building2,
    key: "/teams",
  },
  {
    label: "Employees",
    icon: ShieldCheck,
    key: "/employees",
  },
];


const AdminDashboard = () => {

  const dispatch = useDispatch();


  // =========================
  // TEAMS FROM REDUX
  // =========================

  const { teams = [], totalTeams = 0 } = useSelector(
    (store) => store.teams
  );


  // =========================
  // TASKS FROM REDUX
  // =========================

  const { task = [], totalTask = 0 } = useSelector(
    (store) => store.task
  );

  // =========================
  // EMPLOYEE FROM REDUX
  // =========================
  const { employee = [], totalEmployee} = useSelector((store) => store.employee)
  // =========================
  // FETCH DATA
  // =========================

useEffect(() => {

  const fetchData = async () => {

    try {

      const res = await getAllTeams();

      const adminTask = await getAllAdminTask();

      dispatch(
        addTeams(res.data.data)
      );

      dispatch(
        addAdminTask(adminTask.data.data)
      );


      // Teams API se jo teams mili hain
      const teamsData = res.data.data.teams;

      // First team ki ID
      if (teamsData.length > 0) {

        const teamId = teamsData[0]._id;

        const allEmployee = await getEmployee(teamId);

        console.log(
          "API RESPONSE Employees:",
          allEmployee.data
        );

        dispatch(
          addEmployees(allEmployee.data.data)
        );

      }

    } catch (error) {

      console.log(
        "Dashboard Fetch Error:",
        error
      );

    }

  };

  fetchData();

}, [dispatch]);


  // =========================
  // TASK COUNTS
  // =========================

  const completedTasks = task.filter(
    (item) => item.status === "completed"
  ).length;


  const todoTasks = task.filter(
    (item) => item.status === "todo"
  ).length;


  const inProgressTasks = task.filter(
    (item) => item.status === "in-progress"
  ).length;


  const completionRate =
    totalTask > 0
      ? Math.round(
          (completedTasks / totalTask) * 100
        )
      : 0;


  return (

    <div className="min-h-screen bg-slate-50">

      <Navbar />


      <div className="flex">

        <Sidebar links={links} />


        <main className="min-w-0 flex-1 p-6 lg:p-8">


          {/* =========================
              HEADER
          ========================= */}

          <div className="mb-8">

            <p className="mb-2 text-sm font-medium text-slate-500">
              Organization Overview
            </p>


            <h1 className="text-2xl font-bold tracking-tight text-slate-950">
              Admin Dashboard
            </h1>


            <p className="mt-2 text-sm text-slate-500">
              Manage your teams, employees and tasks from one place.
            </p>

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

                          {team.name
                            .slice(0, 2)
                            .toUpperCase()}

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

      </div>

    </div>
  );
};


export default AdminDashboard;