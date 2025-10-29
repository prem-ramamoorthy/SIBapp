import { useEffect, useState } from "react";

const BioSection = ({ title, content, editable, onChange, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  const panelId = `${title.replace(/\s+/g, "-").toLowerCase()}-panel`;
  const btnId = `${title.replace(/\s+/g, "-").toLowerCase()}-button`;

  const handleChange = (e) => {
    const val = e.target.value;
    setLocalContent(val);
    onChange && onChange(val);
  };

  return (
    <div className="border-t border-slate-200 dark:border-gray-700 first:border-t-0 p-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800 dark:text-gray-100">{title}</h3>
        <button
          id={btnId}
          type="button"
          className="inline-flex w-8 items-center justify-center rounded-md text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-gray-500"
          aria-controls={panelId}
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <svg
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.25 8.27a.75.75 0 0 1-.02-1.06z" />
          </svg>
        </button>
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        className={`grid overflow-hidden transition-all duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0">
          <div className="pb-4 text-sm leading-6 text-slate-700 dark:text-gray-300">
            {editable ? (
              <textarea
                value={localContent}
                onChange={handleChange}
                className="w-full rounded border border-slate-300 dark:border-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={6}
              />
            ) : (
              <div>{localContent}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BioSection;
