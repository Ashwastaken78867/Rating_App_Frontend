// src/pages/admin/AdminDashboard.tsx
import { useState } from "react";
import LogoutButton from "@/pages/admin/LogoutButton"
import DashboardStats from "./DashboardStats";
import AddUserForm from "./AddUserForm";
import StoresList from "./StoresList";
import UsersList from "./UsersList";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"stats" | "users" | "stores" | "addUser">("stats");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </header>

      <nav className="mb-6 space-x-4">
        {["stats", "users", "stores", "addUser"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 font-semibold rounded ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-100"
            }`}
          >
            {tab === "stats" && "Dashboard"}
            {tab === "users" && "Users"}
            {tab === "stores" && "Stores"}
            {tab === "addUser" && "Add New User"}
          </button>
        ))}
      </nav>

      <main>
        {activeTab === "stats" && <div><DashboardStats /></div>}
        {activeTab === "users" && <div><UsersList /></div>}
        {activeTab === "stores" && <div><StoresList /></div>}
        {activeTab === "addUser" && <div><AddUserForm /></div>}
      </main>
    </div>
  );
}
