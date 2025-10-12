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
  onClear = () => { },
  onExport = () => { },
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
  }

  return (
    <section
      className="
        min-w-full
        rounded-3xl
        bg-white
        p-2 md:p-6
        shadow-2xl
        border border-white
      "
      aria-label="Directory filters"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-cente">
        <Filter name="Region" state={state.region} update={update} content={regions} />
        <Filter name="Chapter" state={state.chapter} update={update} content={chapters} />
        <Filter name="Vertical" state={state.vertical} update={update} content={verticals} />
        <Filter name="Sort by" state={state.sort} update={update} content={sorts} />
      </div>

      <div className="mt-2 sm:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 h-fit">
        <Checkbox state={state.myChapterOnly} update={update} content="Show My Chapter Only" />

        <div className="flex gap-3 md:justify-end h-[45px] lg:h-[30px] md:h-[60px]">
          <FilterButton  content="Clear Filter" onclick={clear} bg="bg-white" hover="hover:bg-gray-200"/>
          <FilterButton content="Export Directory" onclick={onExport} bg="bg-yellow-300" hover="hover:bg-yellow-400"/>
        </div>
      </div>
    </section>
  );
}
