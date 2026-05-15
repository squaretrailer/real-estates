import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaTimes,
} from "react-icons/fa";

function Sidebar({ isOpen, onClose }) {
  const links = [
    { name: "Dashboard", path: "/", icon: <FaHome /> },
    { name: "Properties", path: "/properties", icon: <FaBuilding /> },
    { name: "Agents", path: "/agents", icon: <FaUserTie /> },
    { name: "Clients", path: "/clients", icon: <FaUsers /> },
    { name: "Showings", path: "/showings", icon: <FaClipboardList /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-cyan-900 text-white p-5
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-xl md:hidden hover:text-cyan-300"
        >
          <FaTimes />
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-cyan-400">Re.Estate</h1>
          <p className="text-sm text-gray-300 mt-1">CRM Dashboard</p>
        </div>

        <div className="space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-950 text-white shadow-md"
                    : "text-gray-200 hover:bg-cyan-800"
                }`
              }
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium">{link.name}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;