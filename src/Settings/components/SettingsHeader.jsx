import { NavLink , useNavigate } from "react-router-dom";

export default function SettingsHeader({ title }) {

  const navigate = useNavigate() ;

  const handleclick = ()=>{
    alert("changes saved Sucessfully !")
    navigate('/dashboard')
  }

  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      <div className="flex items-center gap-2">
       
        <button
          type="button"
          className="rounded-md bg-red-600 px-6 py-2 m-2 text-sm font-semibold text-white hover:bg-red-600/70 focus:outline-none focus:ring-2 focus:ring-slate-400"
          onClick={handleclick}
        >
          Save
        </button>
      </div>
    </header>
  );
}
