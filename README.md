# Real Estate CRM Dashboard

A full‑featured CRM dashboard for real estate agencies to manage properties, agents, clients, and showings. Built with React, Tailwind CSS, and a mock JSON Server backend.

![Dashboard Preview](https://placehold.co/800x400?text=CRM+Dashboard+Preview)

## Features

- **Dashboard Overview** – Key metrics (properties, clients, agents, revenue) with charts.
- **Property Management** – Add, edit, delete, search, and filter properties. Status badges (Available/Sold/Pending).
- **Agent & Client Management** – CRUD operations with modal forms.
- **Showings Management** – Schedule showings, link properties/clients/agents, update status, and mark properties as sold.
- **Responsive Design** – Works on desktop, tablet, and mobile. Collapsible sidebar with hamburger menu.
- **Real‑time Data** – All changes persist to a local JSON server.

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Icons**: React Icons (Fa, Fi)
- **Backend (mock)**: JSON Server

## Prerequisites

- Node.js (v18 or later)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd real-estate-crm
   
2. **Install Frontend dependencies**
  ```bash
     npm install
     npm istall -g json-server
     npm install axios
     npm install react-router-dom recharts react-icons

## Project Structure
src/
├── components/
│   ├── dashboard/
│   │   ├── StatCard.jsx
│   │   ├── RevenueChart.jsx
│   │   └── PropertyPerformance.jsx
│   └── layout/
│       ├── DashboardLayout.jsx   (handles responsive sidebar toggle)
│       ├── Sidebar.jsx           (mobile/desktop sidebar with overlay)
│       └── Navbar.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Properties.jsx
│   ├── Agents.jsx
│   ├── Clients.jsx
│   └── Showings.jsx
├── App.jsx
└── main.jsx

## Conclusion
We created a real estate page that enables companies to sell housing estates and help clients easily find what they desired dream homes.