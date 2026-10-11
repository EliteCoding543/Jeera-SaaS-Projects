import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07090d] px-6 text-white">

      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-125 w-125 rounded-full bg-blue-600/20 blur-[140px]" />
        <div className="absolute -bottom-45 -right-25 h-125 w-125 rounded-full bg-indigo-600/15 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md text-center">

        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-400/10 bg-blue-500/10">
          <SearchX size={26} className="text-blue-400" />
        </div>

        <h1 className="bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-8xl font-bold tracking-tight text-transparent">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight">
          Page not found
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          The page you are looking for does not exist, was moved,
          or you may have typed the wrong address.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <button
            onClick={() => nav(-1)}
            className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.035] px-5 text-sm font-medium text-gray-300 transition hover:bg-white/[0.07] sm:w-auto"
          >
            <ArrowLeft size={16} />
            Go back
          </button>

          <Link
            to="/"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-semibold text-black shadow-xl shadow-white/5 transition hover:bg-gray-200 sm:w-auto"
          >
            <Home size={16} />
            Back to home
          </Link>

        </div>

      </div>
    </div>
  );
};

export default NotFound;