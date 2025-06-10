"use client";



export default function SimpleSelect({ options = [], value, onChange }) {
  return (
    <select
      className="w-full border border-gray-300 rounded-md p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Sélectionnez une ville</option>
      {Array.isArray(options) &&
        options.map((opt) => (
          <option key={opt.id} value={opt.city_name}>
            {opt.city_name}
          </option>
        ))}
    </select>
  );
}



