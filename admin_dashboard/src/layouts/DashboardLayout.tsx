import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark: bg-gray-900">
      
      {/* LEFT SIDE - SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        
        {/* TOP - NAVBAR */}
        <Navbar
        //   collapsed={collapsed}
          
        />

        {/* 🔥 IMPORTANT: PAGE CONTENT COMES HERE */}
        <div className="p- overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}