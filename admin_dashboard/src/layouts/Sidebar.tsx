import {
  FiGrid,
  FiBarChart2,
  FiUsers,
  FiShoppingCart,
  FiBox,
  FiSettings,
  FiMenu,
} from "react-icons/fi";

export default function Sidebar({ collapsed ,setCollapsed}: any) {
  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white dark:bg-gray-800  h-full shadow`}
    >
          {/* 🔥 HEADER WITH HAMBURGER */}
      <div className="flex items-center justify-between p-4">
      {/* LOGO */}
      <div className="flex items-center gap-2 p-4 font-bold text-lg">
        <span className="text-red-500">D</span>
        {!collapsed && "DASH"}
      </div>
       {/* 🔥 HAMBURGER BUTTON */}
        <button onClick={() => setCollapsed(!collapsed)}
           className="p-2 rounded-lg bg-white dark:bg-gray-800 
             border border-gray-200 dark:border-gray-700
             shadow-sm hover:shadow-md 
             transition"
          >
          <FiMenu size={18} className="text-gray-700 dark:text-gray-300"/>
        </button>
      </div>

      {/* DASHBOARDS */}
      {!collapsed && (
        <p className="px-4 text-gray-400 text-xs mb-2">DASHBOARDS</p>
      )}

      <MenuItem icon={<FiGrid />} label="Dashboard" collapsed={collapsed} />
      <MenuItem icon={<FiBarChart2 />} label="Website Analytics" collapsed={collapsed} />

      {/* PAGES */}
      {!collapsed && (
        <p className="px-4 text-gray-400 text-xs mt-4 mb-2">PAGES</p>
      )}

      <MenuItem icon={<FiUsers />} label="Users" collapsed={collapsed} />
      <MenuItem icon={<FiShoppingCart />} label="Orders" collapsed={collapsed} />
      <MenuItem icon={<FiBox />} label="Products" collapsed={collapsed} />
      <MenuItem icon={<FiSettings />} label="Settings" collapsed={collapsed} />
    </div>
  );
}

function MenuItem({ icon, label, collapsed }: any) {
  return (
    <div className="flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
      <div className="text-xl">{icon}</div>

      {/* 🔥 Hide text when collapsed */}
      {!collapsed && <span>{label}</span>}
    </div>
  );
}