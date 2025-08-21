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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-purple-200/50">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-purple-700 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-lg mt-1">Manage users, stores, and system overview</p>
            </div>
          </div>
          <LogoutButton />
        </header>

        <nav className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-200/50">
          <div className="flex flex-wrap gap-3">
            {["stats", "users", "stores", "addUser"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white border border-purple-200 text-gray-700 hover:bg-purple-50 hover:border-purple-300"
                }`}
              >
                {tab === "stats" && "📊 Dashboard"}
                {tab === "users" && "👥 Users"}
                {tab === "stores" && "🏪 Stores"}
                {tab === "addUser" && "➕ Add User"}
              </button>
            ))}
          </div>
        </nav>

        <main className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-purple-200/50">
          {activeTab === "stats" && <div><DashboardStats /></div>}
          {activeTab === "users" && <div><UsersList /></div>}
          {activeTab === "stores" && <div><StoresList /></div>}
          {activeTab === "addUser" && <div><AddUserForm /></div>}
        </main>
      </div>
    </div>
  );
}
