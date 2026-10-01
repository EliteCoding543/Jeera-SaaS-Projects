import React, { useState } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  Command,
  User,
  Settings,
  LogOut,
  Store,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import NexoraLogo from "../../comonComp/NexoraLogo";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [profileOpen, setProfileOpen] = useState(false);
  const data =  useSelector(Store => Store.user)
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      toast.success("Logged out successfully");
      nav("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };

  return (
    <nav className="sticky top-0 z-50 h-18.25 border-b border-slate-800/80 bg-slate-950 px-5 sm:px-6">

      <div className="flex h-full items-center justify-between">

        {/* Logo */}

        <NexoraLogo />


        {/* Center Search */}

        <div className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2">

          <div className="group flex h-10 w-90 items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-3.5 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/5.5 focus-within:border-white/16 focus-within:bg-white/6">

            <Search
              size={17}
              strokeWidth={1.8}
              className="shrink-0 text-slate-500 transition-colors group-focus-within:text-slate-300"
            />

            <input
              type="text"
              placeholder="Search workspace..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-600"
            />

            <div className="hidden items-center gap-1 rounded-md border border-white/8 bg-white/4 px-1.5 py-1 sm:flex">

              <Command
                size={11}
                className="text-slate-500"
              />

              <span className="text-[10px] font-semibold text-slate-500">
                K
              </span>

            </div>

          </div>

        </div>


        {/* Right Side */}

        <div className="flex items-center gap-2 sm:gap-4">

          {/* Mobile Search */}

          <button className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-white/6 hover:text-white md:hidden">

            <Search
              size={18}
              strokeWidth={1.8}
            />

          </button>


          {/* Notification */}

          <button className="group relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition-all duration-200 hover:bg-white/6 hover:text-white">

            <Bell
              size={18}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-rotate-6"
            />

            <span className="absolute right-2 top-1.7 flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />

              <span className="relative h-2 w-2 rounded-full bg-indigo-400 ring-2 ring-slate-950" />

            </span>

          </button>


          {/* Divider */}

          <div className="mx-1 hidden h-7 w-px bg-white/8 sm:block" />


          {/* Profile Wrapper */}


          <div className="relative">

            {/* Profile Button */}

            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="group flex items-center gap-2 rounded-xl p-1.5 pr-2 transition-all duration-200 hover:bg-white/6"
            >

              {/* Avatar */}

              <div className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-linear-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">

                <span className="absolute inset-px rounded-[10px] bg-linear-to-br from-white/20 to-transparent" />

                <span className="relative">
                  {data.name.charAt(0).toUpperCase()}
                </span>

                {/* Online */}

                <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />

              </div>

              {/* User Information */}

              <div className="hidden min-w-0 text-left sm:block">

                <p className="truncate text-xs font-semibold text-white">
                  {data.name}
                </p>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-500">
                  {data.role}
                </p>

              </div>

              <ChevronDown
                size={14}
                strokeWidth={2}
                className={`ml-1 text-slate-600 transition-all duration-200 group-hover:text-slate-300 ${
                  profileOpen ? "rotate-180 text-slate-300" : ""
                }`}
              />

            </button>


            {/* Logout Dropdown */}

            {profileOpen && (
              <div className="absolute right-0 top-14 z-50 w-48 rounded-2xl border border-white/10 bg-slate-900 p-2 shadow-2xl shadow-black/40">

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                >
                  <LogOut size={17} strokeWidth={1.8} />

                  <span>
                    Logout
                  </span>
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
};

export default Navbar;