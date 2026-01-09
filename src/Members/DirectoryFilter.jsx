import { useEffect } from "react";
import Filter from "./Components/Filter";
import Checkbox from "./Components/Checkbox";
import FilterButton from "./Components/FilterButton";
import { useRef } from "react";

export default function DirectoryFilters({
  region, setRegion,
  chapter, setChapter,
  vertical, setVertical,
  myChapterOnly, setMyChapterOnly,
  sort, setSort,
  search, setSearch,
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
      region, chapter, vertical, myChapterOnly, sort, search
    });
  }, [region, chapter, vertical, myChapterOnly, sort, search]);

  const clear = () => {
    setRegion(regions[0]);
    setChapter(chapters[0]);
    setVertical(verticals[0]);
    setSort(sorts[0]);
    setMyChapterOnly(false);
    setSearch("");
    onClear?.();
  };

  // Debounce search input
  const debounceTimeout = useRef();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      setSearch(value);
    }, 500);
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
        <div className="flex gap-3 items-center">
          <input
            type="text"
            className="border rounded-3xl px-3 py-2 w-full md:w-64 bg-gray-200 border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Search members/verticals..."
            defaultValue={search}
            onChange={handleSearchChange}
          />
          <Checkbox state={myChapterOnly} update={setMyChapterOnly} content="Show My Chapter Only" />
        </div>
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
