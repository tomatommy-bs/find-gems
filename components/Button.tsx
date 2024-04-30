export default function Button({
  theme = 'dark',
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: 'dark' | 'light';
}) {
  const colors =
    theme == 'dark'
      ? 'button-dark bg-black text-white shadow-blue-600'
      : 'button-light bg-white text-blue-800 shadow-blue-200';

  return (
    <button
      type="button"
      className={`rounded-lg px-4 py-2 shadow transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:grayscale disabled:hover:scale-100  ${colors} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
