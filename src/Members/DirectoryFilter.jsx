import { useState } from "react";
import Filter from "./Components/Filter";
import Checkbox from "./Components/Checkbox";
import FilterButton from "./Components/FilterButton";

export default function DirectoryFilters({
  regions = ["All Regions", "North", "South", "East", "West"],
  chapters = ["All Chapters", "Alpha", "Beta", "Gamma"],
  verticals = ["All Verticals", "Engineering", "Design", "Marketing"],
  sorts = ["Name", "Chapter", "Region"],
  onChange,
  onClear = () => {},
  onExport = () => {},
}) {
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

  const clear = () => {
    const reset = {
      region: regions[0],
      chapter: chapters[0],
      vertical: verticals[0],
      sort: sorts[0],
      myChapterOnly: false,
    };
    setState(reset);
    onClear?.(reset);
  };

  return (
    <section
      className="
        min-w-full
        rounded-3xl
        bg-white dark:bg-gray-800
        md:p-6
        shadow-2xl
        border border-gray-200 dark:border-gray-700
        transition-colors duration-300
      "
      aria-label="Directory filters"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-1 items-center">
        <Filter name="Region" state={state.region} update={update} content={regions} />
        <Filter name="Chapter" state={state.chapter} update={update} content={chapters} />
        <Filter name="Vertical" state={state.vertical} update={update} content={verticals} />
        <Filter name="Sort by" state={state.sort} update={update} content={sorts} />
      </div>

      <div className="mt-1 sm:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <Checkbox state={state.myChapterOnly} update={update} content="Show My Chapter Only" />

        <div className="flex gap-3 md:justify-end">
          <FilterButton
            content="Clear Filter"
            onclick={clear}
            bg="bg-white dark:bg-gray-700"
            hover="hover:bg-gray-200 dark:hover:bg-gray-600"
          />
          <FilterButton
            content="Export Directory"
            onclick={onExport}
            bg="bg-yellow-300 dark:bg-yellow-500"
            hover="hover:bg-yellow-400 dark:hover:bg-yellow-600"
          />
        </div>
      </div>
    </section>
  );
}
