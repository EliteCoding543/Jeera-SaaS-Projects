import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  X,
  ClipboardList,
  User,
  AlignLeft,
  Flag,
  CircleDot,
} from "lucide-react";
import { createTask } from "../API's/Task";
import { useDispatch } from "react-redux";
import { addAdminSingleTask } from "../utlis/Redux/adminTaskSlice";

const TaskModal = ({ setOpenModal, employee }) => {
  const taskRef = useRef(null);
  const descRef = useRef(null);
  const employeeRef = useRef(null);
  const priorityRef = useRef(null);
  const statusRef = useRef(null);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async () => {
    const employeeId = employeeRef.current.value;
    const task = taskRef.current.value.trim();
    const desc = descRef.current.value.trim();
    const priority = priorityRef.current.value;
    const status = statusRef.current.value;

    if (!employeeId) {
      return toast.error("Please select employee");
    }

    if (!task || !desc) {
      return toast.error("Please enter all fields");
    }

    if (!priority) {
      return toast.error("Please select priority");
    }

    try {
      setLoading(true);
      const res = await createTask(employeeId, {
        title: task,
        description: desc,
        priority,
        status,
      });

      const createdTask = res.data.data;
      const selectedEmployee = employee.find((item) => item._id === employeeId);
      dispatch(
        addAdminSingleTask({
          ...createdTask,
          assignedTo: createdTask.assignedTo?.name
            ? createdTask.assignedTo
            : selectedEmployee || createdTask.assignedTo,
        })
      );

      // console.log(res.data);

      toast.success("Task created successfully");
      setOpenModal(false);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setOpenModal(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
    >
      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.25)]"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-slate-950 px-7 py-6">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Create Task
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Assign a new task to an employee.
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 px-7 py-7">
          {/* Employee */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <User className="h-3.5 w-3.5" />
              Assign Employee
            </label>

            <select
              ref={employeeRef}
              defaultValue=""
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            >
              <option value="" disabled>
                Select employee
              </option>

              {employee.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <ClipboardList className="h-3.5 w-3.5" />
              Task Title
            </label>

            <input
              ref={taskRef}
              type="text"
              placeholder="Enter task title"
              maxLength={100}
              className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <AlignLeft className="h-3.5 w-3.5" />
              Description
            </label>

            <textarea
              ref={descRef}
              rows={4}
              maxLength={300}
              placeholder="Describe the task..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          {/* Priority + Status */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Priority */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Flag className="h-3.5 w-3.5" />
                Priority
              </label>

              <select
                ref={priorityRef}
                defaultValue=""
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="" disabled>
                  Select priority
                </option>

                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <CircleDot className="h-3.5 w-3.5" />
                Status
              </label>

              <select
                ref={statusRef}
                defaultValue="todo"
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              >
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              Cancel
            </button>

            <button
              onClick={handleCreateTask}
              type="button"
              disabled={loading}
              className="rounded-xl bg-slate-950 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
