import { useEffect } from "react";
import Filter from "./Components/Filter";
import Checkbox from "./Components/Checkbox";
import FilterButton from "./Components/FilterButton";

export default function DirectoryFilters({
  region, setRegion,
  chapter, setChapter,
  vertical, setVertical,
  myChapterOnly, setMyChapterOnly,
  sort, setSort,
  regions = ["All Regions", "North", "South", "East", "West"],
  chapters = ["All Chapters", "Alpha", "Beta", "Gamma"],
  verticals = ["All Verticals", "Engineering", "Design", "Marketing"],
  sorts = ["Name A-Z", "Name Z-A", "Chapter", "Region"],
  onChange = () => { },
  onClear = () => { },
  onExport = () => { },
}) {
  useEffect(() => {
    onChange({
      region, chapter, vertical, myChapterOnly, sort
    });
  }, [region, chapter, vertical, myChapterOnly, sort]);

  const clear = () => {
    setRegion(regions[0]);
    setChapter(chapters[0]);
    setVertical(verticals[0]);
    setSort(sorts[0]);
    setMyChapterOnly(false);
    onClear?.();
  };

  return (
    <section className="min-w-full rounded-3xl bg-white dark:bg-gray-800 md:p-6 shadow-2xl border border-gray-200 dark:border-gray-700 transition-colors duration-300" aria-label="Directory filters">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center px-4 pt-3">
        <Filter name="Region" state={region} update={setRegion} content={regions} />
        <Filter name="Chapter" state={chapter} update={setChapter} content={chapters} />
        <Filter name="Vertical" state={vertical} update={setVertical} content={verticals} />
        <Filter name="Sort by" state={sort} update={setSort} content={sorts} />
      </div>

      <div className="mt-1 sm:mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 pt-3 pb-3">
        <Checkbox state={myChapterOnly} update={setMyChapterOnly} content="Show My Chapter Only" />
        <div className="flex gap-3 md:justify-end">
          <FilterButton
            content="Clear Filter"
            onClick={clear}
            bg="bg-white dark:bg-gray-300"
            hover="hover:bg-gray-200 dark:hover:bg-gray-400"
          />
          <FilterButton
            content="Export Directory"
            onClick={onExport}
            bg="bg-yellow-300 dark:bg-yellow-500"
            hover="hover:bg-yellow-400 dark:hover:bg-yellow-600"
          />
        </div>
      </div>
    </section>
  );
}
