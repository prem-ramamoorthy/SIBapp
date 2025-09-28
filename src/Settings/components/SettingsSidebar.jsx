import React from "react";

const items = [
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },

];

export default function SettingsSidebar({ active, onChange }) {
  return (
    <nav
      aria-label="Settings sections"
      className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
    >
      <h2 className="font-semibold my-4">Select Here</h2>
      <ul className="space-y-1">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <li key={it.key}>
              <button
                type="button"
                onClick={() => onChange(it.key)}
                aria-current={isActive ? "page" : undefined}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  isActive
                    ? "bg-amber-400 font-semibold text-black"
                    : "text-slate-700 hover:bg-amber-300"
                } focus:outline-none focus:ring-2 focus:ring-slate-200`}
              >
                {it.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
