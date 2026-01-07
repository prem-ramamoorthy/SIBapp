import { useState, useEffect, useRef } from "react";

function CrossChapterSearch({
  value,
  onChange,
  placeholder = "Search username...",
  label = "To",
  offsubmit = false,
  searchdomain = "searchuser",
  readonly = false,
  userstate = null,
}) {
  const [crosschapter, setcrosschapter] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchdomainstate, setSearchdomainstate] = useState("");

  useEffect(() => setSearchdomainstate(searchdomain), [searchdomain])

  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/dashboard/${searchdomainstate}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ substr: searchTerm }),
            credentials: "include",
          }
        );

        const data = await res.json();
        if(userstate && data?.userdata){
          userstate(data.userdata);
        }
        if (!res.ok || data?.errors || data?.message) {
          const errMsg =
            data?.errors?.[0]?.msg || data?.message || "An unknown error occurred.";
          setError(errMsg);
          setResults([]);
        } else {
          const resData = data?.results || [];
          setResults(resData);
          setShowDropdown(true);
        }
      } catch (err) {
        setError(err.message || "Network error");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [searchTerm]);

  const handleSelect = (item) => {
    setSearchTerm(item);
    onChange?.(item);
    setShowDropdown(false);
  };

  const handlecross = () => {
    searchdomain === 'searchuser' ? setSearchdomainstate('searchalluser') : setSearchdomainstate('searchalluser');
    crosschapter ? setcrosschapter(false) : setcrosschapter(true);
  }

  return (
    <div className="flex flex-col items-start w-full gap-1" ref={wrapperRef}>
      <label className="text-sm font-medium text-gray-900 dark:text-gray-200">
        {label}
      </label>

      <div className="relative w-full">
        <input
          type="text"
          readOnly={readonly}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-yellow-300 bg-gray-100
            px-4 py-3 text-gray-800 placeholder:text-gray-400 placeholder:text-sm
            focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400
            dark:bg-gray-800 dark:border-yellow-500 dark:text-gray-100 dark:placeholder:text-gray-400"
        />

        {loading && (
          <div className="absolute right-3 top-3 animate-spin rounded-full h-5 w-5 border-2 border-yellow-400 border-t-transparent" />
        )}

        {error && (
          <p className="mt-1 text-sm text-red-500 font-medium">{error}</p>
        )}

        {showDropdown && !loading && results.length > 0 && (
          <ul
            className="absolute z-20 mt-2 w-full max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg
              dark:bg-gray-900 dark:border-gray-700"
          >
            {results.map((username, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(username)}
                className="cursor-pointer px-4 py-2 text-sm text-gray-800 hover:bg-yellow-100 dark:text-gray-200 dark:hover:bg-yellow-600/30"
              >
                {username || "Unnamed User"}
              </li>
            ))}
          </ul>
        )}

        {showDropdown && !loading && results.length === 0 && !error && (
          <div className="absolute mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            No results found
          </div>
        )}

      </div>
      {offsubmit !== true ? <button type="button" className="mt-2 inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-500 " onClick={handlecross}>
        {crosschapter ? "Hide Cross Chapter" : "Search Cross Chapter"}
      </button> : null}
    </div>
  );
}

export default CrossChapterSearch;
