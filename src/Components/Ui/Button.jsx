export function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl transition-colors"
    >
      {children}
    </button>
  );
}
