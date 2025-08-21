import { useEffect, useState } from "react";
import api from "@/utils/api";

interface StatsData {
  totalUsers: number;
  totalStores: number;
  totalRatings: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setStats(res.data);
      } catch (err) {
        setError("Failed to load stats");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return (
    <div className="text-center py-16">
      <div className="inline-flex items-center space-x-3 text-gray-600">
        <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xl font-medium">Loading dashboard stats...</span>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="text-red-600 text-xl font-medium">{error}</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">System Overview</h2>
        <p className="text-gray-600 text-lg">Key metrics and statistics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl border border-blue-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-600">Total Users</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800 mb-2">{stats?.totalUsers}</p>
            <p className="text-blue-600 text-sm font-medium">Registered Users</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-8 rounded-2xl border border-emerald-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-emerald-600">Total Stores</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800 mb-2">{stats?.totalStores}</p>
            <p className="text-emerald-600 text-sm font-medium">Active Stores</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-8 rounded-2xl border border-amber-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-amber-600">Total Ratings</p>
            </div>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-gray-800 mb-2">{stats?.totalRatings}</p>
            <p className="text-amber-600 text-sm font-medium">Customer Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
