// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'

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
          <Route path="/" element={<Dashboard />} />

          <Route
            path="/properties"
            element={<Properties />}
          />

          <Route
            path="/agents"
            element={<Agents />}
          />

          <Route
            path="/clients"
            element={<Clients />}
          />

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
