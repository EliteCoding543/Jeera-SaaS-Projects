import React, { useMemo, useState } from "react";
import {
  Building2,
  UsersRound,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Power,
  Eye,
  CheckCircle2,
  XCircle,
  CalendarDays,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import ModalOrg from "../../comonComp/ModalOrg";
import { activeOrgs, deactivateOrg } from "../../API's/organizationAPI";
import toast from "react-hot-toast";
import ViewOrgModal from "./ViewOrgModal";

const OrgDashboard = ({
  allOrgs = [],
  setIsModalOpen,
  setAllOrgs,
  isModalOpen
}) => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenu, setOpenMenu] = useState(null);
  const [viewOrg, setViewOrg] = useState(null)
// console.log(allOrgs)
  const filteredOrganizations = useMemo(() => {
    return allOrgs.filter((org) => {
      const matchesSearch = org.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
          ? org.isActive === true
          : org.isActive === false;

      return matchesSearch && matchesStatus;
    });
  }, [allOrgs, search, statusFilter]);

  const handleEdit = (org) => {
    console.log("Edit organization:", org);
  };
  // Active and Deactive Orga
  const handleStatusChange = async(org) => {
    // console.log("All obj", org.name)
    if(org.isActive){
       await deactivateOrg(org._id)
    }
    else {
       await activeOrgs(org._id, org.name)
    }
    setAllOrgs((prev) => 
      prev.map((item) => 
        item._id === org._id ? {...item, isActive : !item.isActive} : item
      )
    );
    toast.success(
      org.isActive
        ? ` ${org.name} deactivated successfully`
        : `${org.name} activated successfully`
    );
  };

  return (
    <main className="min-w-0 flex-1 bg-[#f5f7fb] p-4 sm:p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <section className="mb-6 rounded-[28px] bg-slate-950 px-6 py-7 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:px-8">

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">

              <span className="h-2 w-2 rounded-full bg-indigo-400" />

              <span 
               className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                Organization management
              </span>

            </div>

            <h1 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
              Organizations
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Create, update and manage organizations across the Jeera
              platform from one place.
            </p>

          </div>

          {/* Add Organization */}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
          >
            <Plus
              size={17}
              className="transition-transform group-hover:rotate-90"
            />

            Add Organization
          </button>

        </div>

      </section>
      
      {isModalOpen && (
        <ModalOrg setIsModalOpen={setIsModalOpen} setAllOrgs={setAllOrgs}/>
      )}

      {/* =====================================================
          TOOLBAR
      ====================================================== */}

      <section className="overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.04)]">

        <div className="border-b border-slate-100 p-4 sm:p-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div className="relative w-full lg:max-w-md">

              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search organizations..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />

            </div>


            {/* Filters */}

            <div className="flex items-center gap-2">

              <div className="hidden items-center gap-2 text-xs font-semibold text-slate-400 sm:flex">
                <SlidersHorizontal size={15} />
                Filter
              </div>

              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                  statusFilter === "all"
                    ? "bg-slate-950 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                All
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("active")}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                  statusFilter === "active"
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                }`}
              >
                Active
              </button>

              <button
                type="button"
                onClick={() => setStatusFilter("inactive")}
                className={`rounded-lg px-3.5 py-2 text-xs font-bold transition ${
                  statusFilter === "inactive"
                    ? "bg-amber-600 text-white"
                    : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                }`}
              >
                Inactive
              </button>

            </div>

          </div>

        </div>


        {/* =====================================================
            TABLE HEADER
        ====================================================== */}

        <div className="hidden grid-cols-[minmax(260px,1.7fr)_0.8fr_1fr_0.8fr_70px] gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 md:grid">

          <span>Organization</span>
          <span>Administrators</span>
          <span>Created</span>
          <span>Status</span>
          <span />

        </div>


        {/* =====================================================
            ORGANIZATION LIST
        ====================================================== */}

        <div className="divide-y divide-slate-100">

          {filteredOrganizations.length === 0 ? (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                <Building2
                  size={25}
                  className="text-slate-400"
                />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                No organizations found
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Try another search or change the status filter.
              </p>

            </div>

          ) : (

            filteredOrganizations.map((org) => (

              <div
                key={org._id}
                className="group relative px-4 py-4 transition hover:bg-slate-50/70 sm:px-6"
              >

                {/* Desktop */}

                <div className="hidden relative grid-cols-[minmax(260px,1.7fr)_0.8fr_1fr_0.8fr_70px] items-center gap-4 md:grid">

                  {/* Organization */}

                  <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-linear-to-br from-indigo-50 to-slate-100 text-xs font-black text-indigo-700 ring-1 ring-indigo-100">
                      {org.name?.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="min-w-0">

                      <p className="truncate text-sm font-bold text-slate-900">
                        {org.name}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-slate-400">
                        ID: {org._id}
                      </p>

                    </div>

                  </div>


                  {/* Admin */}

                  <div className="flex items-center gap-2">

                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                      <UsersRound size={14} />
                    </div>

                    <div>

                      <p className="text-sm font-bold text-slate-800">
                        {org.adminCount || 0}
                      </p>

                      <p className="text-[10px] text-slate-400">
                        Admin
                        {(org.adminCount || 0) !== 1 ? "s" : ""}
                      </p>

                    </div>

                  </div>


                  {/* Created */}

                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={14}
                      className="text-slate-400"
                    />

                    <span className="text-xs font-medium text-slate-500">
                      {org.createdAt
                        ? new Date(org.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </span>

                  </div>


                  {/* Status */}

                  <div>

                    {org.isActive ? (

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">

                        <CheckCircle2 size={12} />

                        Active

                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">

                        <XCircle size={12} />

                        Inactive

                      </span>

                    )}

                  </div>


                  {/* Actions */}

                  <div className="relative flex justify-end">

                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === org._id
                            ? null
                            : org._id
                        )
                      }
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    >
                      <MoreHorizontal size={18} />
                    </button>


                    {openMenu === org._id && (
                      <div
                        className="absolute right-0 bottom-11 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_15px_40px_rgba(15,23,42,0.15)]"
                      >
                        {/* View */}
                        <button
                          type="button"
                          onClick={() => {
                            setViewOrg(org);
                            setOpenMenu(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                          <Eye size={14} />
                          View Organization
                        </button>

                        <div className="my-1 border-t border-slate-100" />

                        {/* Status */}
                        <button
                          type="button"
                          onClick={() => {
                            handleStatusChange(org);
                            setOpenMenu(null);
                          }}
                          className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${
                            org.isActive
                              ? "text-red-600 hover:bg-red-50"
                              : "text-emerald-600 hover:bg-emerald-50"
                          }`}
                        >
                          <Power size={14} />

                          {org.isActive
                            ? "Deactivate Organization"
                            : "Activate Organization"}
                        </button>
                      </div>
                    )}

                  </div>

                </div>


                {/* =================================================
                    MOBILE CARD
                ================================================== */}

                <div className="md:hidden">

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-linear-to-br from-indigo-50 to-slate-100 text-xs font-black text-indigo-700">
                        {org.name?.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-slate-900">
                          {org.name}
                        </p>

                        <p className="mt-1 text-[11px] text-slate-400">
                          {org.adminCount || 0} administrator
                          {(org.adminCount || 0) !== 1
                            ? "s"
                            : ""}
                        </p>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenu(
                          openMenu === org._id
                            ? null
                            : org._id
                        )
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
                    >
                      <MoreHorizontal size={17} />
                    </button>

                  </div>


                  <div className="mt-4 flex flex-wrap items-center gap-2">

                    {org.isActive ? (

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                        <CheckCircle2 size={11} />
                        Active
                      </span>

                    ) : (

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">
                        <XCircle size={11} />
                        Inactive
                      </span>

                    )}

                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <CalendarDays size={11} />

                      {org.createdAt
                        ? new Date(
                            org.createdAt
                          ).toLocaleDateString("en-IN")
                        : "—"}
                    </span>

                  </div>


                  {openMenu === org._id && (

                    <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">

                      <button
                        type="button"
                        onClick={() => {
                          handleView(org);
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-slate-50"
                      >
                        <Eye size={14} />
                        View Organization
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleEdit(org);
                          setOpenMenu(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Pencil size={14} />
                        Edit Organization
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          handleStatusChange(org);
                          setOpenMenu(null);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs font-semibold ${
                          org.isActive
                            ? "text-red-600 hover:bg-red-50"
                            : "text-emerald-600 hover:bg-emerald-50"
                        }`}
                      >
                        <Power size={14} />

                        {org.isActive
                          ? "Deactivate Organization"
                          : "Activate Organization"}
                      </button>

                    </div>

                  )}

                </div>

              </div>

            ))

          )}

        </div>


        {/* =====================================================
            FOOTER
        ====================================================== */}

        {filteredOrganizations.length > 0 && (

          <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-slate-400">

              Showing{" "}
              <span className="font-bold text-slate-600">
                {filteredOrganizations.length}
              </span>{" "}
              organization
              {filteredOrganizations.length !== 1 ? "s" : ""}

            </p>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">

              <ShieldCheck
                size={13}
                className="text-emerald-500"
              />

              Owner-level organization management

            </div>

          </div>

        )}

      </section>

  {/* /* =====================================================
         VIEW ADMINI MODAL
  ====================================================== */}
    {
      viewOrg && (
        <ViewOrgModal  viewOrg={viewOrg} setViewOrg={setViewOrg} />
      )
    }
    </main>
  );
};

export default OrgDashboard;