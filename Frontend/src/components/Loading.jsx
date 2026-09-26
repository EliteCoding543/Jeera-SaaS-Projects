import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center">

        {/* Loader */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />

          <LoaderCircle
            size={32}
            strokeWidth={2}
            className="animate-spin text-slate-950"
          />
        </div>

        {/* Brand */}
        <div className="mt-5 text-center">
          <h2 className="text-lg font-bold tracking-tight text-slate-950">
            Nexora
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Loading your workspace...
          </p>
        </div>

      </div>
    </div>
  );
};

export default Loading;