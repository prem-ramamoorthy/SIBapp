import { useId, useState } from "react";

export default function DirectoryFilters({
  regions = ["All Regions", "North", "South", "East", "West"],
  chapters = ["All Chapters", "Alpha", "Beta", "Gamma"],
  verticals = ["All Verticals", "Engineering", "Design", "Marketing"],
  sorts = ["Name", "Chapter", "Region"],
  onChange,
  onClear,
  onExport,
}) {
  const regionId = useId();
  const chapterId = useId();
  const verticalId = useId();
  const sortId = useId();
  const [state, setState] = useState({
    region: regions[0],
    chapter: chapters[0],
    vertical: verticals[0],
    sort: sorts[0],
    myChapterOnly: false,
  });

  const update = (patch) => {
    const next = { ...state, ...patch };
    setState(next);
    onChange?.(next);
  };

  return (
    <section
      className="
        w-full
        rounded-3xl
        bg-[#FFF4DF]
        p-4 md:p-6
        shadow-sm
        border border-amber-100
      "
      aria-label="Directory filters"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* Region */}
        <div className="flex flex-col">
          <label htmlFor={regionId} className="text-sm font-medium text-gray-700">
            Region:
          </label>
          <select
            id={regionId}
            value={state.region}
            onChange={(e) => update({ region: e.target.value })}
            className="
              mt-1 h-11
              rounded-xl
              bg-white
              px-3
              text-sm
              text-gray-900
              ring-1 ring-gray-200
              focus:outline-none focus:ring-2 focus:ring-amber-400
              appearance-none
              pr-9
              bg-[right_0.65rem_center] bg-no-repeat
            "
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 50%, #6B7280 50%), linear-gradient(135deg, #6B7280 50%, transparent 50%)",
              backgroundSize: "6px 6px, 6px 6px",
              backgroundPosition: "calc(100% - 18px) 55%, calc(100% - 12px) 55%",
            }}
          >
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Chapter */}
        <div className="flex flex-col">
          <label htmlFor={chapterId} className="text-sm font-medium text-gray-700">
            Chapter:
          </label>
          <select
            id={chapterId}
            value={state.chapter}
            onChange={(e) => update({ chapter: e.target.value })}
            className="
              mt-1 h-11 rounded-xl bg-white px-3 text-sm text-gray-900
              ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400
              appearance-none pr-9
            "
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 50%, #6B7280 50%), linear-gradient(135deg, #6B7280 50%, transparent 50%)",
              backgroundSize: "6px 6px, 6px 6px",
              backgroundPosition: "calc(100% - 18px) 55%, calc(100% - 12px) 55%",
              backgroundRepeat: "no-repeat",
            }}
          >
            {chapters.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Vertical */}
        <div className="flex flex-col">
          <label htmlFor={verticalId} className="text-sm font-medium text-gray-700">
            Vertical:
          </label>
          <select
            id={verticalId}
            value={state.vertical}
            onChange={(e) => update({ vertical: e.target.value })}
            className="
              mt-1 h-11 rounded-xl bg-white px-3 text-sm text-gray-900
              ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400
              appearance-none pr-9
            "
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 50%, #6B7280 50%), linear-gradient(135deg, #6B7280 50%, transparent 50%)",
              backgroundSize: "6px 6px, 6px 6px",
              backgroundPosition: "calc(100% - 18px) 55%, calc(100% - 12px) 55%",
              backgroundRepeat: "no-repeat",
            }}
          >
            {verticals.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        {/* Sort by */}
        <div className="flex flex-col md:items-end">
          <label htmlFor={sortId} className="text-sm font-medium text-gray-700 md:self-end">
            Sort by:
          </label>
          <select
            id={sortId}
            value={state.sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="
              mt-1 h-11 rounded-xl bg-white px-3 text-sm text-gray-900
              ring-2 ring-emerald-300 focus:outline-none focus:ring-2 focus:ring-amber-400
              md:w-56
              appearance-none pr-9
            "
            style={{
              backgroundImage:
                "linear-gradient(45deg, transparent 50%, #6B7280 50%), linear-gradient(135deg, #6B7280 50%, transparent 50%)",
              backgroundSize: "6px 6px, 6px 6px",
              backgroundPosition: "calc(100% - 18px) 55%, calc(100% - 12px) 55%",
              backgroundRepeat: "no-repeat",
            }}
          >
            {sorts.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bottom row: toggle + buttons */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <label className="inline-flex items-center gap-3">
          <input
            type="checkbox"
            checked={state.myChapterOnly}
            onChange={(e) => update({ myChapterOnly: e.target.checked })}
            className="
              peer sr-only
            "
            aria-label="Show my chapter only"
          />
          <span
            className="
              relative inline-flex h-7 w-12 cursor-pointer items-center rounded-full
              bg-gray-300 transition-colors
              after:absolute after:left-1 after:h-5 after:w-5 after:rounded-full after:bg-white
              after:transition-all
              peer-checked:bg-amber-400 peer-checked:after:translate-x-5
              ring-1 ring-inset ring-gray-300
            "
            aria-hidden="true"
          />
          <span className="text-gray-700 text-sm">Show My Chapter Only</span>
        </label>

        <div className="flex gap-3 md:justify-end">
          <button
            type="button"
            onClick={() => {
              const reset = {
                region: regions[0],
                chapter: chapters[0],
                vertical: verticals[0],
                sort: sorts[0],
                myChapterOnly: false,
              };
              setState(reset);
              onClear?.(reset);
            }}
            className="
              h-11 rounded-xl bg-white px-4 text-sm font-medium text-gray-700
              ring-1 ring-gray-200 hover:bg-gray-50
              focus:outline-none focus:ring-2 focus:ring-amber-400
            "
          >
            Clear Filters
          </button>

          <button
            type="button"
            onClick={() => onExport?.(state)}
            className="
              h-11 rounded-xl bg-yellow-400 px-4 text-sm font-semibold text-gray-900
              hover:bg-yellow-300
              focus:outline-none focus:ring-2 focus:ring-amber-400
              shadow
            "
          >
            Export Directory
          </button>
        </div>
      </div>
    </section>
  );
}
