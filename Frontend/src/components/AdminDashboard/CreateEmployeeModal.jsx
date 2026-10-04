import React, { useRef, useState } from "react";
import { UserCheck, X } from "lucide-react";
import toast from "react-hot-toast";
import { createEmployee } from "../../API's/employee";

const CreateEmployeeModal = ({
  editEmploye,
  setOpenModal,
  teams = [],
}) => {
  const [formData, setFormData] = useState({
    name: editEmploye?.name || "",
    email: editEmploye?.email || "",
    teamId: editEmploye?.teamId || "",
  });

  const [loading, setLoading] = useState(false);

  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const teamId = formData.teamId;
    const password = passwordRef.current?.value || "";

    if (!name) {
      return toast.error("Please enter employee name");
    }

    if (!email) {
      return toast.error("Please enter employee email");
    }

    if (!editEmploye && !password) {
      return toast.error("Please enter password");
    }

    if (!teamId) {
      return toast.error("Please select a team");
    }

    try {
      setLoading(true);

      if (editEmploye) {
        // Edit API baad mein add karenge
        toast.error("Edit employee API not added yet");
        return;
      }

      const res = await createEmployee(teamId, {
        name,
        email,
        password,
      });

      toast.success(
        res.data.message || "Employee created successfully"
      );

      setOpenModal(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to create employee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setOpenModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.2)]"
      >

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserCheck size={20} />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                {editEmploye
                  ? "Edit Employee"
                  : "Create Employee"}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {editEmploye
                  ? "Update employee information."
                  : "Add an employee to a team."}
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setOpenModal(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={18} />
          </button>

        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="space-y-5 p-6">

            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Employee Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter employee name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                placeholder="employee@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Password */}
            {!editEmploye && (
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Password
                </label>

                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Create a secure password"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                />
              </div>
            )}

            {/* Team */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Team
              </label>

              <select
                value={formData.teamId}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    teamId: e.target.value,
                  })
                }
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              >
                <option value="">
                  Select Team
                </option>

                {teams
                  .filter((team) => team.isActive)
                  .map((team) => (
                    <option
                      key={team._id}
                      value={team._id}
                    >
                      {team.name}
                    </option>
                  ))}
              </select>
            </div>

          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">

            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="cursor-pointer rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating..."
                : editEmploye
                ? "Update Employee"
                : "Create Employee"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeModal;