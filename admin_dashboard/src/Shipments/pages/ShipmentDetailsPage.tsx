import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSearch,
  FiCircle,
  FiBox,
} from "react-icons/fi";

export default function ShipmentDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const timeline = [
    { title: "In Transit", location: "New Haven, CT", time: "12:45" },
    { title: "Departed", location: "New York, NY", time: "01:20" },
    { title: "Received", location: "New York, NY", time: "02:34" },
    { title: "Picked Up", location: "New York, NY", time: "04:40" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      
      {/* 🔍 SEARCH */}
      <div className="mb-4 relative w-full max-w-md">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search shipments, tracking numbers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg 
                     border border-gray-300 
                     bg-white text-black
                     dark:bg-gray-800 dark:text-white dark:border-gray-600
                     text-sm focus:outline-none 
                     focus:ring-2 focus:ring-[#474747]"
        />
      </div>

      {/* 🔙 BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-sm 
                   text-gray-600 dark:text-gray-300"
      >
        <FiArrowLeft /> Back to Shipments
      </button>

      {/* HEADER */}
      <h2 className="text-lg font-semibold">Shipment Details</h2>
      <p className="text-sm text-green-600 mb-4">
        {id} • In Transit
      </p>

      {/* ================== TIMELINE ================== */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg 
                border border-gray-200 dark:border-gray-700 mb-4">

  <h3 className="font-semibold mb-4 text-green-600">
    Tracking Timeline
  </h3>

  <div className="relative">
    {timeline.map((item, i) => (
      <div key={i} className="flex gap-4 relative pb-6">
        
        {/* 🔥 LEFT SIDE (ICON + LINE) */}
        <div className="flex flex-col items-center">
          
          {/* ICON */}
          <div className="w-3 h-3 rounded-full bg-green-500 z-10" />

          {/* LINE (ONLY IF NOT LAST ITEM) */}
          {i !== timeline.length - 1 && (
            <div className="w-[2px] h-full bg-gray-300 dark:bg-gray-600" />
          )}
        </div>

        {/* 🔥 CONTENT */}
        <div>
          <p className="font-medium">{item.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.location}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.time}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* ================== PACKAGE DETAILS ================== */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg 
                      border border-gray-200 dark:border-gray-700">
        
        {/* HEADER */}
        <div className="flex items-center gap-2 mb-4">
          <FiBox className="text-green-600 text-lg" />
          <h3 className="font-semibold">
            Package Details
          </h3>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-4 gap-y-4 text-sm">
          
          <Detail label="Vehicle" value="Truck" />
          <Detail label="Weight" value="24.5 lbs" />
          <Detail label="Dimensions" value={`18" × 12" × 8"`} />
          <Detail label="Package Type" value="Standard Box" />
          <Detail label="Service Type" value="Express Delivery" />
          <Detail label="Service Type" value="Express Delivery" />
          <Detail label="Declared Value" value="₹450.00" />
          <Detail label="Fragile" value="Yes" />
        </div>
      </div>
    </div>
  );
}

/* 🔁 SMALL REUSABLE BLOCK */
function Detail({ label, value }: any) {
  return (
    <div>
      <p className="text-gray-400">{label}</p>
      <p className="font-medium text-black dark:text-white">{value}</p>
    </div>
  );
}











// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import ShipmentTimeline from "../components/ShipmentTimeline";
// import PackageDetails from "../components/PackageDetails";
// import { FiArrowLeft } from "react-icons/fi";
// import { FiSearch } from "react-icons/fi";


// export default function ShipmentDetailsPage() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//  const [search, setSearch] = useState("");
//   return (
//     <div className="mb-4">
//   <div className="relative w-full max-w-md">
    
//     {/* Icon */}
//     <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

//     {/* Input */}
//     <input
//       type="text"
//       placeholder="Search shipments, tracking numbers"
//       value={search}
//       onChange={(e) => setSearch(e.target.value)}
//       className="w-full pl-10 pr-4 py-2 
//         rounded-lg 
//         border border-gray-300 
//         shadow-sm 
//         bg-transparent 
//         text-sm
//         focus:outline-none 
//         focus:ring-2 focus:ring-[#474747]"
//     />
//   </div>

//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Back */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-4 text-sm"
//       >
//         <FiArrowLeft /> Back to Shipments
//       </button>

//       {/* Header */}
//       <h2 className="text-lg font-semibold">Shipment Details</h2>
//       <p className="text-sm text-blue-600 mb-4">
//         {id} • In Transit
//       </p>

//       {/* Timeline */}
//       <ShipmentTimeline />

//       {/* Package Details */}
//       <PackageDetails />
//     </div>
//     </div>
//   );
// }