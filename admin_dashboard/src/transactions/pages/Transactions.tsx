import { useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import TransactionTable from "../components/TransactionTable.tsx";
import Pagination from "../components/Pagination.tsx";
import StatusFilter from "../components/StatusFilter.tsx";

import {  PiExportBold } from "react-icons/pi";
const data = Array.from({ length: 15 }).map((_, i) => ({
  id: "#201238",
  client: "Suresh Kumar",
  partner: "Santo jadhv",
  date: "2026-03-01\n04:28:48",
  amount: "₹295.81",
  status: ["Completed", "Pending", "Failed"][i % 3] as
    | "Completed"
    | "Pending"
    | "Failed",
}));

export default function Transactions() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 5;

  const filtered = data.filter((item) => {
  const matchesSearch = item.client
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesStatus =
    status === "All" || item.status === status;

  return matchesSearch && matchesStatus;
});
const totalPages = Math.ceil(filtered.length / itemsPerPage);

const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedData = filtered.slice(
  startIndex,
  startIndex + itemsPerPage
);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-3">
            <StatusFilter value={status} onChange={setStatus}/>
          <SearchBar value={search} onChange={setSearch} />
          </div>
          <button className="flex items-center gap-2  border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
  <PiExportBold className="text-base" />
  Export
</button>
        </div>

        {/* Table */}
        <TransactionTable data={paginatedData} />

        {/* Pagination */}
        <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
      </div>
    </div>
  );
}