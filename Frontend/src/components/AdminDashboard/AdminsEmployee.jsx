import React, { useState } from "react";
import CreateEmployeeModal from "./CreateEmployeeModal";
import { useDispatch, useSelector } from "react-redux";
import { activeEmployee, deActiveEmployee } from "../../API's/employee";
import { updateEmployeeStatus } from "../../utlis/Redux/employeeSlice";
import toast from "react-hot-toast";

const AdminsEmployee = ({
  employee = [],
  totalEmployee = 0,
}) => {
  const [editEmploye, setEditEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [employeeLoadingId, setEmployeeLoadingId] = useState(null);
  const dispatch = useDispatch(null)
  const { teams = [] } = useSelector(
    (store) => store.teams
  );

  // Handle Change Status
  const handleChangeStatus = async(employee) => {
   if (employeeLoadingId === employee._id) return;
   try {
      setEmployeeLoadingId(employee._id);
      if(employee.isActive){
        await deActiveEmployee(employee._id)

        dispatch(updateEmployeeStatus({
          employeeId : employee._id,
          isActive : false
        }))
        toast.success(`${employee.name} is deactivated successfully`)
      }
      else {
        await activeEmployee(employee._id)

        dispatch(updateEmployeeStatus({
          employeeId : employee._id,
          isActive : true
        }))
        toast.success(`${employee.name} is activated successfully`)
      }
   } catch (error) {
      toast.success(error.message)
   } finally {
      setEmployeeLoadingId(null);
   }
  }
  return (
    <main className="min-w-0 flex-1 bg-slate-50 px-6 py-8 lg:px-8">

      {/* Header */}
      <div className="mb-8">
        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 shadow-[0_15px_45px_rgba(15,23,42,0.18)]">

          {/* Background glow */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-slate-700/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 left-1/3 h-60 w-60 rounded-full bg-slate-800/40 blur-3xl" />

          {/* Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/6 via-transparent to-transparent" />

          <div className="relative px-7 py-7 lg:px-8 lg:py-8">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              {/* LEFT */}
              <div>

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/10">
                    <div className="h-2.5 w-2.5 rounded-[3px] bg-white" />
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                    Workspace
                  </span>

                  <span className="text-slate-600">
                    /
                  </span>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                    Employees
                  </span>

                </div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-bold tracking-[-0.03em] text-white lg:text-[38px]">
                    Employees
                  </h1>

                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.1)]" />
                    Active
                  </span>

                </div>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                  Manage your workspace employees, organize team access,
                  and keep your workforce connected from one place.
                </p>

                <div className="mt-5 flex items-center gap-4">

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                    Employee management
                  </div>

                  <div className="h-3 w-px bg-slate-800" />

                  <span className="text-xs font-medium text-slate-500">
                    Workspace directory
                  </span>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex shrink-0 items-center gap-3">

                {/* Search */}
                <button
                  type="button"
                  className="hidden h-12 items-center gap-2 rounded-xl border border-white/10 bg-white/4 px-4 text-sm font-semibold text-slate-300 transition-all hover:border-white/20 hover:bg-white/8 hover:text-white sm:flex"
                >
                  <span className="text-lg text-slate-400">
                    ⌕
                  </span>

                  Search
                </button>

                {/* Add Employee */}
                <button
                  type="button"
                  onClick={() => {
                    setEditEmployee(null);
                    setOpenModal(true);
                  }}
                  className="group flex h-12 items-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 hover:shadow-xl"
                >

                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-950 text-lg leading-none text-white transition-transform duration-300 group-hover:rotate-90">
                    +
                  </span>

                  <span>
                    Add Employee
                  </span>

                </button>

              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total Employees
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-950">
            {totalEmployee}
          </p>
        </div>

        {/* Active */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Active
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-600">
            {employee.filter((item) => item.isActive).length}
          </p>
        </div>

        {/* Inactive */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Inactive
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-500">
            {employee.filter((item) => !item.isActive).length}
          </p>
        </div>

      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">

          <h2 className="text-lg font-bold text-slate-950">
            All Employees
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            View and manage workspace employees.
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-slate-50">
              <tr>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Employee
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Email
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Team
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>

              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">

              {employee.length > 0 ? (
                employee.map((item) => {

                  const team = teams.find(
                    (team) => team._id === item.teamId
                  );

                  return (
                    <tr
                      key={item._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* Employee */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                            {item.name?.charAt(0).toUpperCase()}
                          </div>

                          <div>

                            <p className="text-sm font-semibold text-slate-900">
                              {item.name}
                            </p>

                            <p className="text-xs text-slate-400">
                              Employee
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Email */}
                      <td className="px-6 py-5 text-sm text-slate-500">
                        {item.email}
                      </td>

                      {/* Team */}
                      <td className="px-6 py-5 text-sm font-medium text-slate-600">
                        {team?.name || "No Team"}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">

                        <span
                        onClick={() => handleChangeStatus(item)}
                          className={`inline-flex items-center gap-2 cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold ${
                            item.isActive
                              ? "bg-emerald-50 text-emerald-600"
                              : "bg-red-50 text-red-600"
                          }`}
                        >

                          <span
                           
                            className={`h-1.5 w-1.5 rounded-full  ${
                              item.isActive
                                ? "bg-emerald-900"
                                : "bg-red-500"
                            }`}
                          />

                          {employeeLoadingId === item._id ? (
                            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-r-transparent" />
                          ) : item.isActive ? "Active" : "Inactive"}

                        </span>

                      </td>

                      {/* Action */}
                      <td className="px-6 py-5">

                        <button
                          type="button"
                          onClick={() => {
                            setEditEmployee(item);
                            setOpenModal(true);
                          }}
                          className="text-sm font-semibold text-slate-500 transition hover:text-slate-950"
                        >
                          View
                        </button>

                      </td>

                    </tr>
                  );
                })
              ) : (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-slate-400"
                  >
                    No employees found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Create / Edit Employee Modal */}
      {openModal && (
        <CreateEmployeeModal
          editEmploye={editEmploye}
          setOpenModal={setOpenModal}
          teams={teams}
        />
      )}

    </main>
  );
};

export default AdminsEmployee;
