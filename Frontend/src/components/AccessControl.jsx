import React from "react";
import {
  Crown,
  ShieldCheck,
  UserRound,
  Check,
  LockKeyhole,
} from "lucide-react";

const AccessControl = () => {
  const roles = [
    {
      icon: Crown,
      role: "Owner",
      description:
        "Manage organizations and control the overall workspace.",
      permissions: [
        "Create organizations",
        "Manage administrators",
        "Organization oversight",
        "Global access",
      ],
    },
    {
      icon: ShieldCheck,
      role: "Admin",
      description:
        "Manage teams, employees and work within your organization.",
      permissions: [
        "Create teams",
        "Manage employees",
        "Assign tasks",
        "Track team activity",
      ],
    },
    {
      icon: UserRound,
      role: "Employee",
      description:
        "Focus on assigned work and stay connected with your team.",
      permissions: [
        "View assigned tasks",
        "Update task status",
        "View team workspace",
        "Collaborate with team",
      ],
    },
  ];

  return (
    <section
      id="access"
      className="relative overflow-hidden bg-white py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-slate-100/70 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-slate-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            <LockKeyhole size={13} />
            Access control
          </div>

          <h2 className="text-4xl font-bold tracking-[-0.035em] text-slate-950 sm:text-5xl">
            Everyone gets
            <br />
            <span className="text-slate-400">
              the right access.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500">
            Keep your organization secure with role-based access that gives
            every person exactly the permissions they need.
          </p>

        </div>

        {/* Role Cards */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">

          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.role}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-900/5"
              >

                {/* Top */}
                <div className="flex items-start justify-between">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white shadow-lg shadow-slate-950/10 transition duration-300 group-hover:scale-105">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {role.role}
                  </span>

                </div>

                {/* Content */}
                <div className="mt-7">

                  <h3 className="text-xl font-bold tracking-tight text-slate-950">
                    {role.role}
                  </h3>

                  <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                    {role.description}
                  </p>

                </div>

                {/* Divider */}
                <div className="my-6 h-px bg-slate-100" />

                {/* Permissions */}
                <div className="space-y-3">

                  {role.permissions.map((permission) => (
                    <div
                      key={permission}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                        <Check
                          size={12}
                          strokeWidth={2.5}
                          className="text-slate-700"
                        />
                      </div>

                      {permission}
                    </div>
                  ))}

                </div>

                {/* Bottom */}
                <div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-xs font-semibold text-slate-400">
                  <ShieldCheck size={14} />
                  Role-based permissions
                </div>

              </div>
            );
          })}

        </div>

        {/* Security Banner */}
        <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
              <LockKeyhole size={18} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-950">
                Secure by design
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Keep organization data separated with role-based access
                throughout your workspace.
              </p>
            </div>

          </div>

          <div className="shrink-0 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
            Role-based access
          </div>

        </div>

      </div>
    </section>
  );
};

export default AccessControl;