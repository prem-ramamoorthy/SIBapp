import clsx from "clsx";

const fontMap = {
  thin: "font-thin",
  extralight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
  black: "font-black",
};

const cursorMap = {
  auto: "cursor-auto",
  default: "cursor-default",
  pointer: "cursor-pointer",
  wait: "cursor-wait",
  text: "cursor-text",
  move: "cursor-move",
  help: "cursor-help",
  "not-allowed": "cursor-not-allowed",
  none: "cursor-none",
  "context-menu": "cursor-context-menu",
  progress: "cursor-progress",
  crosshair: "cursor-crosshair",
  grab: "cursor-grab",
  grabbing: "cursor-grabbing",
  "no-drop": "cursor-no-drop",
};

const borderWidthMap = { 0: "border-0", 2: "border-2", 4: "border-4" };

const colorText800 = {
  red: "text-red-800",
  orange: "text-orange-800",
  amber: "text-amber-800",
  yellow: "text-yellow-800",
  lime: "text-lime-800",
  green: "text-green-800",
  emerald: "text-emerald-800",
  teal: "text-teal-800",
  cyan: "text-cyan-800",
  sky: "text-sky-800",
  blue: "text-blue-800",
  indigo: "text-indigo-800",
  violet: "text-violet-800",
  purple: "text-purple-800",
  fuchsia: "text-fuchsia-800",
  pink: "text-pink-800",
  rose: "text-rose-800",
};

const colorBg300Half = {
  red: "bg-red-300/50",
  orange: "bg-orange-300/50",
  amber: "bg-amber-300/50",
  yellow: "bg-yellow-300/50",
  lime: "bg-lime-300/50",
  green: "bg-green-300/50",
  emerald: "bg-emerald-300/50",
  teal: "bg-teal-300/50",
  cyan: "bg-cyan-300/50",
  sky: "bg-sky-300/50",
  blue: "bg-blue-300/50",
  indigo: "bg-indigo-300/50",
  violet: "bg-violet-300/50",
  purple: "bg-purple-300/50",
  fuchsia: "bg-fuchsia-300/50",
  pink: "bg-pink-300/50",
  rose: "bg-rose-300/50",
};

function ActivityBadge({
  color,
  content,
  border = 0,
  font = "semibold",
  cursor = "no-drop",
  className,
}) {
  return (
    <button
      className={clsx(
        "w-[120px] text-nowrap text-center mx-2 overflow-x-hidden rounded-lg p-1 mb-1 border-amber-500",
        colorText800[color],
        colorBg300Half[color],
        fontMap[font],
        cursorMap[cursor],
        borderWidthMap[border],
        className
      )}
    >
      {content}
    </button>
  );
}

export default ActivityBadge;
