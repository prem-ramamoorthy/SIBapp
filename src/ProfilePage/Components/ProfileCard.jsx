import React from "react";

const DetailRow = ({ icon, label, value, valueClass = "" }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 text-slate-400 dark:text-gray-400 shrink-0">{icon}</span>
    <div className="min-w-0">
      <p className="text-sm font-semibold text-slate-600 dark:text-gray-300">{label}</p>
      <p className={`truncate text-sm text-slate-900 dark:text-gray-100 ${valueClass}`}>{value}</p>
    </div>
  </div>
);

const ProfileCard = ({
  onEdit = () => {},
  data = {
    phone: "+91 98765 43210",
    email: "john.smith@email.com",
    address: "123, Main Street, Erode, Tamil Nadu, 638001, India",
    dob: "15 Aug 1985",
    wedding: "10 Dec 2010",
    bloodGroup: "O+",
    motherTongue: "பெருந்துறை",
    subCaste: "Example வகையறா",
    kuladeivamLabel: "குலதெய்வம்:",
    kuladeivam: "அங்காளம்மன்",
    gothramLabel: "கோத்திரம்:",
    gothram: "செம்பூததான்",
  },
}) => {
  return (
    <section className="w-full rounded-3xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">Personal Details</h2>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
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

      <div className="my-4 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DetailRow
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72l.45 3a2 2 0 0 1-.55 1.73L9.91 11a16 16 0 0 0 3.18 3.18l1.55-1.08a2 2 0 0 1 1.73-.55l3 .45A2 2 0 0 1 20 14.91" />
            </svg>
          }
          label="Phone"
          value={data.phone}
        />
        <DetailRow
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M22 6 12 13 2 6" />
            </svg>
          }
          label="Email"
          value={data.email}
        />
        <div className="md:col-span-2">
          <DetailRow
            icon={
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
            label="Address"
            value={data.address}
          />
        </div>
      </div>

      <div className="my-5 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DetailRow
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          }
          label="DOB"
          value={data.dob}
        />
        <DetailRow
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-6a2 2 0 0 0-2-2h-1" />
              <path d="M4 21V8a2 2 0 0 1 2-2h7" />
              <path d="M18 3 21 6 12 15H9v-3L18 3z" />
            </svg>
          }
          label="Wedding Date"
          value={data.wedding}
        />
        <DetailRow
          icon={
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-rose-500" fill="currentColor">
              <path d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10z" />
            </svg>
          }
          label="Blood Group"
          value={data.bloodGroup}
        />
        <DetailRow label="வகையறா" value={data.subCaste} />
        <DetailRow label="குட்டம்" value={`${data.gothramLabel} ${data.gothram}`} />
        <DetailRow label="ஊர்" value={data.motherTongue} />
        <div className="md:col-span-2">
          <DetailRow label="குலதெய்வம்" value={`${data.kuladeivam}`} valueClass="text-rose-600" />
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
