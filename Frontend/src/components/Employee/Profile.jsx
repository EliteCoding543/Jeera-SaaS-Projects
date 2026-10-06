import React from "react";
import {
  UserRound,
  Mail,
  Building2,
  CalendarCheck2,
  Clock3,
  CheckCircle2,
  TrendingUp,
  BriefcaseBusiness,
} from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
    const  user  = useSelector((store) => store.user)

  return (
    <div className="min-h-[calc(100vh-64px)] w-full bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-indigo-600">
            Employee Account
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your profile, attendance and daily work activity.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          {/* Banner */}
          <div className="h-32 bg-linear-to-r from-slate-950 via-slate-800 to-indigo-900 sm:h-40" />

          <div className="px-5 pb-6 sm:px-8">

            {/* Avatar */}
            <div className="-mt-12 flex items-end sm:-mt-14">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-3xl font-bold text-slate-700 shadow-lg sm:h-28 sm:w-28">
                {user.name.charAt(0)}
              </div>
            </div>

            {/* Profile Basic Info */}
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Software Developer • {user.role}
                </p>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Active
              </div>

            </div>

            {/* Profile Details */}
            <div className="mt-6 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-4">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Email
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                  <Building2 size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Organization
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {user.organizationId.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                  <BriefcaseBusiness size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Role
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                   {user.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5 text-slate-600">
                  <UserRound size={18} />
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Employee ID
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    {user._id.slice(0, 5)}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Attendance Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <CalendarCheck2 size={21} />
              </div>

              <TrendingUp size={17} className="text-emerald-500" />
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              92%
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Attendance
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              8h 24m
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Average Working Time
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                <CheckCircle2 size={21} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              18
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Days Present
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <Clock3 size={21} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              2
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Leave Days
            </p>
          </div>

        </div>

        {/* Analytics */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">

          {/* Attendance Graph */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-2">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">
                  Weekly Attendance
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your attendance for the current week
                </p>
              </div>

              <span className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                This Week
              </span>
            </div>

            {/* Graph */}
            <div className="mt-8 flex h-56 items-end justify-between gap-3 border-b border-slate-200 px-2">

              {/* Monday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-indigo-500" style={{ height: "82%" }} />
                <span className="text-xs text-slate-400">Mon</span>
              </div>

              {/* Tuesday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-indigo-500" style={{ height: "92%" }} />
                <span className="text-xs text-slate-400">Tue</span>
              </div>

              {/* Wednesday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-indigo-500" style={{ height: "76%" }} />
                <span className="text-xs text-slate-400">Wed</span>
              </div>

              {/* Thursday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-indigo-500" style={{ height: "95%" }} />
                <span className="text-xs text-slate-400">Thu</span>
              </div>

              {/* Friday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-indigo-500" style={{ height: "88%" }} />
                <span className="text-xs text-slate-400">Fri</span>
              </div>

              {/* Saturday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-slate-200" style={{ height: "35%" }} />
                <span className="text-xs text-slate-400">Sat</span>
              </div>

              {/* Sunday */}
              <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="w-full max-w-10 rounded-t-lg bg-slate-200" style={{ height: "25%" }} />
                <span className="text-xs text-slate-400">Sun</span>
              </div>

            </div>
          </div>

          {/* Today's Status */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="font-bold text-slate-900">
              Today's Status
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Your current work activity
            </p>

            <div className="mt-6 rounded-2xl bg-emerald-50 p-5">

              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-3 text-emerald-600 shadow-sm">
                  <CheckCircle2 size={22} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    Present
                  </p>

                  <p className="text-xs text-emerald-600">
                    Working today
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-emerald-600">
                  Working Hours
                </p>

                <p className="mt-1 text-2xl font-bold text-emerald-900">
                  6h 42m
                </p>
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-emerald-100">
                <div className="h-full w-[78%] rounded-full bg-emerald-500" />
              </div>

              <div className="mt-2 flex justify-between text-xs text-emerald-600">
                <span>09:18 AM</span>
                <span>Expected 8h</span>
              </div>

            </div>

          </div>
        </div>

        {/* Daily Status */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">
            <h2 className="font-bold text-slate-900">
              Daily Status
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Recent attendance and work status
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-medium text-emerald-600">
                Monday
              </p>

              <p className="mt-2 font-bold text-emerald-800">
                Present
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                8h 12m
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-medium text-emerald-600">
                Tuesday
              </p>

              <p className="mt-2 font-bold text-emerald-800">
                Present
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                8h 34m
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-medium text-emerald-600">
                Wednesday
              </p>

              <p className="mt-2 font-bold text-emerald-800">
                Present
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                7h 56m
              </p>
            </div>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-medium text-emerald-600">
                Thursday
              </p>

              <p className="mt-2 font-bold text-emerald-800">
                Present
              </p>

              <p className="mt-1 text-xs text-emerald-600">
                8h 45m
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-medium text-blue-600">
                Today
              </p>

              <p className="mt-2 font-bold text-blue-800">
                Working
              </p>

              <p className="mt-1 text-xs text-blue-600">
                6h 42m
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;