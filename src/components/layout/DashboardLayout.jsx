import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-black">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-cyan-700 text-white rounded-md md:hidden hover:bg-cyan-600 transition"
      >
        <FaBars size={20} />
      </button>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div className="flex-1 flex flex-col">
        <main className="p-6 bg-cyan-950 flex-1 overflow-y-auto md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;