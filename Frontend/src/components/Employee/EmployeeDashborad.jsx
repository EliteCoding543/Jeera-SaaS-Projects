import React, { useState } from "react";
import EmpDashboard from "./EmpDashboard";
import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import TaskEmployee from "./TaskEmployee";
import Profile from "./Profile";

import {
  LayoutDashboard,
  ClipboardList,
  User,
  MessageCircle
} from "lucide-react";
import Chats from '../AdminDashboard/Chats'

const EmployeeDashborad = () => {
  const [activePage, setActivePage] = useState("dashboard");


  const links = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      key: "dashboard",
    },
    {
      label: "Task",
      icon: ClipboardList,
      key: "task",
    },
    {
      label: "Profile",
      icon: User,
      key: "profile",
    },
    {
      label : "Chat",
      icon : MessageCircle,
      key : "chat"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar />

      <div className="flex min-h-[calc(100vh-64px)]">

        {/* Sidebar */}
        <Sidebar 
          links={links}   
          activePage={activePage}
          setActivePage={setActivePage} 
        />

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white px-2 py-2 md:hidden">

          <div className="flex justify-around">

            {links.map((link) => {
              const Icon = link.icon;

              return (
                <button
                  key={link.key}
                  onClick={() => setActivePage(link.key)}
                  className={`flex min-w-20 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-medium transition ${
                    activePage === link.key
                      ? "bg-slate-900 text-white"
                      : "text-slate-500"
                  }`}
                >
                  <Icon size={18} strokeWidth={2} />

                  {link.label}
                </button>
              );
            })}

          </div>

        </div>

        {/* Dashboard */}
        {activePage === "dashboard" && (
          <EmpDashboard />
        )}

        {/* Task */}
        {activePage === "task" && (
          <TaskEmployee />
        )}

        {/* Profile */}
        {activePage === "profile" && (
          <Profile />
        )}

        {/* Chat  */}
        {
          activePage === "chat" && (
            <Chats />
          )
        }

      </div>
    </div>
  );
};

export default EmployeeDashborad;
