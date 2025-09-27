import { useId, useState, useEffect } from "react";

const PRESETS = [
  { label: "Tepid",    value: "tepid",    bar: "bg-cyan-500" },
  { label: "Warm",     value: "warm",     bar: "bg-green-500" },
  { label: "Hot",      value: "hot",      bar: "bg-amber-400" },
  { label: "Very Hot", value: "very-hot", bar: "bg-orange-500" },
  { label: "Burning",  value: "burning",  bar: "bg-red-500" },
];

export default function HeatScale({
  legend = "How hot is this referral?",
  options = PRESETS,
  value,
  onChange,
  defaultValue = "tepid"
}) {
  const name = useId();
  const [internal, setInternal] = useState(value ?? defaultValue);

  useEffect(() => {
    if (typeof value === "string") setInternal(value);
  }, [value]);

  const current = typeof value === "string" ? value : internal;

  const setVal = (v) => {
    if (typeof value !== "string") setInternal(v);
    onChange?.(v);
  };

  return (
    <fieldset className="w-full">
      <legend className="mb-3 block text-sm font-medium text-gray-900">
        {legend}
      </legend>

      <div className="flex items-stretch gap-4">
        {options.map((opt) => {
          const active = current === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={`${name}-${opt.value}`}
              className={[
                "group relative grid cursor-pointer select-none place-items-center",
                "rounded-md px-3 py-2",
                active ? "bg-yellow-400" : "bg-transparent",
                active ? "shadow-sm ring-1 ring-yellow-500/50" : "",
                "transition-colors",
              ].join(" ")}
            >
              <input
                id={`${name}-${opt.value}`}
                type="radio"
                name={name}
                value={opt.value}
                checked={active}
                onChange={() => setVal(opt.value)}
                className="sr-only"
                aria-label={opt.label}
              />
              <span
                className={[
                  "mb-1 h-2 w-2 rounded-full",
                  opt.bar,
                  active ? "" : "opacity-90",
                ].join(" ")}
                aria-hidden="true"
              />
              <span
                className={[
                  "text-sm",
                  active ? "font-bold text-gray-900" : "font-semibold text-gray-800",
                ].join(" ")}
              >
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
