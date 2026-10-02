import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardLoading from "../Dashboard/DashboardLoading";
import AdminsEmployee from '../AdminDashboard/AdminsEmployee'
import AdminTeam from '../AdminDashboard/AdminsTeam'

import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
} from "lucide-react";

import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import AdminDashPre from "../AdminDashboard/AdminDashPre";
import useAdminDashboardData from "../../hooks/useAdminDashboardData";


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
  const [activePage, setActivePage] = useState("dashboard")
  const location = useLocation();

  const { loading } = useAdminDashboardData();

  const { teams = [], totalTeams = 0 } = useSelector(
    (store) => store.teams
  );

  const { task = [], totalTask = 0 } = useSelector(
    (store) => store.task
  );

  const { employee = [], totalEmployee = 0 } = useSelector(
    (store) => store.employee
  );


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

        <Sidebar
          links={links}
          // active={location.pathname}
          setActivePage={setActivePage}
        />

        {loading ? (
          <main className="min-w-0 flex-1">
            <DashboardLoading />
          </main>
        ) : activePage === "/dashboard" ? (
          <AdminDashPre
            teams={teams}
            totalTeams={totalTeams}
            task={task}
            totalTask={totalTask}
            employee={employee}
            totalEmployee={totalEmployee}
            completedTasks={completedTasks}
            todoTasks={todoTasks}
            inProgressTasks={inProgressTasks}
            completionRate={completionRate}
          />
        ) : activePage === "/teams" ? (
          <AdminTeam teams={teams} />
        ) : activePage === "/employees" ? (
          <AdminsEmployee  employee={employee} />
        ) : null}

      </div>

    </div>
  );
};


export default AdminDashboard;