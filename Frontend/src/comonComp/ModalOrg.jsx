import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { createOrgs } from "../API's/organizationAPI";

const ModalOrg = ({ setIsModalOpen, setAllOrgs }) => {
  const orgNameRef = useRef(null);
  const statusRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (loading) return;

    const orgName = orgNameRef.current?.value.trim();

    if (!orgName) {
      return toast.error("Please enter Organization Name");
    }

    const isActive = statusRef.current?.checked ?? true;

    setLoading(true);

    try {
      const res = await createOrgs({
        name: orgName,
        isActive: isActive,
      });

      // Parent state update
      setAllOrgs((prev) => [
        res.data.data,
        ...prev,
      ]);

      toast.success(`${orgName} created successfully`);

      // API successful hone ke baad hi modal close
      setIsModalOpen(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create organization"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={() => {
        if (!loading) {
          setIsModalOpen(false);
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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
            type="button"
            disabled={loading}
            onClick={() => setIsModalOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ×
          </button>
        </div>

        {/* Input */}
        <div className="mt-6 flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Organization Name
            </label>

            <input
              ref={orgNameRef}
              type="text"
              placeholder="Enter organization name"
              disabled={loading}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/5 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Status */}
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

            <label className="relative inline-flex cursor-pointer items-center">
              <input
                ref={statusRef}
                type="checkbox"
                defaultChecked
                disabled={loading}
                className="peer sr-only"
              />

              <div className="h-6 w-11 rounded-full bg-slate-300 transition-colors duration-300 peer-checked:bg-emerald-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-500/20" />

              <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 peer-checked:translate-x-5" />
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => setIsModalOpen(false)}
            className="rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleCreate}
            className="rounded-xl cursor-pointer bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrg;