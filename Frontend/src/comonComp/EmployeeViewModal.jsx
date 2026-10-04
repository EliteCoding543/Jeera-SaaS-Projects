import React, { useEffect, useState } from "react";
import { updatedAdminTask } from "../API's/adminTask";
import { useDispatch } from "react-redux";
import { updateAdminTask } from "../utlis/Redux/adminTaskSlice";

const EmployeeViewModal = ({
  setViewEmployee,
  modalMode,
  employee,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    assignedTo: "",
  });

  // Selected task aate hi form fill karo
  useEffect(() => {
    if (employee) {
      setFormData({
        title: employee?.title || "",
        description: employee?.description || "",
        status: employee?.status || "todo",
        priority: employee?.priority || "medium",
        assignedTo: employee?.assignedTo?._id || employee?.assignedTo || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
    //   console.log("Task ID:", employee?._id);
    //   console.log("Form Data:", formData);

      const res = await updatedAdminTask(
        employee._id,
        formData
      );

    //   console.log("Update Response:", res.data);

      dispatch(updateAdminTask(res.data.data));

      setViewEmployee(false);
    } catch (error) {
      console.log(
        "UPDATE ERROR:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {modalMode === "view" ? (
        /* ================= VIEW MODE ================= */
        <div
          onClick={() => setViewEmployee(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Task Details
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  View task information
                </p>
              </div>

              <button
                onClick={() => setViewEmployee(false)}
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Task Header */}
              <div className="mb-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">
                  {employee?.title?.charAt(0)?.toUpperCase() || "T"}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-base font-bold text-slate-900">
                    {employee?.title || "Task Name"}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Assigned to:{" "}
                    {employee?.assignedTo?.name || "Employee"}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Employee */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Employee
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {employee?.assignedTo?.name || "Employee"}
                  </p>
                </div>

                {/* Organization */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Organization
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {employee?.organizationId?.name ||
                      "Organization"}
                  </p>
                </div>

                {/* Priority */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Priority
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-bold capitalize ${
                      employee?.priority === "high"
                        ? "bg-red-50 text-red-600"
                        : employee?.priority === "medium"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {employee?.priority || "Not Set"}
                  </span>
                </div>

                {/* Status */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </p>

                  <span
                    className={`mt-2 inline-flex rounded-full px-3 py-1 text-[10px] font-bold capitalize ${
                      employee?.status === "completed"
                        ? "bg-emerald-50 text-emerald-600"
                        : employee?.status === "in-progress"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {employee?.status === "in-progress"
                      ? "In Progress"
                      : employee?.status || "Not Set"}
                  </span>
                </div>

                {/* Due Date */}
                <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Due Date
                  </p>

                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {employee?.dueDate
                      ? new Date(
                          employee.dueDate
                        ).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "No due date"}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Description
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {employee?.description ||
                    "No description available."}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={() => setViewEmployee(false)}
                type="button"
                className="cursor-pointer rounded-lg bg-slate-950 px-5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* ================= EDIT MODE ================= */
        <div
          onClick={() => setViewEmployee(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-5">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-900">
                  Edit Task
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Update task information
                </p>
              </div>

              <button
                onClick={() => setViewEmployee(false)}
                type="button"
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Task Title */}
              <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Task Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Task Title"
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-slate-400"
                />
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Employee */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Employee
                  </p>

                  <input
                    type="text"
                    value={
                      employee?.assignedTo?.name || ""
                    }
                    readOnly
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 outline-none"
                  />
                </div>

                {/* Organization */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Organization
                  </p>

                  <input
                    type="text"
                    value={
                      employee?.organizationId?.name || ""
                    }
                    readOnly
                    className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 outline-none"
                  />
                </div>

                {/* Priority */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Priority
                  </p>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-slate-400"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Status */}
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Status
                  </p>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="mt-2 w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-slate-400"
                  >
                    <option value="todo">Todo</option>
                    <option value="in-progress">
                      In Progress
                    </option>
                    <option value="completed">
                      Completed
                    </option>
                  </select>
                </div>

                {/* Due Date */}
                <div className="rounded-xl border border-slate-200 p-4 sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Due Date
                  </p>

                  <input
                    type="date"
                    name="dueDate"
                    value={
                      employee?.dueDate
                        ? new Date(employee.dueDate)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    }
                    readOnly
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mt-4 rounded-xl border border-slate-200 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Description
                </p>

                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Task description"
                  className="mt-2 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm leading-6 text-slate-600 outline-none focus:border-slate-400"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                onClick={() => setViewEmployee(false)}
                type="button"
                className="cursor-pointer rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
              onClick={handleSave}
              type="button"
              disabled={loading}
                className="cursor-pointer rounded-lg bg-slate-950 px-5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeViewModal;
