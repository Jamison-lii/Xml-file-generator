export default function Input({ type = "text", value, onChange, placeholder, className = "" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] ${className}`}
    />
  );
}
