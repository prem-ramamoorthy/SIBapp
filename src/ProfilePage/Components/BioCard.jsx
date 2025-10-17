import React, { useState } from "react";

const BioSection = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `${title.replace(/\s+/g, "-").toLowerCase()}-panel`;
  const btnId = `${title.replace(/\s+/g, "-").toLowerCase()}-button`;

  return (
    <div className="border-t border-slate-200 dark:border-gray-700 first:border-t-0 p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 dark:text-gray-100">{title}</h3>
        <button
          id={btnId}
          type="button"
          className="inline-flex w-8 items-center justify-center rounded-md text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-gray-500"
          aria-controls={panelId}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.27a.75.75 0 0 1-.02-1.06z" />
          </svg>
        </button>
      </div>
      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid overflow-hidden transition-all duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 pb-4 text-sm leading-6 text-slate-700 dark:text-gray-300">
          {children}
        </div>
      </div>
    </div>
  );
};

const MyBioCard = ({ onEdit = () => {} }) => {
  return (
    <section className="w-full rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-sm">
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-gray-100 p-2 mx-2">My Bio</h2>
        <button
          type="button"
          onClick={onEdit}
          className="mx-4 mt-2 inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          aria-label="Edit bio"
          title="Edit"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
          </svg>
          Edit
        </button>
      </div>

      <div className="p-2">
        <BioSection title="GAINS Profile" defaultOpen>
          <ul className="space-y-3 pt-4">
            <li>
              <span className="font-semibold">Goals:</span> Help 100 families achieve financial freedom by 2026.
            </li>
            <li>
              <span className="font-semibold">Accomplishments:</span> 30+ years in finance, helped 500+ clients grow wealth.
            </li>
            <li>
              <span className="font-semibold">Interests:</span> Stock market analysis, economic trends.
            </li>
            <li>
              <span className="font-semibold">Networks:</span> Financial planning association, Investment clubs.
            </li>
            <li>
              <span className="font-semibold">Skills:</span> Portfolio management, risk assessment, financial modeling.
            </li>
          </ul>
        </BioSection>

        <BioSection title="30-sec Pitch">
          <p className="pt-4">
            Certified planner helping professionals create resilient, tax‑efficient portfolios with clear, goal‑based plans.
          </p>
        </BioSection>

        <BioSection title="Why SIB?">
          <p className="pt-4">
            Community, accountability, and curated opportunities to expand networks and accelerate impact.
          </p>
        </BioSection>
      </div>
    </section>
  );
};

export default MyBioCard;
