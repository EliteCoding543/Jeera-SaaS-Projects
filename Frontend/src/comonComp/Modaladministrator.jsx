import React, { useRef } from "react";
import { UserCheck } from 'lucide-react'
import { createAdministrator } from "../API's/createAdmin";
import toast from "react-hot-toast";
const Modaladministrator = ({setAdminsModal, allOrgs}) => {
  // Input ref
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const organizationRef = useRef()


  const handleCreateAdminis = async(e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const selectedOrganization = organizationRef.current.value
     if(!name || !email || !password || !selectedOrganization){
       return toast.error("Please enter the all filds..")
     }
     try {
      const res = await createAdministrator(selectedOrganization, {
        name,
        email,
        password,
      });
      // console.log("Admin Created:", res.data)
      setAdminsModal(false)
      toast.success(`${name} is admin created successfuly`)
     } catch (error) {
        console.log("STATUS:", error.response?.status);
        console.log("BACKEND RESPONSE:", error.response?.data);
     }
  }
  return (
    <div 
    onClick={() => setAdminsModal(false)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">

      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_rgba(15,23,42,0.2)]">

        {/* Header */}
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserCheck />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-slate-950">
                Create Administrator
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Add an administrator to an organization.
              </p>
            </div>

          </div>
        </div>

        {/* Form */}
        <div className="space-y-5 p-6">

          {/* Name */}
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Administrator Name
            </label>

            <input
              ref={nameRef}
              type="text"
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
              ref={emailRef}
              type="email"
              placeholder="admin@example.com"
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            />
          </div>

          {/* Password */}
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

          {/* Organization */}
          <div>
            <label className="mb-2 block text-xs font-bold text-slate-600">
              Organization
            </label>

            <select
              ref={organizationRef}
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
            >
              <option value="">Select organization</option>
              {allOrgs
                .filter((org) => org.isActive)
                .map((org) => (
                  <option key={org._id} value={org._id}>
                    {org.name}
                  </option>
                ))}
            </select>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">

          <button
            onClick={() => setAdminsModal(false)}
            type="button"
            className="rounded-xl px-4 py-2.5 text-sm font-bold text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
          >
            Cancel
          </button>

          <button
            onClick={handleCreateAdminis}
            type="button"
            className="rounded-xl cursor-pointer bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:bg-slate-800"
          >
            Create Administrator
          </button>

        </div>

      </div>
    </div>
  );
};

export default Modaladministrator;