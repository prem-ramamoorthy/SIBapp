import { Pencil } from "lucide-react";
import React from "react";

const ProfileStrip = ({
  name = "Esthera Jackson",
  email = "esthera@simmpple.com",
  chapter = "Alpha Chapter",
  initials = "AC",
  onShare = () => {},
  onOverview = () => {},
}) => {
  return (
    <div className="w-full rounded-2xl border border-sky-200 bg-gradient-to-r from-white to-amber-100 shadow-sm my-2">
      <div className="flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 rounded-xl bg-red-500 md:h-14 md:w-14">
            <button
              type="button"
              onClick={() => document.getElementById("avatar-upload")?.click()}
              className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-white bg-cyan-500 text-white shadow hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2 focus:ring-offset-white"
              aria-label="Edit profile photo"
              title="Edit photo"
            >
              <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <input id="avatar-upload" type="file" accept="image/*" className="sr-only" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 line-clamp-2 md:line-clamp-1">
              {name}
            </p>
            <p className="text-xs text-slate-500 truncate">{email}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onShare}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
                <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
              </svg>
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={onOverview}
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-slate-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m16 8-4 8-4-4 8-4z" />
              </svg>
              OVERVIEW
            </button>
          </div>
          <span className="hidden text-sm text-slate-700 sm:inline">
            {chapter}
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-yellow-400 text-xs font-bold text-slate-900">
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileStrip;
