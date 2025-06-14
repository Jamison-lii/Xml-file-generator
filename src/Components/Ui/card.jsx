export function Card({ children }) {
  return (
    <div className="bg-gray-800 text-white shadow-xl rounded-2xl hover:scale-105 transition-transform">
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
