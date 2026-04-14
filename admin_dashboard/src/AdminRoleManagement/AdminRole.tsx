import { useState } from "react";

import { FaUserPlus }       from "react-icons/fa";   // Admin stat icon
import { FaUserXmark }      from "react-icons/fa6";  // Suspended stat icon
import { FaUserMinus }      from "react-icons/fa";   // Canceled stat icon
import { FaPencil }         from "react-icons/fa6";  // Edit icon on card
import { FaTrash }          from "react-icons/fa";   // Delete icon on card
import { FaEye }            from "react-icons/fa";   // View icon on card
import { FaXmark }          from "react-icons/fa6";  // Close modal icon
import { FaFloppyDisk }     from "react-icons/fa6";  // Save icon
import { FaPhone }          from "react-icons/fa";   // Phone label icon
import { FaEnvelope }       from "react-icons/fa";   // Email label icon
import { FaShieldHalved }   from "react-icons/fa6";  // Role label icon
import { FaChevronLeft }    from "react-icons/fa";   // Pagination left
import { FaChevronRight }   from "react-icons/fa";   // Pagination right


// Status can only be one of these 3 values
type AdminStatus = "Active" | "Inactive" | "Suspended";
type Admin = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: AdminStatus;
  avatar: string;
};

// Shape of the modal form fields
type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  phone2: string;
};

const initialAdmins: Admin[] = [
  { id: 1,  firstName: "Vernon",  lastName: "Richards", email: "vernonrichards@gmail.com", phone: "+1 (555) 4737465", role: "Fleet Manager",   status: "Active",    avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 2,  firstName: "Mollie",  lastName: "Henry",    email: "molliehenry@gmail.com",    phone: "+1 (555) 4737465", role: "Admin",           status: "Inactive",  avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 3,  firstName: "Mollie",  lastName: "Henry",    email: "molliehenry@gmail.com",    phone: "+1 (555) 4737465", role: "Admin",           status: "Active",    avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 4,  firstName: "Vernon",  lastName: "Richards", email: "vernonrichards@gmail.com", phone: "+1 (555) 4737465", role: "Operations Lead", status: "Active",    avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 5,  firstName: "Vernon",  lastName: "Richards", email: "vernonrichards@gmail.com", phone: "+1 (555) 4737465", role: "Fleet Manager",   status: "Active",    avatar: "https://i.pravatar.cc/150?img=12" },
  { id: 6,  firstName: "Mollie",  lastName: "Henry",    email: "molliehenry@gmail.com",    phone: "+1 (555) 4737465", role: "Dispatcher",      status: "Active",    avatar: "https://i.pravatar.cc/150?img=47" },
  { id: 7,  firstName: "Rena",    lastName: "Wanner",   email: "renawanner@gmail.com",     phone: "+1 (555) 4737465", role: "Admin",           status: "Active",    avatar: "https://i.pravatar.cc/150?img=32" },
  { id: 8,  firstName: "Emily",   lastName: "Schmidt",  email: "emilyschmidt@gmail.com",   phone: "+1 (555) 4737465", role: "Fleet Manager",   status: "Active",    avatar: "https://i.pravatar.cc/150?img=44" },
  { id: 9,  firstName: "James",   lastName: "Carter",   email: "jamescarter@gmail.com",    phone: "+1 (555) 4737465", role: "Admin",           status: "Suspended", avatar: "https://i.pravatar.cc/150?img=15" },
  { id: 10, firstName: "Sara",    lastName: "Lane",     email: "saralane@gmail.com",       phone: "+1 (555) 4737465", role: "Dispatcher",      status: "Active",    avatar: "https://i.pravatar.cc/150?img=56" },
  { id: 11, firstName: "Tom",     lastName: "Bridges",  email: "tombridges@gmail.com",     phone: "+1 (555) 4737465", role: "Operations Lead", status: "Active",    avatar: "https://i.pravatar.cc/150?img=18" },
  { id: 12, firstName: "Nina",    lastName: "Patel",    email: "ninapatel@gmail.com",      phone: "+1 (555) 4737465", role: "Admin",           status: "Active",    avatar: "https://i.pravatar.cc/150?img=38" },
];

// How many cards to show per page
const ITEMS_PER_PAGE = 8;

export default function AdminRolesPage() {

 
  const [admins, setAdmins]               = useState<Admin[]>(initialAdmins);
  const [activeTab, setActiveTab]         = useState<"add" | "details">("add");
  const [currentPage, setCurrentPage]     = useState(1);
  const [showModal, setShowModal]         = useState(false);
  const [isEditing, setIsEditing]         = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [formData, setFormData]           = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", role: "", phone2: "",
  });


  // Total number of pages (e.g. 12 admins / 8 per page = 2 pages)
  const totalPages     = Math.ceil(admins.length / ITEMS_PER_PAGE);

  // Counts for the 3 stat cards
  const activeCount    = admins.filter((a) => a.status === "Active").length;
  const suspendedCount = admins.filter((a) => a.status === "Suspended").length;
  const canceledCount  = admins.filter((a) => a.status === "Inactive").length;

  // Only admins for the current page
  // slice(start, end) cuts out a portion of the array
  const paginatedAdmins = admins.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ── HANDLERS ───────────────────────────────────────────────

  // Open modal to VIEW or EDIT an existing admin
  // startEditing=true means pencil icon was clicked (edit mode)
  // startEditing=false means eye icon was clicked (read-only mode)
  function handleView(admin: Admin, startEditing = false) {
    setSelectedAdmin(admin);
    setIsEditing(startEditing);
    setFormData({
      firstName: admin.firstName,
      lastName:  admin.lastName,
      email:     admin.email,
      phone:     admin.phone,
      role:      admin.role,
      phone2:    admin.phone,
    });
    setShowModal(true);
  }

  // Open modal with a blank form to ADD a new admin
  function handleAddClick() {
    setSelectedAdmin(null);   // no existing admin
    setIsEditing(true);       // immediately editable
    setFormData({ firstName: "", lastName: "", email: "", phone: "", role: "", phone2: "" });
    setShowModal(true);
  }

  // Close the modal and reset all modal-related state
  function handleCloseModal() {
    setShowModal(false);
    setIsEditing(false);
    setSelectedAdmin(null);
  }

  // Save button — either update existing or add new admin
  function handleSave() {
    if (selectedAdmin) {
      // UPDATE: loop through list, replace the matching admin's fields
      setAdmins((prev) =>
        prev.map((a) =>
          a.id === selectedAdmin.id
            ? {
                ...a,  // keep id, avatar, status unchanged
                firstName: formData.firstName,
                lastName:  formData.lastName,
                email:     formData.email,
                phone:     formData.phone,
                role:      formData.role,
              }
            : a
        )
      );
    } else {
      // ADD: create a new admin object and append to the list
      const newAdmin: Admin = {
        id:        Date.now(),        // unique id using current timestamp
        firstName: formData.firstName,
        lastName:  formData.lastName,
        email:     formData.email,
        phone:     formData.phone,
        role:      formData.role,
        status:    "Active",          // new admins start as Active
        avatar:    `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      };
      setAdmins((prev) => [...prev, newAdmin]); // spread old list + add new
    }
    handleCloseModal();
  }

  // Delete admin matching this id by filtering them out of the list
  function handleDelete(id: number) {
    const updated = admins.filter((a) => a.id !== id);
    setAdmins(updated);
    // If current page is now empty after deletion, go back one page
    const newMax = Math.ceil(updated.length / ITEMS_PER_PAGE) || 1;
    if (currentPage > newMax) setCurrentPage(newMax);
  }

  // Called on every keystroke inside a form input
  // field = "firstName" | "lastName" | etc, value = what user typed
  function handleFormChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }


  function statusBadgeClass(status: AdminStatus): string {
    if (status === "Active")    return "bg-green-600  text-white  dark:bg-green-900/40  dark:text-white";
    if (status === "Inactive")  return "bg-red-500    text-white    dark:bg-red-900/40    dark:text-white";
    if (status === "Suspended") return "bg-yellow-600 text-white dark:bg-yellow-900/40 dark:text-white";
    return "";
  }

  
  const inputCls =
    "w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm " +
    "bg-white dark:bg-gray-700 text-gray-800 dark:text-white " +
    "disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-400 dark:disabled:text-gray-500 " +
    "focus:outline-none focus:ring-2 focus:ring-green-400 transition-all";

  
  return (
    // Outer page wrapper — uses the theme's background color
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-6">

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Admin &amp; Roles Management
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage user access and role permissions across all tenants
        </p>
      </div>

      {/* ── STAT CARDS ──────────────────────────────────────── */}
     
      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        {/* Admin count card */}
        <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-600 uppercase tracking-wide">Admin</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{activeCount}</p>
          </div>
          <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full">
            <FaUserPlus className="text-green-600 dark:text-green-400 text-lg" />
          </div>
        </div>

        {/* Suspended count card */}
        <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-600 uppercase tracking-wide">Suspended</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{suspendedCount}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full">
            <FaUserXmark className="text-red-500 dark:text-red-400 text-lg" />
          </div>
        </div>

        {/* Canceled count card */}
        <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-green-600 dark:text-green-600 uppercase tracking-wide">Canceled</p>
            <p className="text-3xl font-bold text-gray-800 dark:text-white mt-1">{canceledCount}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            <FaUserMinus className="text-gray-500 dark:text-gray-400 text-lg" />
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT CARD ────────────────────────────────── */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 md:p-6">

        {/* Tabs — "Add Admin" and "Admin details" */}
        <div className="flex gap-6 border-b border-gray-300 dark:border-gray-700 mb-6">
          {(["add", "details"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              }`}
            >
              {tab === "add" ? "Add Admin" : "Admin details"}
            </button>
          ))}
        </div>

        {/* ── Admin Card Grid ───────────────────────────────── */}
       
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-20">

          {/* "Add New" placeholder — always the first card */}
          <div
            onClick={handleAddClick}
            className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-xl p-4
                       flex flex-col items-center justify-center gap-3 min-h-[210px]
                       cursor-pointer hover:border-gray-600 dark:hover:border-white transition-colors"
          >
            {/* Placeholder avatar circle */}
            <div className="w-16 h-16 rounded-full border-2 border-gray-300 dark:border-gray-500
                            flex items-center justify-center bg-gray-50 dark:bg-gray-700">
              <FaUserPlus className="text-gray-400 text-xl" />
            </div>
            <div className="text-center">
              <p className="font-medium text-sm text-gray-700 dark:text-gray-200">Addie Barton</p>
              <p className="text-xs text-gray-400 mt-0.5">addiebarton@gmail.com</p>
            </div>
            {/* Blue Add button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleAddClick(); }}
              className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-7 py-1.5 rounded-full font-medium transition-colors"
            >
              Add
            </button>
          </div>

          {/* Existing admin cards — one for each admin on this page */}
          {paginatedAdmins.map((admin) => (
            <div
              key={admin.id}
              className="bg-white dark:bg-gray-700 border border-gray-600 dark:border-gray-600
                         rounded-xl p-6 flex flex-col items-center gap-2 relative min-h-[210px]"
            >
              {/* Edit + Delete icons — top right of card */}
              <div className="absolute top-3 left-0 w-full px-4 flex justify-between">
                {/* Pencil = opens modal in edit mode */}
                <button
                  onClick={() => handleView(admin, true)}
                  className="text-green-700 hover:text-green-600 transition-colors"
                  title="Edit"
                >
                  <FaPencil size={14} />
                </button>
                {/* Trash = deletes this admin */}
                <button
                  onClick={() => handleDelete(admin.id)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                  title="Delete"
                >
                  <FaTrash size={14} />
                </button>
              </div>

              {/* Profile picture */}
              <img
                src={admin.avatar}
                alt={`${admin.firstName} ${admin.lastName}`}
                className="w-16 h-16 rounded-full object-cover mt-2 border-2 border-gray-100 dark:border-gray-600"
              />

              {/* Full name */}
              <p className="font-semibold text-sm text-gray-800 dark:text-white text-center">
                {admin.firstName} {admin.lastName}
              </p>

              {/* Email — truncate long addresses */}
              <p className="text-xs text-gray-500 truncate w-full text-center max-w-[150px]">
                {admin.email}
              </p>

              {/* Colored status badge */}
              <span className={`text-xs px-4 py-0.5 rounded-md font-medium ${statusBadgeClass(admin.status)}`}>
                {admin.status}
              </span>

              {/* View button — opens modal in read-only mode */}
              <button
                onClick={() => handleView(admin, false)}
                className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300
                           hover:text-gray-800 dark:hover:text-white transition-colors mt-auto"
              >
                <FaEye size={13} /> View
              </button>
            </div>
          ))}
        </div>

        {/* ── Pagination ──────────────────────────────────────── */}
        {/* Only shown when there is more than 1 page */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">

            {/* Left arrow — disabled on first page */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
                         hover:bg-gray-100 dark:hover:bg-gray-700
                         disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronLeft className="text-gray-600 dark:text-gray-300 text-sm" />
            </button>

            {/* Page number buttons */}
            {/* Array.from({length: n}) makes [1, 2, 3 ... n] */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  pg === currentPage
                    ? "bg-green-500 text-white"
                    : "border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {pg}
              </button>
            ))}

            {/* Right arrow — disabled on last page */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-600
                         hover:bg-gray-100 dark:hover:bg-gray-700
                         disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <FaChevronRight className="text-gray-600 dark:text-gray-300 text-sm" />
            </button>
          </div>
        )}
      </div>

      {/* ── MODAL POPUP ─────────────────────────────────────────── */}
      {/* Only renders when showModal === true */}
      {showModal && (
        // Dark backdrop — clicking it closes the modal
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleCloseModal}
        >
          {/* White modal box — stopPropagation stops backdrop click from firing */}
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl
                       relative overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Green X button — top left corner */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 bg-gray-500 hover:bg-gray-700
                         text-white rounded-full p-1.5 transition-colors"
            >
              <FaXmark size={13} />
            </button>

            <div className="p-8 pt-14">

              {/* Avatar + name + email at top of modal */}
              <div className="flex flex-col items-center mb-6">
                <img
                  src={selectedAdmin?.avatar ?? "https://i.pravatar.cc/150?img=1"}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                />
                <p className="font-semibold text-gray-800 dark:text-white mt-3 text-base">
                  {/* Show name if editing existing, "New Admin" if adding */}
                  {selectedAdmin
                    ? `${selectedAdmin.firstName} ${selectedAdmin.lastName}`
                    : "New Admin"}
                </p>
                <p className="text-sm text-gray-400 mt-0.5">
                  {selectedAdmin?.email ?? "Fill in the details below"}
                </p>
              </div>

              {/* 2-column form grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* First Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    disabled={!isEditing}
                    placeholder="John"
                    onChange={(e) => handleFormChange("firstName", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    disabled={!isEditing}
                    placeholder="Doe"
                    onChange={(e) => handleFormChange("lastName", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    <FaEnvelope size={11} /> Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled={!isEditing}
                    placeholder="john@example.com"
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    <FaPhone size={11} /> Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000 0000"
                    onChange={(e) => handleFormChange("phone", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    <FaShieldHalved size={11} /> Role
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    disabled={!isEditing}
                    placeholder="Fleet Manager"
                    onChange={(e) => handleFormChange("role", e.target.value)}
                    className={inputCls}
                  />
                </div>

                {/* Phone 2
                <div>
                  <label className="flex items-center gap-1 text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                    <FaPhone size={11} /> Phone 2
                  </label>
                  <input
                    type="tel"
                    value={formData.phone2}
                    disabled={!isEditing}
                    placeholder="+1 (555) 000 0000"
                    onChange={(e) => handleFormChange("phone2", e.target.value)}
                    className={inputCls}
                  />
                </div> */}
              </div>

              {/* Action buttons at bottom of modal */}
              <div className="flex items-center justify-end mt-6">
  {isEditing && (
    <button
      onClick={handleSave}
      className="flex items-center gap-2 bg-green-500 hover:bg-green-600
                 text-white text-sm px-5 py-2 rounded-lg font-medium transition-colors"
    >
      <FaFloppyDisk size={13} /> Save
    </button>
  )}
</div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}