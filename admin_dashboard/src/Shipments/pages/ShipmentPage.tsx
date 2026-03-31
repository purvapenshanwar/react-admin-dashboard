import { useState, useRef, useEffect } from "react";
import {
  FiDownload,
  FiMoreVertical,
  FiEye,
  FiEdit,
  FiTrash,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiPackage,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
/* ================== DATA ================== */

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

/* ================== MAIN ================== */

export default function ShipmentPage() {
  const [data, setData] = useState(initialData);
  const [tab, setTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 6;

  const filteredData = data.filter((item) => {
  const matchesTab =
    tab === "All" ||
    item.status.toLowerCase().includes(tab.toLowerCase());

  const matchesSearch =
    item.customer.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.id.toLowerCase().includes(search.toLowerCase());

  return matchesTab && matchesSearch;
});

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ================== EXPORT ================== */
  const handleExport = () => {
    const csv = [
      ["ID", "Customer", "Email", "Pickup", "Pickup Date", "Drop", "Drop Date", "Status"],
      ...data.map((d) => [
        d.id,
        d.customer,
        d.email,
        d.pickup,
        d.pickupDate,
        d.drop,
        d.dropDate,
        d.status,
      ]),
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

  return (
    <div className=" min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Shipment</h2>
          <p className="text-sm text-gray-500">
            Welcome back! Here's today's snapshot.
          </p>
        </div>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 border px-3 py-1 rounded bg-white text-gray-700 border border-gray-300 
           hover:bg-gray-100
           dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <FiDownload /> Export
        </button>
      </div>
   <div className="flex justify-end mb-4">
  <div className="relative w-[30%]">
    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="w-full border pl-10 pr-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-400  dark:bg-gray-800 dark:text-white dark:border-gray-600"
    />
  </div>
</div>
      {/* ================== STATS ================== */}
   <div className="grid grid-cols-5 gap-4 mb-4">
  {[
    {
      label: "Total",
      value: data.length,
      icon: <FiPackage />,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "In Transit",
      value: data.filter((d) => d.status === "In Transit").length,
      icon: <FiTruck />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Delivered",
      value: data.filter((d) => d.status === "Delivered").length,
      icon: <FiCheckCircle />,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Delayed",
      value: data.filter((d) => d.status === "On Time").length,
      icon: <FiClock />,
      color: "bg-orange-100 text-orange-500",
    },
    {
      label: "Cancelled",
      value: data.filter((d) => d.status === "Cancelled").length,
      icon: <FiXCircle />,
      color: "bg-red-100 text-red-500",
    },
  ].map((s, i) => (
    <div
      key={i}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700  flex justify-between items-center"
    >
      <div>
        <p className="text-xs text-gray-500">{s.label}</p>
        <h3 className="font-bold">{s.value}</h3>
      </div>

      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full ${s.color}`}
      >
        {s.icon}
      </div>
    </div>
  ))}
</div>
      {/* ================== TABS ================== */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg mb-4 flex gap-3 border border-gray-200 dark:border-gray-700">
  {["All", "On Time", "In Transit", "Delivered", "Cancelled"].map((t) => (
    <button
      key={t}
      onClick={() => {
        setTab(t);
        setCurrentPage(1);
      }}
      className={`px-3 py-1 rounded-full text-sm transition ${
      tab === t
  ? "bg-gray-200  font-semibold"
  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      {t}
    </button>
  ))}
</div>

      {/* ================== TABLE ================== */}
      <div className="bg-white dark:bg-gray-800 rounded-lg  overflow-visible">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-green-300 dark:bg-green-400 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Tracking ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Pick up</th>
              <th className="p-3">Drop</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((item, i) => (
              <ShipmentRow
                key={i}
                index={(currentPage - 1) * itemsPerPage + i + 1}
                item={item}
                setData={setData}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* ================== PAGINATION ================== */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

/* ================== PAGINATION ================== */

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: any) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm">
      <p>
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {"<"}
        </button>

        {[1, 2].map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-2 rounded ${
              currentPage === num ? "bg-green-600 text-white" : ""
            }`}
          >
            {num}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

/* ================== ROW ================== */

function ShipmentRow({ item, setData, index }: any) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(item);

  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = () => {
    setData((prev: any) => prev.filter((d: any) => d.id !== item.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOpen(false);
  };

  const handleChange = (field: string, value: string) => {
    setEditedRow((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setData((prev: any) =>
      prev.map((d: any) => (d.id === item.id ? editedRow : d))
    );
    setIsEditing(false);
  };

  const getStyle = () => {
    switch (item.status) {
      case "Cancelled":
        return "bg-red-100 text-red-600";
      case "On Time":
        return "bg-blue-100 text-blue-600";
      case "In Transit":
        return "bg-purple-100 text-purple-600";
      case "Delivered":
        return "bg-green-100 text-green-600";
      default:
        return "";
    }
  };

  return (
    <tr className="border-b hover:bg-green-100 dark:hover:bg-gray-700">
      <td className="p-3">{index}</td>

      <td className="p-3">{item.id}</td>

      <td className="p-3">
        {isEditing ? (
          <input
            value={editedRow.customer}
            onChange={(e) => handleChange("customer", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          <>
            <p>{item.customer}</p>
            <p className="text-xs text-gray-500">{item.email}</p>
          </>
        )}
      </td>

      <td className="p-3">{item.pickup}</td>
      <td className="p-3">{item.drop}</td>

      <td className="p-3">
        <span className={`px-3 py-1 rounded-full text-xs ${getStyle()}`}>
          {item.status}
        </span>
      </td>

      <td className="p-3 relative">
        <button onClick={() => setOpen(!open)}>
          <FiMoreVertical />
        </button>

        {open && (
          <div
            ref={menuRef}
            className="absolute right-0 top-10 w-36 bg-white dark:bg-gray-800 
           border border-gray-200 dark:border-gray-700 
           rounded shadow z-50"
          >
            <button
              onClick={() => navigate(`/shipment/${item.id}`)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <FiEye /> View
            </button>

            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <FiEdit /> Edit
            </button>

            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-gray-100"
            >
              <FiTrash /> Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}