export default function ShipmentTabs({ active, setActive }: any) {
  const tabs = [
    "All",
    "On Time",
    "In Transit",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="flex gap-3 bg-white p-3 rounded-lg shadow mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-3 py-1 rounded-full text-sm ${
            active === tab
              ? "bg-lime-500 text-white"
              : "bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}