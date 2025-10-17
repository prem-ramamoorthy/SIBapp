import clsx from "clsx";

function ActivityButton({
  content = "hi",
  onClick,
  textColor = "text-red-500/80",
  borderColor = "border-red-500/50",
  fontSize = "text-[12px]",
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "font-semibold py-2 px-4 rounded-2xl border-2",
        textColor,
        borderColor,
        className
      )}
    >
      <p className={clsx("text-nowrap", fontSize)}>{content}</p>
    </button>
  );
}

export default ActivityButton;
