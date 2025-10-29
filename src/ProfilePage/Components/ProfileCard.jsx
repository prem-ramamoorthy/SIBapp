import { useEffect, useState } from "react";
import { Calendar, EqualApproximatelyIcon, Heart, MailCheck, PencilLine, Phone, Pin, Save } from "lucide-react";


const DetailRow = ({
  icon,
  label,
  value: initialValue,
  valueClass = "",
  editable = false,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-slate-400 dark:text-gray-400 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-600 dark:text-gray-300">{label}</p>
        {editable ? (
          <input
            type="text"
            value={value}
            onChange={handleChange}
            className={`truncate text-sm w-full text-slate-900 dark:text-gray-100 ${valueClass} border border-slate-300 dark:border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
        ) : (
          <p className={`truncate text-sm text-slate-900 w-fit dark:text-gray-100 ${valueClass}`}>{value}</p>
        )}
      </div>
    </div>
  );
};

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
  editable = false 
}) => {
  const [isEditable, setEditable ] = useState(editable);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(()=>{
    setEditable(editable);
  } , [editable])

  const handler = ()=> {
    setIsEditing((e)=> e ? false : true) ;
  }

  return (
    <section className="w-full rounded-3xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">Personal Details</h2>
        {isEditable ? <button
          type="button"
          onClick={handler}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm font-medium text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-50 dark:hover:bg-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          aria-label="Edit bio"
          title="Edit"
        >
          {isEditing ? <Save size={"15 "}/> : <PencilLine size={"15 "}/> }
          {isEditing ? "Save"  : "Edit"}
        </button> : null}
      </div>

      <div className="my-4 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DetailRow
          editable = {isEditing}
          icon={
            <Phone className="h-5 w-5" />
          }
          label="Phone"
          value={data.phone}
        />
        <DetailRow
        editable = {isEditing}
          icon={
            <MailCheck className="h-5 w-5" />
          }
          label="Email"
          value={data.email}
        />
        <div className="md:col-span-2">
          <DetailRow
          editable = {isEditing}
            icon={
              <Pin className="h-5 w-5" />
            }
            label="Address"
            value={data.address}
          />
        </div>
      </div>

      <div className="my-5 h-px w-full bg-slate-200/70 dark:bg-gray-700" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <DetailRow
        editable = {isEditing}
          icon={
            <Calendar className="h-5 w-5" />
          }
          label="DOB"
          value={data.dob}
        />
        <DetailRow
        editable = {isEditing}
          icon={
            <Calendar className="h-5 w-5" />
          }
          label="Wedding Date"
          value={data.wedding}
        />
        <DetailRow
        editable = {isEditing}
          icon={
            <Heart className="h-5 w-5" />
          }
          label="Blood Group"
          value={data.bloodGroup}
        />
        <DetailRow editable = {isEditing} label="வகையறா" value={data.subCaste} />
        <DetailRow  editable = {isEditing}label="குட்டம்" value={data.gothram} />
        <DetailRow  editable = {isEditing}label="ஊர்" value={data.motherTongue} />
        <div className="md:col-span-2">
          <DetailRow editable = {isEditing} label="குலதெய்வம்" value={data.kuladeivam} valueClass="text-rose-600" />
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
