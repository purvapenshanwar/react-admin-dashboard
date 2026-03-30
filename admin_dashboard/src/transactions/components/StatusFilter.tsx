type Props = {
  value: string;
  onChange: (value: string) => void;
};

const statuses = ["All", "Completed", "Pending", "Failed"];

export default function StatusFilter({ value, onChange }: Props) {
  return (
    <select
      className="border px-3 py-2 rounded-md text-sm"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}