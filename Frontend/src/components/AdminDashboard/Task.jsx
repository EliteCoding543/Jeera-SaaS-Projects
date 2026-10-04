import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ClipboardList,
  Building2,
  CalendarDays,
  Flag,
  Plus,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";

import TaskModal from "../../comonComp/TaskModal";
import EmployeeViewModal from "../../comonComp/EmployeeViewModal";

import { deletedAdminTask } from "../../API's/adminTask";
import { deleteAdminTask } from "../../utlis/Redux/adminTaskSlice";

import toast from "react-hot-toast";

const Task = () => {
  // =====================================================
  // MODAL STATE
  // =====================================================

  const [openModal, setOpenModal] = useState(false);

  const [viewEmployee, setViewEmployee] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [modalMode, setModalMode] = useState("view");
  const [deletingTaskId, setDeletingTaskId] = useState(null);

  const dispatch = useDispatch();

  // =====================================================
  // REDUX DATA
  // =====================================================

  const { employee = [] } = useSelector(
    (store) => store.employee
  );

  const { task = [], totalTask = 0 } = useSelector(
    (store) => store.task
  );

  const organizationName = useSelector(
    (store) => store.user?.organizationId?.name
  );

  // =====================================================
  // VIEW TASK
  // =====================================================

  const handleViewTask = (item) => {
    console.log("View Task:", item);

    setSelectedEmployee(item);
    setModalMode("view");
    setViewEmployee(true);
  };

  // =====================================================
  // EDIT TASK
  // =====================================================

  const handleEditTask = (item) => {
    console.log("Edit Task:", item);

    setSelectedEmployee(item);
    setModalMode("edit");
    setViewEmployee(true);
  };

  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDeleteTask = async (taskId) => {
    try {
      setDeletingTaskId(taskId);
      await deletedAdminTask(taskId);

      dispatch(deleteAdminTask(taskId));

      toast.success("Task is deleted successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete task"
      );
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <main className="min-w-0 flex-1 bg-slate-50 px-4 py-6 lg:px-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="mb-6">

        <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-[0_15px_45px_rgba(15,23,42,0.15)]">

          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-slate-700/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-24 left-1/3 h-52 w-52 rounded-full bg-slate-800/40 blur-3xl" />

          <div className="relative px-6 py-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              {/* LEFT */}
              <div>

                {/* Breadcrumb */}
                <div className="mb-3 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10">
                    <ClipboardList className="h-4 w-4 text-white" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Workspace
                  </span>

                  <span className="text-slate-600">
                    /
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-300">
                    Tasks
                  </span>

                </div>

                {/* TITLE */}
                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    Tasks
                  </h1>

                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400">

                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />

                    Task Management

                  </span>

                </div>

                <p className="mt-2 max-w-xl text-sm text-slate-400">
                  Manage assigned tasks, priorities and progress
                  from one workspace.
                </p>

              </div>

              {/* TOTAL TASK */}
              <div className="w-fit rounded-xl border border-white/10 bg-white/5 px-5 py-3">

                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Total Tasks
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {totalTask}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          TASK TABLE CONTAINER
      ===================================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* =================================================
            TABLE TOP
        ================================================= */}

        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">

          <div>

            <h2 className="text-base font-bold text-slate-950">
              All Tasks
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              View and manage workspace tasks.
            </p>

          </div>

          {/* CREATE TASK */}

          <button
            onClick={() => setOpenModal(true)}
            type="button"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-lg bg-slate-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
          >

            <Plus className="h-4 w-4" />

            Create Task

          </button>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="overflow-x-auto">

          <table className="min-w-262.5 w-full text-left">

            {/* =================================================
                TABLE HEAD
            ================================================= */}

            <thead className="border-b border-slate-100 bg-slate-50">

              <tr>

                <th className="w-[28%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Task
                </th>

                <th className="w-[17%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Employee
                </th>

                <th className="w-[15%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Organization
                </th>

                <th className="w-[10%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Priority
                </th>

                <th className="w-[10%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="w-[10%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Due Date
                </th>

                <th className="w-[10%] whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>

              </tr>

            </thead>

            {/* =================================================
                TABLE BODY
            ================================================= */}

            <tbody className="divide-y divide-slate-100">

              {task.length > 0 ? (

                task.map((item) => (

                  <tr
                    key={item._id}
                    className="group transition-colors hover:bg-slate-50/80"
                  >

                    {/* =================================================
                        TASK
                    ================================================= */}

                    <td className="px-4 py-4">

                      <div className="flex min-w-0 items-center gap-2.5">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">

                          <ClipboardList className="h-3.5 w-3.5" />

                        </div>

                        <div className="min-w-0">

                          <p
                            title={item.title}
                            className="max-w-62.5 truncate text-sm font-semibold text-slate-900"
                          >
                            {item.title}
                          </p>

                          <p
                            title={item.description}
                            className="mt-0.5 max-w-62.5 truncate text-[11px] text-slate-400"
                          >
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* =================================================
                        EMPLOYEE
                    ================================================= */}

                    <td className="px-4 py-4">

                      <div className="flex min-w-0 items-center gap-2">

                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">

                          {item.assignedTo?.name
                            ? item.assignedTo.name
                                .charAt(0)
                                .toUpperCase()
                            : "E"}

                        </div>

                        <p
                          title={item.assignedTo?.name}
                          className="max-w-30 truncate text-xs font-semibold text-slate-700"
                        >
                          {item.assignedTo?.name || "Employee"}
                        </p>

                      </div>

                    </td>

                    {/* =================================================
                        ORGANIZATION
                    ================================================= */}

                    <td className="px-4 py-4">

                      <div className="flex min-w-0 items-center gap-1.5">

                        <Building2 className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                        <span
                          title={
                            item.organizationId?.name ||
                            organizationName ||
                            "Organization"
                          }
                          className="max-w-30 truncate text-xs font-medium text-slate-600"
                        >
                          {item.organizationId?.name ||
                            organizationName ||
                            "Organization"}
                        </span>

                      </div>

                    </td>

                    {/* =================================================
                        PRIORITY
                    ================================================= */}

                    <td className="px-4 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                          item.priority === "high"
                            ? "bg-red-50 text-red-600"
                            : item.priority === "medium"
                            ? "bg-amber-50 text-amber-600"
                            : "bg-emerald-50 text-emerald-600"
                        }`}
                      >

                        <Flag className="h-3 w-3" />

                        {item.priority}

                      </span>

                    </td>

                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <td className="px-4 py-4">

                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                          item.status === "completed"
                            ? "bg-emerald-50 text-emerald-600"
                            : item.status === "in-progress"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >

                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.status === "completed"
                              ? "bg-emerald-500"
                              : item.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-amber-500"
                          }`}
                        />

                        {item.status === "in-progress"
                          ? "In Progress"
                          : item.status}

                      </span>

                    </td>

                    {/* =================================================
                        DUE DATE
                    ================================================= */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-500">

                        <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />

                        {item.dueDate
                          ? new Date(
                              item.dueDate
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}

                      </div>

                    </td>

                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <td className="px-4 py-4">

                      <div className="flex items-center gap-1.5">

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() => handleViewTask(item)}
                          title="View Task"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                        >

                          <Eye className="h-3.5 w-3.5" />

                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() => handleEditTask(item)}
                          title="Edit Task"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                        >

                          <Pencil className="h-3.5 w-3.5" />

                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteTask(item._id)
                          }
                          disabled={deletingTaskId === item._id}
                          title="Delete Task"
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >

                          {deletingTaskId === item._id ? (
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                /* =================================================
                    EMPTY STATE
                ================================================= */

                <tr>

                  <td
                    colSpan={7}
                    className="px-6 py-14 text-center"
                  >

                    <div className="flex flex-col items-center justify-center">

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">

                        <ClipboardList className="h-5 w-5 text-slate-400" />

                      </div>

                      <h3 className="mt-3 text-sm font-bold text-slate-900">
                        No tasks found
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Create a task to see it here.
                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================================
          CREATE TASK MODAL
      ===================================================== */}

      {openModal && (
        <TaskModal
          setOpenModal={setOpenModal}
          employee={employee}
        />
      )}

      {/* =====================================================
          VIEW / EDIT MODAL
      ===================================================== */}

      {viewEmployee && (
        <EmployeeViewModal
          setViewEmployee={setViewEmployee}
          employee={selectedEmployee}
          setModalMode={setModalMode}
          modalMode={modalMode}
        />
      )}

    </main>
  );
};

export default Task;
