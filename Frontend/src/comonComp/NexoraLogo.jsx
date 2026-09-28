import React from "react";
import { Link } from "react-router-dom";

const NexoraLogo = () => {
  return (
    <>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-slate-50 shadow-lg shadow-slate-900/20">
          <div className="h-4 w-4 rotate-45 rounded-sm bg-slate-950" />
          <div className="absolute h-2 w-2 rounded-full bg-slate-50" />
        </div>

        <div>
          <span className="text-[19px] font-bold tracking-tight text-slate-50">
            Nexora
          </span>

          <span className="ml-2 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:inline">
            Workspace
          </span>
        </div>
      </Link>
    </>
  );
};

export default NexoraLogo;