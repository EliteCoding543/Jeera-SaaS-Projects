import React from "react";

const ModalOrg = ({ setIsModalOpen }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-950">
              Create Organization
            </h2>

            <p className="text-xs text-slate-500">
              Set up a new organization. You can add administrator next.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            ×
          </button>
        </div>

        {/* Organization Input */}

        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Organization Name
            </label>

            <input
              type="text"
              placeholder="Enter organization name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5"
            />
          </div>

          {/* Organization Status */}

          <div className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:border-slate-300 hover:bg-white">
            <div className="pr-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <h3 className="text-sm font-bold text-slate-900">
                  Active
                </h3>
              </div>

              <p className="mt-1 max-w-70 text-xs leading-5 text-slate-500">
                Active organizations can access their workspace, admins and
                employees.
              </p>
            </div>

            {/* Checkbox */}

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                defaultChecked
                className="peer sr-only"
              />

              <div className="h-6 w-11 rounded-full bg-slate-300 transition-colors duration-300 peer-checked:bg-emerald-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20" />

              <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
            </label>
          </div>
        </div>

        {/* Modal Actions */}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            className="rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrg;