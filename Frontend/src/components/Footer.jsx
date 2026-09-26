import React from "react";
import {
  ArrowUpRight,
  Globe,
  MessageCircle,
  Mail,
} from "lucide-react";
import FooterColumn from "./FooterColumn";

const Footer = () => {
  const footerColumns = [
    {
      title: "Product",
      links: [
        "Features",
        "How it works",
        "Access control",
        "Pricing",
      ],
    },
    {
      title: "Workspace",
      links: [
        "Organizations",
        "Teams",
        "Employees",
        "Tasks",
      ],
    },
    {
      title: "Resources",
      links: [
        "Documentation",
        "Help center",
        "Security",
        "Contact",
      ],
    },
  ];

  return (
    <footer className="bg-slate-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">

        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-3">

              <div className="relative flex h-10 w-10 items-center justify-center rounded-[13px] bg-white">
                <div className="h-4 w-4 rotate-45 rounded-sm bg-slate-950" />
                <div className="absolute h-2 w-2 rounded-full bg-white" />
              </div>

              <div>
                <span className="text-[19px] font-bold tracking-tight">
                  Nexora
                </span>

                <span className="ml-2 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:inline">
                  Workspace
                </span>
              </div>

            </a>

            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-400">
              A simple workspace for organizations to manage teams,
              employees and work from one connected platform.
            </p>

            {/* Social / Links */}
            <div className="mt-7 flex items-center gap-2">

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <Globe size={16} />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <MessageCircle size={16} />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:bg-slate-900 hover:text-white"
              >
                <Mail size={16} />
              </a>

            </div>
          </div>

          {/* Footer Columns */}
          {footerColumns.map((column) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col gap-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h3 className="text-sm font-semibold text-white">
              Ready to organize your workspace?
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Start building your team workspace with Nexora.
            </p>
          </div>

          <button className="group flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
            Get started

            <ArrowUpRight
              size={15}
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>

        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-7 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            © 2026 Nexora Workspace. All rights reserved.
          </p>

          <div className="flex gap-5 text-xs text-slate-500">

            <a
              href="#"
              className="transition hover:text-white"
            >
              Privacy
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Terms
            </a>

            <a
              href="#"
              className="transition hover:text-white"
            >
              Security
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;