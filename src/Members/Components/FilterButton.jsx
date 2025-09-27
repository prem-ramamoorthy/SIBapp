import clsx from 'clsx';

function FilterButton({
  content,
  bg = 'bg-white',
  hover = 'hover:bg-gray-100',
  onClick,
  onClose,
  disabled = false,
  loading = false,
  className,
  type = 'button',
}) {
  const handleClick = onClick ?? onClose ?? (() => {});

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={clsx(
        'h-11 rounded-xl px-4 text-sm font-medium text-gray-700 ring-1 ring-gray-200 focus:outline-none focus:ring-2 transition-colors',
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
