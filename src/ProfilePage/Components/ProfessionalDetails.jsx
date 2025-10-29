import { PencilLine, Save, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const COLORS = [
  "bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:ring-sky-700",
  "bg-green-100 text-green-800 ring-green-200 dark:bg-green-900 dark:text-green-200 dark:ring-green-700",
  "bg-pink-100 text-pink-800 ring-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:ring-pink-700",
  "bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:ring-purple-700",
  "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:ring-orange-700",
];

const Chip = ({ children, editable, onChange, onDelete }) => (
  <span className="inline-flex items-center rounded-full border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-gray-200 shadow-sm">
    {editable ? (
      <input
        type="text"
        value={children}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent w-full focus:outline-none"
      />
    ) : (
      children
    )}
    {editable && onDelete && (
      <button
        onClick={onDelete}
        className="ml-1 text-red-500 hover:text-red-700 font-bold"
      >
        ×
      </button>
    )}
  </span>
);

const VerticalChip = ({ children }) => {
  const [color] = useState(COLORS[Math.floor(Math.random() * COLORS.length)]);
  return (
    <div
      className={`rounded-md px-3 py-2 text-center text-sm font-semibold ring-1 ring-inset ${color}`}
    >
      {children}
    </div>
  );
};

const CompanyName = ({ label, value }) => (
  <div className="space-y-0.5">
    <p className="text-[13px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
      {label}
    </p>
    <p className="text-sm font-bold text-slate-900 dark:text-gray-300">{value}</p>
  </div>
);

const Labeled = ({ label, value }) => (
  <div className="space-y-0.5">
    <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
      {label}
    </p>
    <p className="text-sm text-slate-900 dark:text-gray-100">{value}</p>
  </div>
);

const Weblink = ({ label, url }) => (
  <div className="space-y-0.5 overflow-x-clip">
    <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
      {label}
    </p>
    <a className="text-sm w-full text-blue-500" href={url} target="_blank" rel="noopener noreferrer">{url}</a>
  </div>
);

const ProfessionalDetailsCard = ({
  datagiven = {
    company: "Kumar Financial Services",
    website: "www.kumarfinancialservices.com",
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
  editable = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState({
    ...datagiven,
    verticals: datagiven?.verticals || [],
    services: datagiven?.services || [],
  });

  useEffect(() => {
    setData({
      ...datagiven,
      verticals: datagiven?.verticals || [],
      services: datagiven?.services || [],
    });
  }, [datagiven]);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const updateService = (index, value) => {
    const updated = [...data.services];
    updated[index] = value;
    setData({ ...data, services: updated });
  };

  const deleteService = (index) => {
    const updated = data.services.filter((_, i) => i !== index);
    setData({ ...data, services: updated });
  };

  const addService = () => {
    setData({ ...data, services: [...data.services, ""] });
  };

  const updateVertical = (index, value) => {
    const updated = [...data.verticals];
    updated[index] = value;
    setData({ ...data, verticals: updated });
  };

  const deleteVertical = (index) => {
    const updated = data.verticals.filter((_, i) => i !== index);
    setData({ ...data, verticals: updated });
  };

  const addVertical = () => {
    setData({ ...data, verticals: [...data.verticals, ""] });
  };

  return (
    <section className="w-full rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
          Professional Details
        </h2>
        {editable && (
          <button
            type="button"
            onClick={toggleEdit}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          >
            {isEditing ? <Save size={15} /> : <PencilLine size={15} />}
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
      </div>

      <div className="my-2 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      <div className="mb-4">
        <p className="mb-2 text-xs font-semibold tracking-wide text-slate-500 dark:text-gray-400">
          BUSINESS VERTICALS
        </p>
        <div className="flex flex-wrap gap-2">
          {data.verticals.map((v, i) =>
            isEditing ? (
              <Chip
                key={i}
                editable
                onChange={(val) => updateVertical(i, val)}
                onDelete={() => deleteVertical(i)}
              >
                {v}
              </Chip>
            ) : (
              <VerticalChip key={i}>{v}</VerticalChip>
            )
          )}
          {isEditing && (
            <button
              onClick={addVertical}
              className="inline-flex items-center rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20"
            >
              <Plus size={12} /> Add
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 py-1 md:grid-cols-2">
        <CompanyName label="COMPANY" value={data.company} />
        <Weblink label="Website" url={data.website} />
        <Labeled label="YEARS IN BUSINESS" value={data.years} />
        <Labeled label="TURNOVER BAND" value={data.turnover} />
      </div>

      <div className="mt-4 space-y-2">
        <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
          SERVICES OFFERED
        </p>
        <div className="flex flex-wrap gap-2">
          {data.services.map((s, i) => (
            <Chip
              key={i}
              editable={isEditing}
              onChange={(val) => updateService(i, val)}
              onDelete={() => deleteService(i)}
            >
              {s}
            </Chip>
          ))}
          {isEditing && (
            <button
              onClick={addService}
              className="inline-flex items-center rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20"
            >
              <Plus size={12} /> Add
            </button>
          )}
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
          IDEAL REFERRAL
        </p>
        {isEditing ? (
          <textarea
            value={data.referral}
            onChange={(e) => setData({ ...data, referral: e.target.value })}
            className="w-full rounded border border-slate-300 dark:border-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
          />
        ) : (
          <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
            {data.referral}
          </p>
        )}
      </div>
    </section>
  );
};

export default ProfessionalDetailsCard;
