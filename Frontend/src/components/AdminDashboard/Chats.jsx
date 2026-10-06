import React, { useState } from "react";
import {
  MessageCircle,
  Search,
  MoreVertical,
} from "lucide-react";
import ChatBox from "./ChatBox";
import { useSelector } from "react-redux";

const Chats = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const {employee = []} = useSelector((store) => store.employee)
  // console.log(employee)

  return (
    <main className="min-w-0 flex-1 bg-slate-50 px-6 py-8 lg:px-8">

      {/* Header */}
      <div className="mb-6">
        <div className="rounded-3xl bg-slate-950 px-7 py-7 shadow-[0_15px_45px_rgba(15,23,42,0.18)]">

          <div className="flex items-center justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Workspace
                </span>

                <span className="text-slate-600">/</span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                  Chats
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-white lg:text-[36px]">
                Chats
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Connect and communicate with your team members.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Chat Section */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Search Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

          <div>
            <h2 className="text-lg font-bold text-slate-950">
              Employees
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Start a conversation with your team.
            </p>
          </div>

          <div className="flex h-10 w-64 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">

            <Search className="h-4 w-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search employee..."
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />

          </div>

        </div>

        {/* Employee List */}
        <div className="divide-y divide-slate-100">

          {employee.map((employee) => (
            <div
              key={employee._id}
              onClick={() => setSelectedUser(employee)}
              className="group flex cursor-pointer items-center justify-between px-6 py-4 transition hover:bg-slate-50"
            >

              <div className="flex items-center gap-4">

                <div className="relative">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br ${employee.avatar} text-sm font-bold text-white`}
                  >
                    {employee.initials}
                  </div>

                  <span
                    className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                      employee.online
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  />

                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {employee.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {employee.role}
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4">

                <span className="text-xs text-slate-400">
                  {employee.online ? "Online" : "Offline"}
                </span>

                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 opacity-0 transition group-hover:bg-slate-100 group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>

              </div>

            </div>
          ))}

        </div>
      </div>

      {/* Chat Box */}
      {selectedUser && (
        <ChatBox
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

    </main>
  );
};

export default Chats;
