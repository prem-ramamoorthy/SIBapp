import { useEffect, useState } from "react";
import {
  Calendar, Heart, MailCheck, PencilLine, Phone, Pin, Save
} from "lucide-react";

const DetailRow = ({
  icon,
  label,
  value,
  valueClass = "",
  editable = false,
  onChange,
  type = "text"
}) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 text-slate-400 dark:text-gray-400 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-sm w-full truncate font-semibold text-slate-600 dark:text-gray-300 ${valueClass}">{label}</p>
      {editable ? (
        <input
          type={type}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          className={`truncate text-sm w-full text-slate-900 dark:text-gray-100 ${valueClass} border border-slate-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
        />
      ) : (
        <p className={`truncate w-full text-sm text-slate-900 dark:text-gray-100 ${valueClass}`}>{value}</p>
      )}
    </div>
  </div>
);

const fieldConfig = [
  { key: "phone", label: "Phone", icon: <Phone className="h-5 w-5" />, type :"text"  },
  { key: "email", label: "Email", icon: <MailCheck className="h-5 w-5" />, type :"text"  },
  { key: "address", label: "Address", icon: <Pin className="h-5 w-5" />, colSpan: 2 , type :"text" },
  { key: "dob", label: "DOB", icon: <Calendar className="h-5 w-5" /> , type :"date" },
  { key: "wedding", label: "Wedding Date", icon: <Calendar className="h-5 w-5"/> , type :"date" },
  { key: "bloodGroup", label: "Blood Group", icon: <Heart className="h-5 w-5" /> , type :"text" },
  { key: "subCaste", label: "வகையறா", type :"text"  },
  { key: "gothram", label: "குட்டம்", type :"text"  },
  { key: "motherTongue", label: "ஊர்", type :"text"  },
  { key: "kuladeivam", label: "குலதெய்வம்", valueClass: "text-rose-600", colSpan: 2 , type :"text" },
];

const ProfileCard = ({
  data = {
    phone: "+91 98765 43210",
    email: "john.smith@email.com",
    address: "123, Main Street, Erode, Tamil Nadu, 638001, India",
    dob: "15 Aug 1985",
    wedding: "10 Dec 2010",
    bloodGroup: "O+",
    motherTongue: "பெருந்துறை",
    subCaste: "Example வகையறா",
    kuladeivam: "அங்காளம்மன்",
    gothram: "செம்பூததான்",
  },
  editable = false,
}) => {
  const [isEditable, setEditable] = useState(editable);
  const [isEditing, setIsEditing] = useState(false);
  const [localData, setLocalData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    setEditable(editable);
  }, [editable]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const handleChange = (key, value) => {
    setLocalData(prev => ({ ...prev, [key]: value }));
  };

  const handleEditToggle = async () => {
    setError("");
    setResponse("");

    if (isEditing) {
      try {
        const serverdata = {
          company_phone : localData.phone,
          company_email : localData.email,
          company_address: localData.address,
          dob : localData.dob,
          wedding_date : localData.wedding,
          blood_group : localData.bloodGroup,
          native_place :localData.motherTongue ,
          vagai_category :localData.subCaste ,
          kuladeivam : localData.kuladeivam,
          kulam_category : localData.gothram
        }
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/profile/updateprofile`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serverdata),
            credentials: "include",
          }
        );
        const result = await res.json();
        if (result?.errors || result?.message) {
          const errMsg = result?.errors?.[0]
            ? `${result?.errors?.[0].path} : ${result?.errors?.[0].msg}`
            : (result?.message || "An error occurred.");
          setError(errMsg);
        } else {
          setResponse("Profile updated successfully.");
        }
      } catch (err) {
        setError(err.message);
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
      <section className="w-full rounded-3xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">Personal Details</h2>
          {isEditable && (
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

        <div className="my-4 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fieldConfig.slice(0, 3).map(field => (
            field.colSpan === 2 ? (
              <div className="md:col-span-2" key={field.key}>
                <DetailRow
                  editable={isEditing}
                  icon={field.icon}
                  label={field.label}
                  value={localData[field.key]}
                  valueClass={field.valueClass}
                  onChange={val => handleChange(field.key, val)}
                />
              </div>
            ) : (
              <DetailRow
                key={field.key}
                editable={isEditing}
                icon={field.icon}
                label={field.label}
                value={localData[field.key]}
                valueClass={field.valueClass}
                onChange={val => handleChange(field.key, val)}
              />
            )
          ))}
        </div>

        <div className="my-5 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fieldConfig.slice(3).map(field =>
            field.colSpan === 2 ? (
              <div className="md:col-span-2" key={field.key}>
                <DetailRow
                  editable={isEditing}
                  label={field.label}
                  value={localData[field.key]}
                  valueClass={field.valueClass}
                  type={field.type}
                  onChange={val => handleChange(field.key, val)}
                />
              </div>
            ) : (
              <DetailRow
                key={field.key}
                editable={isEditing}
                icon={field.icon}
                label={field.label}
                value={localData[field.key]}
                type={field.type}
                valueClass={field.valueClass}
                onChange={val => handleChange(field.key, val)}
              />
            )
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileCard;
