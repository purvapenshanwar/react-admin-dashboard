import { useState } from "react";
import ShipmentTable from "../components/ShipmentTable.tsx";
import ShipmentStats from "../components/ShipmentStats.tsx";
import ShipmentTabs from "../components/ShipmentTabs.tsx";
import { FiDownload, FiUpload } from "react-icons/fi";
import Pagination from "../../transactions/components/Pagination.tsx"

const initialData = Array.from({ length: 20 }).map((_, i) => ({
  id: `20123${i}`,
  customer: "Goodwill James",
  email: "berlin@mail.com",
  pickup: "Kawasaki City",
  pickupDate: "Feb 01, 2026",
  drop: "Asaba Airport",
  dropDate: "Dec 11, 2026",
  status: ["Cancelled", "On Time", "In Transit", "Delivered"][i % 4],
}));

export default function ShipmentPage() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // 🔥 TAB FILTER
  const filteredData =
    tab === "All"
      ? data
      : data.filter((item) =>
          item.status.toLowerCase().includes(tab.toLowerCase())
        );

  // 🔥 PAGINATION
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 🔥 EXPORT (CSV)
  const handleExport = () => {
    const csv = [
      ["ID", "Customer", "Status"],
      ...data.map((d) => [d.id, d.customer, d.status]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "shipments.csv";
    a.click();
  };

  // 🔥 IMPORT (JSON FILE)
  const handleImport = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result as string);
        setData(json);
      } catch {
        alert("Invalid file format");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Shipment</h2>
          <p className="text-sm text-gray-500">
            Welcome back! Here's today's snapshot.
          </p>
        </div>

        <div className="flex gap-2">
          <label className="flex items-center gap-2 border px-3 py-1 rounded cursor-pointer">
            <FiUpload /> Import
            <input type="file" hidden onChange={handleImport} />
          </label>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 border px-3 py-1 rounded"
          >
            <FiDownload /> Export
          </button>
        </div>
      </div>

      <ShipmentStats />

      <ShipmentTabs active={tab} setActive={setTab} />

      <ShipmentTable
        data={paginatedData}
        setData={setData}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}