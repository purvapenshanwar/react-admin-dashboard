import { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiEye, FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
export default function ShipmentRow({ item, setData }: any) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(item);

  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ DELETE
  const handleDelete = () => {
    setData((prev: any) => prev.filter((d: any) => d.id !== item.id));
  };

  // ✅ START EDIT
  const handleEdit = () => {
    setIsEditing(true);
    setOpen(false);
  };

  // ✅ HANDLE CHANGE
  const handleChange = (field: string, value: string) => {
    setEditedRow((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ SAVE
  const handleSave = () => {
    setData((prev: any) =>
      prev.map((d: any) => (d.id === item.id ? editedRow : d)),
    );
    setIsEditing(false);
  };

  // ✅ CANCEL
  const handleCancel = () => {
    setEditedRow(item);
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
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">
        <input type="checkbox" />
      </td>

      <td className="p-3">{item.id}</td>

      {/* ✅ CUSTOMER */}
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

      {/* ✅ PICKUP */}
      <td className="p-3">
        {isEditing ? (
          <input
            value={editedRow.pickup}
            onChange={(e) => handleChange("pickup", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          item.pickup
        )}
      </td>

      {/* ✅ DROP */}
      <td className="p-3">
        {isEditing ? (
          <input
            value={editedRow.drop}
            onChange={(e) => handleChange("drop", e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        ) : (
          item.drop
        )}
      </td>

      {/* ✅ STATUS */}
      <td className="p-3">
        {isEditing ? (
          <select
            value={editedRow.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option>On Time</option>
            <option>In Transit</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        ) : (
          <span className={`px-3 py-1 rounded-full text-xs ${getStyle()}`}>
            {item.status}
          </span>
        )}
      </td>

      {/* ✅ ACTION */}
      <td className="p-3 relative">
        {isEditing ? (
          <div className="flex gap-2">
            <button onClick={handleSave} className="text-green-600 text-sm">
              Save
            </button>

            <button onClick={handleCancel} className="text-gray-500 text-sm">
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setOpen(!open)}>
              <FiMoreVertical />
            </button>

            {open && (
              <div
                ref={menuRef}
                className="absolute right-0 top-10 w-36 bg-white border rounded shadow z-50"
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
          </>
        )}
      </td>
    </tr>
  );
}
