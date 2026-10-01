import React, { useMemo, useState } from "react";
import {
  UsersRound,
  UserPlus,
  ShieldCheck,
  MoreHorizontal,
  ArrowUpRight,
  Building2,
  Pencil,
  Search,
  UserCheck,
  UserX,
  ChevronDown,
  Eye,
  Power,
} from "lucide-react";
import Modaladministrator from "../../comonComp/Modaladministrator";

const Administrator = ({
  analytics,
  allOrgs = [],
  setAdminsModal,
  adminisModal,
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);

  const totalAdmins = analytics?.totalAdmins || 0;

  const filteredOrganizations = useMemo(() => {
    return allOrgs.filter((org) => {
      const matchesSearch = org.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && org.isActive) ||
        (statusFilter === "inactive" && !org.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [allOrgs, search, statusFilter]);

  const handleEdit = (org) => {
    console.log("Edit administrator for:", org);
    setOpenMenu(null);
  };

  const handleView = (org) => {
    console.log("View administrators for:", org);
    setOpenMenu(null);
  };

  const handleToggleStatus = (org) => {
    console.log(
      `${org.isActive ? "Deactivate" : "Activate"} organization:`,
      org
    );
    setOpenMenu(null);
  };

  return (
    <main className="relative min-w-0 flex-1 bg-[#f5f7fb] p-4 sm:p-6 lg:p-8">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="relative mb-7 overflow-hidden rounded-[30px] bg-slate-950 px-6 py-7 text-white shadow-[0_24px_60px_rgba(15,23,42,0.14)] sm:px-8 lg:py-8">
        {/* Background glow */}

        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Heading */}

          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />

                <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                Owner administrator management
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Administrators
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Create and manage administrators responsible for your
              organizations.
            </p>
          </div>

          {/* Total administrators */}

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-950">
              <UsersRound size={19} />
            </div>

            <div className="pr-4">
              <p className="text-2xl font-black text-white">
                {totalAdmins}
              </p>

              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                Total administrators
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MANAGEMENT TOOLBAR
      ====================================================== */}

      <section className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Search */}

        <div className="relative w-full lg:max-w-md">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search organization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Filter */}

          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-semibold text-slate-600 outline-none transition focus:border-indigo-400 sm:w-40"
            >
              <option value="all">All Organizations</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>

          {/* Create Administrator */}

          <button
            onClick={() => setAdminsModal(true)}
            type="button"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
          >
            <UserPlus size={17} />
            Create Administrator
          </button>
        </div>
      </section>

      {/* =====================================================
          ADMINISTRATOR MANAGEMENT
      ====================================================== */}

      <section className="overflow-visible rounded-3xl border border-slate-200/70 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">
        {/* Header */}

        <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-950">
                Organization Administrators
              </h2>

              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
                {filteredOrganizations.length} Organizations
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Manage administrators assigned to each organization.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <ShieldCheck size={15} />
            Owner controlled access
          </div>
        </div>

        {/* =====================================================
            DESKTOP TABLE
        ====================================================== */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60">
                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Organization
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Administrators
                </th>

                <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Organization status
                </th>

                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredOrganizations.map((org) => (
                <tr
                  key={org._id}
                  className="group transition hover:bg-slate-50/60"
                >
                  {/* Organization */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-700">
                        {org.name?.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-slate-950">
                          {org.name}
                        </p>

                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Building2 size={12} />
                          Organization
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Admin count */}

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                        <UsersRound size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-950">
                          {org.adminCount || 0}
                        </p>

                        <p className="text-[11px] text-slate-400">
                          {(org.adminCount || 0) === 1
                            ? "Administrator"
                            : "Administrators"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Organization status */}

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
                        org.isActive
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {org.isActive ? (
                        <UserCheck size={12} />
                      ) : (
                        <UserX size={12} />
                      )}

                      {org.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  {/* Actions */}

                  <td className="px-6 py-5">
                    <div className="relative flex justify-end gap-1">
                      {/* Edit */}

                      <button
                        type="button"
                        title="Manage administrator"
                        onClick={() => handleEdit(org)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Pencil size={15} />
                      </button>

                      {/* View */}

                      <button
                        type="button"
                        title="View administrators"
                        onClick={() => handleView(org)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <ArrowUpRight size={16} />
                      </button>

                      {/* More */}

                      <button
                        type="button"
                        title="More actions"
                        onClick={() =>
                          setOpenMenu(
                            openMenu === org._id ? null : org._id
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={17} />
                      </button>

                      {/* Dropdown */}

                      {openMenu === org._id && (
                        <div className="absolute right-0 top-11 z-20 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                          <button
                            type="button"
                            onClick={() => handleView(org)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                          >
                            <Eye size={15} />
                            View administrators
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(org)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                          >
                            <Pencil size={15} />
                            Manage
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(org)}
                            className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                          >
                            <Power size={15} />
                            {org.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            MOBILE
        ====================================================== */}

        <div className="divide-y divide-slate-100 md:hidden">
          {filteredOrganizations.map((org) => (
            <div key={org._id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-700">
                    {org.name?.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-950">
                      {org.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Organization
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                    org.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {org.isActive ? "Active" : "Inactive"}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-between">
                {/* Admin count */}

                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <UsersRound size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-950">
                      {org.adminCount || 0}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {(org.adminCount || 0) === 1
                        ? "Administrator"
                        : "Administrators"}
                    </p>
                  </div>
                </div>

                {/* Actions */}

                <div className="relative flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(org)}
                    title="Manage administrator"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-indigo-50 hover:text-indigo-600"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleView(org)}
                    title="View administrators"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <ArrowUpRight size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === org._id ? null : org._id
                      )
                    }
                    title="More actions"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-300 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={17} />
                  </button>

                  {/* Mobile dropdown */}

                  {openMenu === org._id && (
                    <div className="absolute right-0 top-10 z-20 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
                      <button
                        type="button"
                        onClick={() => handleView(org)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={15} />
                        View administrators
                      </button>

                      <button
                        type="button"
                        onClick={() => handleEdit(org)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Pencil size={15} />
                        Manage
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleStatus(org)}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-slate-600 hover:bg-slate-50"
                      >
                        <Power size={15} />
                        {org.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            EMPTY
        ====================================================== */}

        {filteredOrganizations.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <UsersRound size={22} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-slate-950">
              No organizations found
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              Try changing your search or organization filter.
            </p>
          </div>
        )}
      </section>

      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Create admin */}

        <div className="rounded-3xl bg-slate-950 p-7 text-white">
          <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-white/10 ring-1 ring-white/10">
            <UserPlus size={20} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Administrator management
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            Create an administrator
          </h2>

          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Add an administrator to an organization and give them
            responsibility for managing teams, employees and tasks
            within that organization.
          </p>

          <button
            type="button"
            onClick={() => setAdminsModal(true)}
            className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            <UserPlus size={16} />

            Create Administrator

            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>

        {/* Access rules */}

        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-indigo-50 text-indigo-600">
            <ShieldCheck size={20} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Access rules
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-950">
            Organization-level access
          </h2>

          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ShieldCheck size={14} />
              </div>

              <p className="text-sm leading-6 text-slate-500">
                Administrators manage teams and employees inside their
                assigned organization.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Building2 size={14} />
              </div>

              <p className="text-sm leading-6 text-slate-500">
                An administrator must belong to one organization.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <UsersRound size={14} />
              </div>

              <p className="text-sm leading-6 text-slate-500">
                Organization access is controlled by the Owner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ADMINISTRATOR MODAL
      ====================================================== */}

      {adminisModal && (
        <Modaladministrator
          setAdminsModal={setAdminsModal}
          allOrgs={allOrgs}
        />
      )}
    </main>
  );
};

export default Administrator;