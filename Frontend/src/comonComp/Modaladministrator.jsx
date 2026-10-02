import React, { useEffect, useRef, useState } from "react";
import { UserCheck } from "lucide-react";
import toast from "react-hot-toast";

import {
  createAdministrator,
  activedAdmins,
} from "../API's/createAdmin";

const Modaladministrator = ({
  setAdminsModal,
  allOrgs = [],
  editAdmin,
}) => {
  // -----------------------------
  // Refs
  // -----------------------------
  const passwordRef = useRef();
  const organizationRef = useRef();

  // -----------------------------
  // Form State
  // -----------------------------
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // -----------------------------
  // Edit Admin Data -> Form State Create and edit both satate mange here
  // -----------------------------
  useEffect(() => {
    if (editAdmin) {
      setFormData({
        name: editAdmin.name || "",
        email: editAdmin.email || "",
        password: "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [editAdmin]);

  // -----------------------------
  // Submit Handler
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = passwordRef.current?.value || "";
    const selectedOrganization =
      organizationRef.current?.value || "";

    // -----------------------------
    // EDIT MODE
    // -----------------------------
    if (editAdmin) {
      if (!name || !email) {
        return toast.error("Please enter name and email");
      }

      try {
        const res = await activedAdmins(editAdmin._id, {
          name,
          email,
        });

        toast.success("Administrator updated successfully");
        setAdminsModal(false);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update administrator"
        );
      }

      return;
    }

    // -----------------------------
    // CREATE MODE
    // -----------------------------
    if (!name || !email || !password || !selectedOrganization) {
      return toast.error("Please enter all fields");
    }

    try {
      const res = await createAdministrator(
        selectedOrganization,
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        `${name} admin created successfully`
      );

      setAdminsModal(false);
    } catch (error) {
     toast.error(
        error.response?.data?.message ||
          "Failed to create administrator"
      );
    }
  };

  // -----------------------------
  // Close Modal
  // -----------------------------
  const handleClose = () => {
    setAdminsModal(false);
  };

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.2)]"
      >
        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserCheck />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                {editAdmin
                  ? "Edit Administrator"
                  : "Create Administrator"}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {editAdmin
                  ? "Update administrator information."
                  : "Add an administrator to an organization."}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            {/* Name */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-600">
                Administrator Name
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
                placeholder="Enter administrator name"
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
                placeholder="admin@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            {/* Password */}
            {!editAdmin && (
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

            {/* Organization */}
            {!editAdmin && (
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-600">
                  Organization
                </label>

                <select
                  ref={organizationRef}
                  defaultValue=""
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                >
                  <option value="">
                    Select organization
                  </option>

                  {allOrgs
                    .filter((org) => org.isActive)
                    .map((org) => (
                      <option
                        key={org._id}
                        value={org._id}
                        disabled={!org.isActive}
                      >
                        {org.name}
                        {!org.isActive ? "(Inactive)" : ""}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
            <button
              onClick={handleClose}
              type="button"
              className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
            >
              {editAdmin
                ? "Update Administrator"
                : "Create Administrator"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modaladministrator;