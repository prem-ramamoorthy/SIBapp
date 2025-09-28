import React from "react";

export default function SecurityPanel() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-slate-900">Security</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Current password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">New password</label>
            <input
              type="password"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </div>
        <button
          type="button"
          className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white hover:bg-red-500/80 focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Update Password
        </button>
      </div>
    </section>
  );
}
