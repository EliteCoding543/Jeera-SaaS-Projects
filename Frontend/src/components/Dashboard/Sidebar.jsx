import { NavLink, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Sidebar = ({ links }) => {
  const nav = useNavigate();

  return (
    <aside className="sticky top-18.25 hidden h-[calc(100vh-73px)] w-67.5 shrink-0 bg-[#f8fafc] lg:block">
      <div className="flex h-full flex-col px-4 py-5">

        {/* ─────────────────────────────────────
            WORKSPACE CARD
        ───────────────────────────────────── */}

        <div className="relative mb-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

          {/* subtle decoration */}

          <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-slate-100 blur-2xl" />

          <div className="relative flex items-center gap-3">

            {/* Workspace icon */}

            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950 shadow-lg shadow-slate-950/20">

              <div className="h-4 w-4 rotate-45 rounded-sm bg-white" />

              <div className="absolute h-1.5 w-1.5 rounded-full bg-slate-950" />

            </div>

            {/* Workspace info */}

            <div className="min-w-0">

              <p className="text-sm font-bold tracking-tight text-slate-950">
                Nexora
              </p>

              <div className="mt-0.5 flex items-center gap-1.5">

                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Workspace
                </span>

              </div>

            </div>

          </div>
        </div>


        {/* ─────────────────────────────────────
            NAVIGATION
        ───────────────────────────────────── */}

        <div className="mb-3 flex items-center justify-between px-2">

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Management
          </span>

          <span className="text-[10px] font-medium text-slate-300">
            {links.length}
          </span>

        </div>


        <nav className="space-y-1.5">

          {links.map((link) => {

            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-2xl p-2 transition-all duration-300 ${
                    isActive
                      ? "bg-slate-950 shadow-[0_8px_24px_rgba(15,23,42,0.16)]"
                      : "hover:bg-white hover:shadow-[0_4px_16px_rgba(15,23,42,0.04)]"
                  }`
                }
              >

                {({ isActive }) => (
                  <>

                    {/* Active glow */}

                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/6 to-transparent" />
                    )}


                    {/* Icon */}

                    <div
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-white/10 text-white ring-1 ring-white/10"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-950 group-hover:text-white"
                      }`}
                    >

                      <Icon
                        size={18}
                        strokeWidth={1.8}
                      />

                    </div>


                    {/* Text */}

                    <div className="relative min-w-0 flex-1">

                      <p
                        className={`text-sm font-semibold transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-slate-600 group-hover:text-slate-950"
                        }`}
                      >
                        {link.label}
                      </p>

                      {isActive && (
                        <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                          Currently active
                        </p>
                      )}

                    </div>


                    {/* Arrow */}

                    <div
                      className={`relative flex h-7 w-7 items-center justify-center rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-slate-300 opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100"
                      }`}
                    >

                      <ChevronRight
                        size={15}
                        strokeWidth={2}
                      />

                    </div>

                  </>
                )}

              </NavLink>
            );
          })}

        </nav>


        {/* ─────────────────────────────────────
            BOTTOM AREA
        ───────────────────────────────────── */}

        <div className="mt-auto">

          {/* Upgrade / workspace card */}

          <div className="relative mb-4 overflow-hidden rounded-2xl bg-slate-950 p-4 text-white shadow-lg shadow-slate-950/10">

            {/* glow */}

            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

            <div className="relative">

              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">

                <Sparkles
                  size={15}
                  strokeWidth={1.8}
                />

              </div>

              <p className="text-xs font-semibold text-white">
                Nexora Workspace
              </p>

              <p className="mt-1 text-[10px] leading-4 text-slate-400">
                Manage your workspace from one place.
              </p>

            </div>

          </div>


          {/* Divider */}

          <div className="mb-3 h-px bg-slate-200" />


          {/* Logout */}

          <button
            onClick={() => {
              axios
                .post(
                  import.meta.env.VITE_BACKEND_URL +
                    "/auth/logout",
                  {},
                  {
                    withCredentials: true,
                  }
                )
                .then(() => {
                  toast.success("User logged out");
                  nav("/login");
                });
            }}
            className="group cursor-pointer flex w-full items-center gap-3 rounded-2xl p-2 transition-all duration-300 hover:bg-red-50"
          >

            {/* icon */}

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all duration-300 group-hover:bg-red-100 group-hover:text-red-600">

              <LogOut
                size={17}
                strokeWidth={1.8}
              />

            </div>


            {/* text */}

            <div className="flex-1 text-left">

              <p className="text-sm font-semibold text-slate-600 transition-colors group-hover:text-red-600">
                Sign out
              </p>

              <p className="text-[10px] text-slate-400 group-hover:text-red-400">
                End current session
              </p>

            </div>


            <ChevronRight
              size={15}
              className="text-slate-300 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-red-400 group-hover:opacity-100"
            />

          </button>

        </div>

      </div>
    </aside>
  );
};

export default Sidebar;