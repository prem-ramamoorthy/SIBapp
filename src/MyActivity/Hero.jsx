import { Download } from "lucide-react";
import DateField from "./Components/DateField";

function downloadJsonAsCsvExcludingFullDetails(jsonData, filename = "user_activities.csv") {
  if (!jsonData || !jsonData.length) {
    alert("No data to download");
    return;
  }
  const headers = Object.keys(jsonData[0]).filter(h => h !== "fullDetails");

  const csvRows = [];
  csvRows.push(headers.join(","));

  jsonData.forEach(item => {
    const values = headers.map(header => {
      const value = item[header];
      const escaped = (value === undefined || value === null) ? "" : ("" + value).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  });

  const csvString = csvRows.join("\n");

  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


function Hero({ value, setValue = () => { }, startDate, endDate, setStartDate = () => { }, setEndDate = () => { } , userdata }) {

  const options = [
    { value: "all", label: "All" },
    { value: "tyftb", label: "TYB" },
    { value: "m2m", label: "One to One" },
    { value: "referral", label: "Referral" },
  ];

  return (
    <div className="min-w-[98%] mt-[80px] h-fit border border-gray-600 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 pt-2 my-4 mx-4  rounded-2xl flex flex-col justify-start gap-2 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <h2 className="font-bold text-md">Activity Type</h2>
      <fieldset
        role="radiogroup"
        aria-label="Activity Type"
        style={{ border: 0, padding: 0, margin: 0 }}
        className="flex flex-wrap gap-4 p-4"
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className="rp-item ml-4 flex items-center cursor-pointer select-none"
          >
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
                h-4 w-4 rounded-full bg-red-500
                opacity-0 scale-0 transition
                peer-checked:opacity-100 peer-checked:scale-100 border-3 border-yellow-400
              "
            />
            <span className="rp-text ml-2 font-semibold">{opt.label}</span>
          </label>
        ))}
      </fieldset>

      <h2 className="font-bold mt-2">Date Range</h2>
      <div className="dateselection flex flex-wrap justify-start items-center -mt-2">
        <DateField value={startDate} handler={setStartDate} />
        <DateField value={endDate} handler={setEndDate} />
        <button
          className="border rounded-xl bg-amber-300 dark:bg-amber-500 py-2 m-2 font-bold flex px-5 flex-row gap-4 hover:bg-amber-300/80 dark:hover:bg-amber-500/80 justify-center text-gray-900 dark:text-gray-900 transition-colors duration-300"
          onClick={() => downloadJsonAsCsvExcludingFullDetails(userdata)}
        >
          <Download />
          <p>Download CSV</p>
        </button>
      </div>
    </div>
  );
}

export default Hero;
