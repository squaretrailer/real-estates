import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBuilding,
  FaUsers,
  FaUserTie,
  FaClipboardList,
} from "react-icons/fa";

function Sidebar() {
  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },

    {
      name: "Properties",
      path: "/properties",
      icon: <FaBuilding />,
    },

    {
      name: "Agents",
      path: "/agents",
      icon: <FaUserTie />,
    },

    {
      name: "Clients",
      path: "/clients",
      icon: <FaUsers />,
    },

    {
      name: "Showings",
      path: "/showings",
      icon: <FaClipboardList />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-cyan-900 text-white p-5 hidden md:block">
      {/* LOGO */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-cyan-600">
          Re.Estate
        </h1>

        <p className="text-sm text-gray-300 mt-1">
          CRM Dashboard
        </p>
      </div>

      {/* NAVIGATION */}
      <div className="space-y-3">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            end={link.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-cyan-950 text-white shadow-md"
                  : "text-gray-200 hover:bg-cyan-800"
              }`
            }
          >
            <span className="text-lg">
              {link.icon}
            </span>

            <span className="font-medium">
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;