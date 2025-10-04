import React, { useState } from "react";
import classnames from '../../utils/classname'

export default function SecurityPanel() {

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", oldPassword: "", newPassword: "", confirmNewPassword: "" })
  const [response, setresponse] = useState("");

  const handler = (e) => {
    const { id, value } = e.target;
    setValues((v) => ({ ...v, [id]: value }));
  }

  const submitForm = async () => {
    setLoading(true);
    setresponse("");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/auth/updatePassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(values),
        }
      );
      const data = await res.json();
      setresponse(data.message || data.error || "Unknown response");
    } catch (error) {
      setresponse(`Network or server error : ${error}`);
    }
    setLoading(false);
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-slate-900">Security
        {response && <p className="rounded-md border px-3 py-2 text-sm bg-yellow-50 text-yellow-800 border-yellow-200">{response}</p>}
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              id="email"
              onChange={handler}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Current password</label>
            <input
              id="oldPassword"
              type="password"
              onChange={handler}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">New password</label>
            <input
              id="newPassword"
              type="password"
              onChange={handler}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Confirm newPassword</label>
            <input
              type="password"
              onChange={handler}
              id="confirmNewPassword"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          className={classnames("rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500/80 focus:outline-none focus:ring-2 focus:ring-slate-400", loading&& "cursor-no-drop bg-red-500/100")}
          onClick={submitForm}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </section>
  );
}
