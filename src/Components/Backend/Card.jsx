export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-md border border-gray-100 transition hover:shadow-lg ${className}`}>
      {children}
    </div>
  );
}
