import { useEffect, useState } from "react";
import {
  Calendar,
  Heart,
  MailCheck,
  PencilLine,
  Phone,
  Pin,
  Save,
  User,
} from "lucide-react";

// Config defined outside component
const fieldConfig = [
  { key: "displayName", label: "Nickname", icon: <User size={20} />, type: "text" },
  { key: "phone", label: "Phone", icon: <Phone size={20} />, type: "text" },
  { key: "email", label: "Email", icon: <MailCheck size={20} />, type: "text" },
  { 
    key: "address", 
    label: "Address", 
    icon: <Pin size={20} />, 
    colSpan: 2, 
    type: "text",
    // Allow address to wrap and show fully
    valueClass: "whitespace-normal" 
  }, 
  { key: "dob", label: "DOB", icon: <Calendar size={20} />, type: "date" },
  { key: "wedding", label: "Wedding Date", icon: <Calendar size={20} />, type: "date" },
  { key: "bloodGroup", label: "Blood Group", icon: <Heart size={20} />, type: "text" },
  // Tamil fields - Icons omitted to test alignment
  { key: "subCaste", label: "வகையறா", type: "text" },
  { key: "gothram", label: "கூட்டம்", type: "text" },
  { key: "motherTongue", label: "ஊர்", type: "text" },
  { key: "kuladeivam", label: "குலதெய்வம்", valueClass: "text-rose-600", colSpan: 2, type: "text" },
];

const DetailRow = ({
  icon,
  label,
  value,
  valueClass = "",
  editable = false,
  onChange,
  type = "text",
}) => (
  <div className="flex items-start gap-3 w-full overflow-hidden">
    {/* ALIGNMENT FIX: Fixed width container for icon (or empty space) */}
    <div className="mt-0.5 shrink-0 w-5 flex justify-center text-slate-400 dark:text-gray-400">
      {icon || <div className="w-5" />} 
    </div>

    <div className="min-w-0 flex-1">
      {/* Label */}
      <p className="text-sm w-full truncate font-semibold text-slate-600 dark:text-gray-300">
        {label}
      </p>
      
      {/* Value */}
      {editable ? (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          className={`text-sm w-full text-slate-900 dark:text-gray-100 ${valueClass} border border-slate-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent`}
        />
      ) : (
        /* OVERFLOW FIX: 'truncate' forces single line with ellipsis. 
           Address overrides this with 'whitespace-normal' via valueClass. */
        <p className={`w-full text-sm text-slate-900 dark:text-gray-100 truncate ${valueClass}`}>
          {value || "-"}
        </p>
      )}
    </div>
  </div>
);

const ProfileCard = ({
  data = {
    displayName: "John Smith",
    phone: "+91 98765 43210",
    email: "john.smith@email.com",
    address: "123, Main Street, Erode, Tamil Nadu, 638001, India",
    dob: "1985-08-15",
    wedding: "2010-12-10",
    bloodGroup: "O+",
    motherTongue: "பெருந்துறை",
    subCaste: "Example வகையறா",
    kuladeivam: "அங்காளம்மன்",
    gothram: "செம்பூததான்",
  },
  editable = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (key, value) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  const handleEditToggle = async () => {
    setStatus({ type: "", message: "" });

    if (isEditing) {
      try {
        setLoading(true);
        const serverData = {
          display_name: localData.displayName,
          company_phone: localData.phone,
          company_email: localData.email,
          company_address: localData.address,
          dob: localData.dob,
          wedding_date: localData.wedding,
          blood_group: localData.bloodGroup,
          native_place: localData.motherTongue,
          vagai_category: localData.subCaste,
          kuladeivam: localData.kuladeivam,
          kulam_category: localData.gothram,
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

        if (result?.errors || (result?.message && !res.ok)) {
            const errMsg = result?.errors?.[0]
            ? `${result?.errors?.[0].path} : ${result?.errors?.[0].msg}`
            : (result?.message || "An error occurred.");
          setStatus({ type: "error", message: errMsg });
          setLoading(false);
          return; 
        } else {
          setStatus({ type: "success", message: "Profile updated successfully." });
        }
      } catch (err) {
        setStatus({ type: "error", message: err.message });
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }
    
    setIsEditing((prev) => !prev);
  };

  const renderFields = (fields) => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.key}
          className={`${field.colSpan === 2 ? "md:col-span-2" : "md:col-span-1"} min-w-0`}
        >
          <DetailRow
            editable={isEditing}
            icon={field.icon}
            label={field.label}
            value={localData[field.key]}
            valueClass={field.valueClass}
            type={field.type}
            onChange={(val) => handleChange(field.key, val)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <section className="w-full rounded-3xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      {(loading || status.message) && (
        <div className="mb-4 text-center text-sm font-medium animate-fade-in">
          {loading && <div className="text-blue-500">Saving changes...</div>}
          {!loading && status.type === "error" && (
            <div className="text-red-500">{status.message}</div>
          )}
          {!loading && status.type === "success" && (
            <div className="text-green-600">{status.message}</div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
          Personal Details
        </h2>
        {editable && (
          <button
            type="button"
            onClick={handleEditToggle}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40 transition-colors"
          >
            {isEditing ? <Save size={15} /> : <PencilLine size={15} />}
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
      </div>

      <div className="my-4 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      {/* Basic Contact Info */}
      {renderFields(fieldConfig.slice(0, 4))}

      <div className="my-5 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      {/* Personal Info */}
      {renderFields(fieldConfig.slice(4))}
    </section>
  );
};

export default ProfileCard;