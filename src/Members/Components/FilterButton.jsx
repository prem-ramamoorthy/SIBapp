import clsx from 'clsx';

function FilterButton({
  content,
  bg = 'bg-white dark:bg-gray-700',
  hover = 'hover:bg-gray-100 dark:hover:bg-gray-600',
  onClick,
  onClose,
  disabled = false,
  loading = false,
  className,
  type = 'button',
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
        'h-9 rounded-xl px-4 text-sm font-medium text-gray-700 dark:text-gray-100 ring-1 ring-gray-200 dark:ring-gray-600 focus:outline-none focus:ring-2 transition-colors',
        bg,
        !disabled && !loading && hover,
        (disabled || loading) && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      {loading ? 'Please wait…' : content}
    </button>
  );
}

export default FilterButton;
