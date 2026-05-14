import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Agents from "./pages/Agents";
import Clients from "./pages/Clients";
import Showings from "./pages/Showings";

import DashboardLayout from "./components/layout/DashboardLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          {/* DASHBOARD */}
          <Route path="/" element={<Dashboard />} />

          {/* PROPERTIES */}
          <Route
            path="/properties"
            element={<Properties />}
          />

          {/* AGENTS */}
          <Route
            path="/agents"
            element={<Agents />}
          />

          {/* CLIENTS */}
          <Route
            path="/clients"
            element={<Clients />}
          />

          {/* SHOWINGS */}
          <Route
            path="/showings"
            element={<Showings />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;