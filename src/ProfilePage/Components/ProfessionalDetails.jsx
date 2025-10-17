import React from "react";

const Labeled = ({ label, value }) => (
  <div className="space-y-0.5">
    <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
      {label}
    </p>
    <p className="text-sm text-slate-900 dark:text-gray-100">{value}</p>
  </div>
);

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-gray-200 shadow-sm">
    {children}
  </span>
);

const ProfessionalDetailsCard = ({
  onEdit = () => {},
  data = {
    company: "Kumar Financial Services",
    gst: "33ABCDE1234F1Z5",
    years: "30 Years",
    turnover: "₹1–5 Cr",
    services: [
      "Chit Fund Management",
      "Financial Planning",
      "Investment Advisory",
      "Insurance Products",
      "Tax Planning",
      "Retirement Planning",
    ],
    verticals: ["Finance & Banking", "Investment Services"],
    referral:
      "Individuals or businesses looking for comprehensive financial planning, investment advisory services, or tax‑efficient investment solutions. Particularly interested in connecting with professionals aged 25–55 with disposable income for long‑term wealth creation.",
  },
}) => {
  return (
    <section className="w-full rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">

      <div className="mb-3 flex items-start justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
          Professional Details
        </h2>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          aria-label="Edit professional details"
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

      <div className="my-2 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 dark:text-gray-400">
          BUSINESS VERTICALS
        </p>

        <div className="space-y-2">
          <div className="rounded-md bg-sky-100 dark:bg-sky-900 px-3 py-2 text-center text-sm font-semibold text-sky-800 dark:text-sky-200 ring-1 ring-inset ring-sky-200 dark:ring-sky-700">
            {data.verticals[0]}
          </div>
          <div className="rounded-md bg-green-100 dark:bg-green-900 px-3 py-2 text-center text-sm font-semibold text-green-800 dark:text-green-200 ring-1 ring-inset ring-green-200 dark:ring-green-700">
            {data.verticals[1]}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-1 md:grid-cols-2">
        <Labeled label="COMPANY" value={data.company} />
        <Labeled label="GST NUMBER" value={data.gst} />
        <Labeled label="YEARS IN BUSINESS" value={data.years} />
        <Labeled label="TURNOVER BAND" value={data.turnover} />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
          SERVICES OFFERED
        </p>
        <div className="flex flex-wrap gap-2">
          {data.services.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
          IDEAL REFERRAL
        </p>
        <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
          {data.referral}
        </p>
      </div>
    </section>
  );
};

export default ProfessionalDetailsCard;
