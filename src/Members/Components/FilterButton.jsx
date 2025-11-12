import clsx from "clsx";

export default function FilterButton({
  content,
  bg = "bg-white dark:bg-gray-700",
  hover = "hover:bg-gray-100 dark:hover:bg-gray-600",
  onClick,
  onClose,
  disabled = false,
  loading = false,
  className,
  type = "button",
}) {
  const handleClick = () => {
    onClick?.();
    onClose?.();
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={clsx(
        "relative h-9 rounded-xl px-4 text-sm font-medium text-gray-700 dark:text-gray-100 ring-1 ring-gray-200 dark:ring-gray-600 focus:outline-none focus:ring-2 transition-colors",
        bg,
        !disabled && !loading && hover,
        (disabled || loading) && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      {loading && (
        <span className="absolute right-3 top-1.5 h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      )}
      {content}
    </button>
  );
}
