export default function ShipmentStats() {
  const stats = [
    { label: "Total", value: "1,248" },
    { label: "IN Transit", value: "856", color: "text-blue-600" },
    { label: "Delivered", value: "342", color: "text-green-600" },
    { label: "Delayed", value: "50", color: "text-orange-500" },
    { label: "Cancelled", value: "18" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-4">
      {stats.map((s, i) => (
        <div key={i} className="bg-white p-4 rounded-lg shadow">
          <p className="text-xs text-gray-500">{s.label}</p>
          <h3 className={`font-bold ${s.color || ""}`}>
            {s.value}
          </h3>
        </div>
      ))}
    </div>
  );
}