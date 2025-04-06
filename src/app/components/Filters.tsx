// components/Filters.tsx
type Props = {
  level: string;
  onChange: (level: string) => void;
};

export default function Filters({ level, onChange }: Props) {
  return (
    <div className="flex items-center gap-3 bg-transparent p-4 rounded-lg shadow border border-gray-200">
      <label className="text-gray-700 font-medium">Filter by level:</label>
      <select
        value={level}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">All</option>
        <option value="INFO">INFO</option>
        <option value="WARN">WARN</option>
        <option value="ERROR">ERROR</option>
        <option value="DEBUG">DEBUG</option>
        <option value="TRACE">TRACE</option>
      </select>
    </div>
  );
}
