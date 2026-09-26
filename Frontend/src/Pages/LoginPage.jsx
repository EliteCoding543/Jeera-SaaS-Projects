import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import  toast  from "react-hot-toast";
import axios from 'axios'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Users,
  CheckCircle2,
  BarChart3,
  Sparkles,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const nav = useNavigate()
  const[formData , setFormData] = useState({
    email : "",
    password : ""
  })

  const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name] : e.target.value
      })
  }
  // Handle Sumbit hone par

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    console.log(res.data);

    nav("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(
      error.response?.data?.message || "Invalid Credentials"
    );
  }
};
  return (
    <div className="min-h-screen bg-[#07090d] text-white flex overflow-hidden">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden p-8">

        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-125 h-125 bg-blue-600/20 blur-[140px] rounded-full" />

          <div className="absolute -bottom-45 -right-25 w-125 h-125 bg-indigo-600/15 blur-[140px] rounded-full" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Left Content */}
        <div className="relative z-10 w-full flex flex-col">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-white shadow-lg shadow-slate-900/20">
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

          {/* Hero */}
          <div className="flex-1 flex flex-col justify-center max-w-xl px-8">

            <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border border-blue-400/10 bg-blue-400/5 text-blue-300 text-xs mb-6">
              <Sparkles size={13} />
              Built for modern teams
            </div>

            <h2 className="text-5xl xl:text-6xl font-bold tracking-[-0.045em] leading-[1.05]">
              One workspace.
              <br />

              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
                Every team aligned.
              </span>
            </h2>

            <p className="text-gray-500 text-base leading-7 mt-6 max-w-lg">
              Manage your organization, teams, employees and tasks
              from one powerful workspace designed to keep work moving.
            </p>

            {/* Feature Points */}
            <div className="grid grid-cols-2 gap-4 mt-9">

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <Users size={17} className="text-blue-400" />
                </div>

                <span className="text-sm text-gray-400">
                  Team Management
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <CheckCircle2 size={17} className="text-green-400" />
                </div>

                <span className="text-sm text-gray-400">
                  Task Tracking
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <ShieldCheck size={17} className="text-purple-400" />
                </div>

                <span className="text-sm text-gray-400">
                  Role Based Access
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
                  <BarChart3 size={17} className="text-orange-400" />
                </div>

                <span className="text-sm text-gray-400">
                  Team Insights
                </span>
              </div>

            </div>

            {/* Mini Dashboard */}
            <div className="mt-12 relative">

              <div className="absolute inset-0 bg-blue-500/10 blur-[70px]" />

              <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4 shadow-2xl">

                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-4">

                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">
                      Workspace
                    </p>

                    <p className="text-sm font-semibold mt-1">
                      Team Overview
                    </p>
                  </div>

                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-[#11151c]" />
                    <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-[#11151c]" />
                    <div className="w-7 h-7 rounded-full bg-orange-400 border-2 border-[#11151c]" />
                    <div className="w-7 h-7 rounded-full bg-green-500 border-2 border-[#11151c] text-[8px] flex items-center justify-center">
                      +8
                    </div>
                  </div>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">

                  <div className="rounded-xl bg-white/[0.035] border border-white/5 p-3">
                    <p className="text-xl font-bold">12</p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      Teams
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.035] border border-white/5 p-3">
                    <p className="text-xl font-bold">84</p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      Employees
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/[0.035] border border-white/5 p-3">
                    <p className="text-xl font-bold">92%</p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      Completed
                    </p>
                  </div>

                </div>

                {/* Progress */}
                <div className="mt-4 p-4 rounded-xl bg-white/2.5 border border-white/5">

                  <div className="flex justify-between mb-3">
                    <span className="text-xs text-gray-500">
                      Project progress
                    </span>

                    <span className="text-xs text-blue-400">
                      78%
                    </span>
                  </div>

                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-[78%] bg-linear-to-r from-blue-500 to-indigo-500 rounded-full" />
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* Bottom */}
          <div className="px-8 text-xs text-gray-700">
            © 2026 Nexora. Built for teams that move fast.
          </div>

        </div>
      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="w-full lg:w-[48%] flex items-center justify-center px-6 py-10 relative">

        {/* Mobile Background */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-600/15 blur-[140px] rounded-full" />

          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-8">

            <Link to="/" className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white text-black flex items-center justify-center font-black text-lg">
                N
              </div>

              <div>
                <h1 className="font-bold text-lg">
                  Nexora
                </h1>

                <p className="text-[9px] text-gray-500 tracking-[0.25em] uppercase">
                  Team Workspace
                </p>
              </div>

            </Link>

          </div>


          {/* Login Card */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-2xl p-7 sm:p-9 shadow-2xl">

            {/* Heading */}
            <div className="mb-8">

              <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center mb-5">
                <LockKeyhole
                  size={21}
                  className="text-blue-400"
                />
              </div>

              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                Sign in to access your workspace.
              </p>

            </div>


            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>

                <label className="block text-sm text-gray-300 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-white/10 bg-black/20 text-white placeholder:text-gray-700 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm text-gray-300">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-400 hover:text-blue-300 transition"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <LockKeyhole
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  />

                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-12 pl-11 pr-12 rounded-xl border border-white/10 bg-black/20 text-white placeholder:text-gray-700 outline-none focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/10 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

              </div>


              {/* Remember */}
              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-blue-500"
                />

                <span className="text-xs text-gray-500">
                  Remember me
                </span>

              </div>


              {/* Submit */}
              <button
                type="submit"
                className="group w-full h-12 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition shadow-xl shadow-white/5"
              >
                Sign in

                <ArrowRight
                  size={17}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

            </form>


            {/* Security */}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-7">

              <ShieldCheck
                size={15}
                className="text-green-400"
              />

              Secure authentication

            </div>

          </div>



          {/* Back */}
          <div className="text-center mt-5">

            <Link
              to="/"
              className="text-xs text-gray-600 hover:text-gray-400 transition"
            >
              ← Back to home
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;