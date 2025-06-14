export function Badge({ children }) {
  return (
    <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
      {children}
    </span>
  );
}
