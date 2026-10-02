import React from "react";
import { UserCheck, Mail, Building2, X } from "lucide-react";

const ViewAdminModal = ({ admin, setViewAdmin }) => {
  return (
    <div
      onClick={() => setViewAdmin(null)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.2)]"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserCheck size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Administrator Details
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Administrator information
              </p>
            </div>
          </div>

          <button
            onClick={() => setViewAdmin(null)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4 p-6">

          {/* Name */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <UserCheck size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Name
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {admin?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <Mail size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-bold text-slate-900">
                  {admin?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Organization */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                <Building2 size={17} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Organization
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {admin?.organizationId?.name || "N/A"}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-6 py-4">
          <button
            onClick={() => setViewAdmin(null)}
            className="cursor-pointer rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAdminModal;