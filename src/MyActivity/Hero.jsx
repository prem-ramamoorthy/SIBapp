import React from "react";

function Hero() {
  const [value, setValue] = React.useState("all");

  const options = [
    { value: "all", label: "All" },
    { value: "tyfcb", label: "TYFCB" },
    { value: "one_to_one", label: "One to One" },
    { value: "referral", label: "Referral" }
  ];

  return (
    <div className="container w-[99%] h-fit bg-white p-4 my-4 ml-2 rounded-2xl">
      <h2>Activity Type</h2>
      <fieldset role="radiogroup" aria-label="Activity Type" style={{ border: 0, padding: 0, margin: 0 }}>
        {options.map(opt => (
          <label key={opt.value} className="rp-item">
            <input
              type="radio"
              className="rp-input"
              name="activity-type"
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => setValue(e.target.value)}
            />
            <span className="rp-text">{opt.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="dateselection">
        <label className="date-item">
          <span className="rp-text">from</span>
          <input
            type="date"
            className="rp-input"
            name="activity-type"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <label className="date-item">
           <span className="rp-text">To</span>
          <input
            type="date"
            className="rp-input"
            name="activity-type"
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default Hero;
