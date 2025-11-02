import { PencilLine, Save, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Chip from "./Chip";

const COLORS = [
  "bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-900 dark:text-sky-200 dark:ring-sky-700",
  "bg-green-100 text-green-800 ring-green-200 dark:bg-green-900 dark:text-green-200 dark:ring-green-700",
  "bg-pink-100 text-pink-800 ring-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:ring-pink-700",
  "bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:ring-purple-700",
  "bg-orange-100 text-orange-800 ring-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:ring-orange-700",
];

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

const EditableField = ({
  label, value, editable, onChange, type = "text"
}) => (
  <div className="space-y-0.5">
    <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
      {label}
    </p>
    {editable ? (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="truncate text-sm w-full text-slate-900 dark:text-gray-100 border border-slate-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    ) : (
      <p className={`text-sm ${label === "COMPANY NAME" ? "font-bold" : ""} text-slate-900 dark:text-gray-300`}>
        {value}
      </p>
    )}
  </div>
);

const normalizeUrl = (url) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const EditableWeblink = ({ label, url, editable, onChange }) => (
  <div className="space-y-0.5 overflow-x-clip">
    <p className="text-[11px] font-semibold tracking-wide text-slate-500 dark:text-gray-400">
      {label}
    </p>
    {editable ? (
      <input
        type="text"
        value={url}
        onChange={e => onChange(e.target.value)}
        className="truncate text-sm w-full text-slate-900 dark:text-gray-100 border border-slate-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    ) : (
      <a
        className="text-sm w-full text-blue-500"
        href={normalizeUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url}
      </a>
    )}
  </div>
);

const ProfessionalDetailsCard = ({
  datagiven = {
    company_name: "",
    website: "",
    years_in_business: "",
    annual_turnover: "",
    services: [],
    vertical_ids: [],
    ideal_referral: "",
    company: "",
    years: "",
    turnover: "",
    verticals: [],
    referral: "",
  },
  editable = false,
}) => {
  const initialData = {
    company_name: datagiven.company_name || datagiven.company || "",
    website: datagiven.website || "",
    years_in_business: datagiven.years_in_business ?? datagiven.years ?? "",
    annual_turnover: datagiven.annual_turnover ?? datagiven.turnover ?? "",
    services: datagiven.services ?? [],
    vertical_ids: datagiven.vertical_ids ?? datagiven.verticals ?? [],
    ideal_referral: datagiven.ideal_referral ?? datagiven.referral ?? "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    setData(initialData);
  }, [datagiven]);

  const updateCompanyName = (value) => setData({ ...data, company_name: value });
  const updateWeblink = (value) => setData({ ...data, website: value });
  const updateYears = (value) => setData({ ...data, years_in_business: value });
  const updateTurnover = (value) => setData({ ...data, annual_turnover: value });

  const updateService = (index, value) => {
    const updated = [...data.services];
    updated[index] = value;
    setData({ ...data, services: updated });
  };

  const deleteService = (index) => {
    const updated = data.services.filter((_, i) => i !== index);
    setData({ ...data, services: updated });
  };

  const addService = () => setData({ ...data, services: [...data.services, ""] });

  const updateVertical = (index, value) => {
    const updated = [...data.vertical_ids];
    updated[index] = value;
    setData({ ...data, vertical_ids: updated });
  };

  const deleteVertical = (index) => {
    const updated = data.vertical_ids.filter((_, i) => i !== index);
    setData({ ...data, vertical_ids: updated });
  };

  const addVertical = () => setData({ ...data, vertical_ids: [...data.vertical_ids, ""] });

  const handleEditToggle = async () => {
    setError("");
    setResponse("");
    if (isEditing) {
      try {
        setLoading(true);
        const serverData = {
          company_name: data.company_name,
          website: data.website,
          years_in_business: Number(data.years_in_business) || 0,
          annual_turnover: Number(data.annual_turnover) || 0,
          services: data.services,
          vertical_ids: data.vertical_ids,
          ideal_referral: data.ideal_referral,
        };
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/profile/updateprofile`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serverData),
            credentials: "include",
          }
        );
        const result = await res.json();
        if (result?.errors || result?.message ) {
          const errMsg = result?.errors?.[0]
            ? `${result?.errors?.[0].path} : ${result?.errors?.[0].msg}`
            : (result?.message || "An error occurred.");
          setError(errMsg);
        } 
        else if(result?.error) setError(result?.error)
        else {
          setResponse("Professional details updated successfully.");
        }
      } catch (err) {
        setError("Network error: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    setIsEditing(prev => !prev);
  };

  return (
    <>
      {(loading || error || response) && (
        <div className="mb-2 text-center">
          {loading && <div className="text-blue-500 font-semibold">Saving changes...</div>}
          {error && <div className="text-red-500 font-semibold">{error}</div>}
          {response && !loading && !error && <div className="text-green-600 font-semibold">{response}</div>}
        </div>
      )}
      <section className="w-full rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
        <div className="mb-3 flex items-start justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
            Professional Details
          </h2>
          {editable && (
            <button
              type="button"
              onClick={handleEditToggle}
              disabled={loading}
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
            {data.vertical_ids.map((v, i) =>
              isEditing ? (
                <Chip
                  key={i}
                  editable
                  onChange={val => updateVertical(i, val)}
                  onDelete={() => deleteVertical(i)}
                  isvertical={true}
                >{v}</Chip>
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
          <EditableField
            label="COMPANY NAME"
            value={data.company_name}
            editable={isEditing}
            onChange={updateCompanyName}
          />
          <EditableWeblink
            label="Website"
            url={data.website}
            editable={isEditing}
            onChange={updateWeblink}
          />
          <EditableField
            label="YEARS IN BUSINESS"
            value={data.years_in_business}
            editable={isEditing}
            onChange={updateYears}
            type="number"
          />
          <EditableField
            label="ANNUAL TURNOVER"
            value={data.annual_turnover}
            editable={isEditing}
            onChange={updateTurnover}
            type="number"
          />
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
                onChange={val => updateService(i, val)}
                onDelete={() => deleteService(i)}
              >{s}</Chip>
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
              value={data.ideal_referral}
              onChange={e => setData({ ...data, ideal_referral: e.target.value })}
              className="w-full rounded border border-slate-300 dark:border-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          ) : (
            <p className="text-sm leading-6 text-slate-700 dark:text-gray-300">
              {data.ideal_referral}
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfessionalDetailsCard;
