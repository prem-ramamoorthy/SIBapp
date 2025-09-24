import { Download } from "lucide-react";
import React from "react";
import DateField from "./Components/DateField";

function Hero() {
  const [value, setValue] = React.useState("all");
  const [startDate, setStartDate] = React.useState("2025-09-25");
  const [endDate, setendDate] = React.useState("2025-09-25");

  const options = [
    { value: "all", label: "All" },
    { value: "tyfcb", label: "TYFCB" },
    { value: "one_to_one", label: "One to One" },
    { value: "referral", label: "Referral" }
  ];

  return (
    <div className="container w-[98%] h-fit border-1 border-gray-600 bg-white px-4 pt-2 my-4 ml-2 rounded-2xl flex flex-col justify-start gap-2">
      <h2 className="font-bold text-md">Activity Type</h2>
      <fieldset
        role="radiogroup"
        aria-label="Activity Type"
        style={{ border: 0, padding: 0, margin: 0 }}
        className="flex flex-wrap gap-4 p-4"
      >
        {options.map((opt) => (
          <label key={opt.value} className="rp-item ml-4 flex items-center cursor-pointer select-none">
            <input
              type="radio"
              name="activity-type"
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => setValue(e.target.value)}
              className="sr-only peer"
            />
            <span
              className="
          relative inline-flex h-3 w-3 items-center justify-center rounded-full
          border-3 border-amber-400 transition
          peer-focus-visible:ring-2 peer-focus-visible:ring-red-500
          peer-checked:ring-2 peer-checked:ring-red-500 peer-checked:border-red-500
        "
            >
            </span>

            <span className="rp-text ml-2 font-semibold">{opt.label}</span>
          </label>
        ))}
      </fieldset>

      <h2 className="font-bold mt-2">Date Range</h2>
      <div className="dateselection flex flex-wrap justify-start items-center -mt-2">
        <DateField value={startDate} handler={setStartDate}/>
        <DateField value={endDate} handler={setendDate}/>
        <button className="border-1 rounded-xl bg-amber-300 py-2 m-2
        font-bold flex px-5 flex-row gap-4 hover:bg-amber-300/80 justify-center">
          <Download />
          <p className="">Download CSV</p>
        </button>
      </div>
    </div>
  );
}

export default Hero;
