import { FiCircle } from "react-icons/fi";

const timeline = [
  { title: "In Transit", location: "Hartford, CT", time: "11:30" },
  { title: "In Transit", location: "New Haven, CT", time: "12:45" },
  { title: "Departed", location: "New York, NY", time: "01:20" },
  { title: "Received", location: "New York, NY", time: "02:34" },
  { title: "Picked Up", location: "New York, NY", time: "04:40" },
];

export default function ShipmentTimeline() {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h3 className="font-semibold mb-4" style={{ color: "#9FB133" }}>Tracking Timeline</h3>

      {timeline.map((item, i) => (
        <div key={i} className="flex justify-between mb-3">
          <div className="flex gap-3">
            <FiCircle className="text-green-500 mt-1" />

            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-xs text-gray-500">
                {item.location}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">{item.time}</p>
        </div>
      ))}
    </div>
  );
}