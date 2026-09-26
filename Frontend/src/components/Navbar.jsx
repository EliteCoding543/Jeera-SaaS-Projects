import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom'
import { ArrowRight, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const nav = useNavigate()

  return (
    <div>
      {/* ================= NAVBAR ================= */}

      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/60 bg-white/75 backdrop-blur-2xl">
        <div className="mx-auto flex h-19 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-slate-950 shadow-lg shadow-slate-900/20">
              <div className="h-4 w-4 rotate-45 rounded-sm bg-white" />
              <div className="absolute h-2 w-2 rounded-full bg-slate-950" />
            </div>

            <div>
              <span className="text-[19px] font-bold tracking-tight text-slate-950">
                Nexora
              </span>

              <span className="ml-2 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline">
                Workspace
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {["Features", "How it works", "Access control", "Pricing"].map(
              (item, index) => (
                <a
                  key={item}
                  href={
                    index === 0
                      ? "#features"
                      : index === 1
                        ? "#workflow"
                        : index === 2
                          ? "#access"
                          : "#pricing"
                  }
                  className="text-[13px] font-medium text-slate-500 transition hover:text-slate-950"
                >
                  {item}
                </a>
              )
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 md:flex">
            <button 
              onClick={() => nav("login")}
              className="rounded-xl cursor-pointer px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
              Sign in
            </button>

            <button className="group flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800">
              Get started

              <ArrowRight
                size={15}
                className="transition group-hover:translate-x-1"
              />
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm md:hidden"
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div className="border-t border-slate-200 bg-white px-5 py-5 shadow-xl md:hidden">
            <div className="flex flex-col gap-1">

              {["Features", "How it works", "Access control", "Pricing"].map(
                (item) => (
                  <a
                    key={item}
                    href={
                      item === "Features"
                        ? "#features"
                        : item === "How it works"
                          ? "#workflow"
                          : item === "Access control"
                            ? "#access"
                            : "#pricing"
                    }
                    onClick={() => setMobileMenu(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  >
                    {item}
                  </a>
                )
              )}

              <div className="mt-3 border-t border-slate-100 pt-4">

                <button className="mb-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold">
                  Sign in
                </button>

                <button className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white">
                  Get started
                </button>

              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;