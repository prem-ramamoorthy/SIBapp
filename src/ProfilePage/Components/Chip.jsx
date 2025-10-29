import { useState, useRef , useEffect} from "react";

const BUSINESS_VERTICALS = ["Textile", "IT", "Cloud Computing & SaaS", "Textiles & Garments", "Silk & Handloom", "Automobile & Auto Components", "Electric Vehicles", "Agriculture & Agri-Tech", "Horticulture & Floriculture", "Fisheries & Aquaculture", "Dairy & Poultry", "Healthcare & Hospitals", "Medical Devices & Diagnostics", "Pharmaceuticals", "Education & EdTech", "Colleges & Schools", "Coaching Centers & Tuition", "Banking & Financial Services", "NBFCs & Microfinance", "FinTech", "Construction & Real Estate", "Civil Engineering", "Transport & Logistics", "Trucking & Lorry Agencies", "Warehousing & Cold Chains", "Retail & FMCG", "E-commerce", "Food Processing", "Spices & Condiments", "Rice Mills & Food Grains", "Tea & Plantation Sector", "Coffee & Pepper Plantations", "Sugar Mills", "Hospitality & Tourism", "Hotels & Resorts", "Luxury Weddings & Destinations", "Cinema & Film Production", "Media & Publishing", "Tamil Publishing & Printing", "Television & Broadcasting", "Manufacturing (including MSMEs)", "Heavy Engineering", "Leather & Footwear", "Jewellery & Gold", "Handicrafts & Cottage Industries", "Aerospace & Defence Manufacturing", "Renewable Energy (Wind/Solar)", "Power Generation & Distribution", "Electricals & Electronics", "Home Appliances & Consumer Electronics", "Mobile & Telecom Services", "Shipping & Ports", "Chemical & Petrochemicals", "Plastic & Packaging", "AYUSH (Siddha, Ayurveda, Homeopathy)", "Biotechnology", "Research & Development", "Legal Services", "Chartered Accountancy & Auditing", "Business Consulting", "HR & Manpower Agencies", "Startup & Entrepreneurship", "Venture Capital & Angel Investment", "Event Management", "Sports & Recreation", "Gyms & Fitness", "NGO & Social Services", "Public Sector & Government Services", "Security Services", "Courier & Parcel Services", "Restaurants & Food Chains", "Bakeries & Sweets", "Electrical Contractor & Services", "Realty (Land & Plots)", "Water Management & Borewell Services", "Waste Management", "Artisans & Sculpture", "Religious Services (Temple Management, Festival Organizing)", "Language & Translation Services", "Animation & Game Development", "Advertising & Digital Marketing", "Cybersecurity", "Data Analytics", "Financial Planning & Wealth Management"];

const Chip = ({
  children,
  editable,
  onChange,
  onDelete,
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
          {showDropdown && (
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
