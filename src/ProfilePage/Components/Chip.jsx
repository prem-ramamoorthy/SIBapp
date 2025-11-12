import { useState, useRef , useEffect} from "react";

const BUSINESS_VERTICALS = [];

const Chip = ({
  children,
  editable,
  onChange,
  onDelete,
  isvertical,
}) => {
  const [inputValue, setInputValue] = useState(children);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  const filteredOptions = BUSINESS_VERTICALS.filter((v) =>
    v.toLowerCase().includes((inputValue || "").toLowerCase())
  );

  const handleSelect = (val) => {
    setInputValue(val);
    setShowDropdown(false);
    onChange && onChange(val);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center rounded-full border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-gray-200 shadow-sm"
    >
      {editable ? (
        <>
          <input
            type="text"
            value={inputValue}
            onFocus={() => setShowDropdown(true)}
            onChange={e => {
              setInputValue(e.target.value);
              setShowDropdown(true);
              onChange && onChange(e.target.value);
            }}
            className="bg-transparent w-full focus:outline-none"
            autoComplete="off"
          />
          {isvertical && showDropdown && (
            <div className="absolute z-20 top-full left-0 w-full bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded mt-0.5 shadow-xl max-h-40 overflow-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((val) => (
                  <div
                    key={val}
                    className="cursor-pointer px-2 py-1 hover:bg-slate-100 dark:hover:bg-gray-700 text-sm"
                    onMouseDown={e => {
                      e.preventDefault();
                      handleSelect(val);
                    }}
                  >
                    {val}
                  </div>
                ))
              ) : (
                <div className="px-2 py-1 text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        children
      )}
      {editable && onDelete && (
        <button
          onClick={onDelete}
          className="ml-1 text-red-500 hover:text-red-700 font-bold"
        >
          ×
        </button>
      )}
    </span>
  );
};

export default Chip;
