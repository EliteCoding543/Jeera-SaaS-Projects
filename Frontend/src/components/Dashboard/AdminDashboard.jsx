import React, { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import DashboardLoading from "../Dashboard/DashboardLoading";

import AdminsEmployee from "../AdminDashboard/AdminsEmployee";
import AdminTeam from "../AdminDashboard/AdminsTeam";
import AdminDashPre from "../AdminDashboard/AdminDashPre";

import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  ListTodo,
  MessageCircle
} from "lucide-react";

import { useSelector } from "react-redux";
import useAdminDashboardData from "../../hooks/useAdminDashboardData";
import Task from "../AdminDashboard/Task";
import Chats from "../AdminDashboard/Chats";


const links = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    key: "dashboard",
  },
  {
    label: "Teams",
    icon: Building2,
    key: "teams",
  },
  {
    label: "Employees",
    icon: ShieldCheck,
    key: "employees",
  },
  {
    label: "Task",
    icon: ListTodo,
    key: "task",
  },
    {
    label: "Chat",
    icon: MessageCircle,
    key: "chat",
  },
];


const AdminDashboard = () => {

  const [activePage, setActivePage] = useState("dashboard");

  const { loading } = useAdminDashboardData();


  // Teams
  const {
    teams = [],
    totalTeams = 0,
  } = useSelector(
    (store) => store.teams
  );


  // Tasks
  const { task = [], totalTask = 0 } = useSelector(
    (store) => store.task
  );
  // console.log(totalTask)


  // User
  const user = useSelector(
    (store) => store.user
  );


  // Employees
  const {
    employee = [],
    totalEmployee = 0,
  } = useSelector(
    (store) => store.employee
  );


  // Completed Tasks
  const completedTasks = task.filter(
    (item) => item.status === "completed"
  ).length;


  // Todo Tasks
  const todoTasks = task.filter(
    (item) => item.status === "todo"
  ).length;


  // In Progress Tasks
  const inProgressTasks = task.filter(
    (item) => item.status === "in-progress"
  ).length;


  // Completion Rate
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
          activePage={activePage}
          setActivePage={setActivePage}
        />


        {loading ? (

          <main className="min-w-0 flex-1">
            <DashboardLoading />
          </main>

        ) : activePage === "dashboard" ? (

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

        ) : activePage === "teams" ? (

          <AdminTeam
            teams={teams}
            user={user}
            totalTeams={totalTeams}
            totalEmployee={totalEmployee}
          />

        ) : activePage === "employees" ? (

          <AdminsEmployee
            employee={employee}
            totalEmployee={totalEmployee}
          />

        ) : activePage === "task" ? (
          <Task 
            task={task}
            totalTask={totalTask}
          />
        ) : activePage === "chat" ? (
          <Chats />
        ) : null}

      </div>

    </div>
  );
};


export default AdminDashboard;
