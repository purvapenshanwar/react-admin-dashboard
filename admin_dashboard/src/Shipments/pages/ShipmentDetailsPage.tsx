import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShipmentTimeline from "../components/ShipmentTimeline";
import PackageDetails from "../components/PackageDetails";
import { FiArrowLeft } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";


export default function ShipmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
 const [search, setSearch] = useState("");
  return (
    <div className="mb-4">
  <div className="relative w-full max-w-md">
    
    {/* Icon */}
    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

    {/* Input */}
    <input
      type="text"
      placeholder="Search shipments, tracking numbers"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-10 pr-4 py-2 
        rounded-lg 
        border border-gray-300 
        shadow-sm 
        bg-transparent 
        text-sm
        focus:outline-none 
        focus:ring-2 focus:ring-[#474747]"
    />
  </div>

    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-sm"
      >
        <FiArrowLeft /> Back to Shipments
      </button>

      {/* Header */}
      <h2 className="text-lg font-semibold">Shipment Details</h2>
      <p className="text-sm text-blue-600 mb-4">
        {id} • In Transit
      </p>

      {/* Timeline */}
      <ShipmentTimeline />

      {/* Package Details */}
      <PackageDetails />
    </div>
    </div>
  );
}