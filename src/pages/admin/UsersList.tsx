import { useEffect, useState } from "react";
import api from "@/utils/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type User = {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
};

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  // Fetch users with filters
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      // Remove empty filters
      Object.keys(params).forEach((key) => {
        if (!params[key as keyof typeof params]) delete params[key as keyof typeof params];
      });

      const res = await api.get("/admin/users", { params });
      setUsers(res.data.users);
    } catch {
      alert("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle filter change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Apply filters on form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Users Management</h2>
        <p className="text-gray-600 text-lg">Monitor and manage all registered users in the system</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-blue-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Filter by name..."
            className="h-12 border border-gray-200 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          />
          <input
            name="email"
            value={filters.email}
            onChange={handleChange}
            placeholder="Filter by email..."
            className="h-12 border border-gray-200 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          />
          <input
            name="address"
            value={filters.address}
            onChange={handleChange}
            placeholder="Filter by address..."
            className="h-12 border border-gray-200 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          />
          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="h-12 border border-gray-200 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          >
            <option value="">All Roles</option>
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
            <option value="owner">Store Owner</option>
          </select>
          <button
            type="submit"
            className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 font-semibold shadow-lg shadow-blue-500/25 transform hover:scale-105 active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center space-x-3 text-gray-600">
            <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xl font-medium">Loading users...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-200/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
                <TableHead className="p-6 text-blue-700 font-semibold text-lg">User Name</TableHead>
                <TableHead className="p-6 text-blue-700 font-semibold text-lg">Email</TableHead>
                <TableHead className="p-6 text-blue-700 font-semibold text-lg">Address</TableHead>
                <TableHead className="p-6 text-blue-700 font-semibold text-lg">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-b border-blue-100 hover:bg-blue-50/50 transition-all duration-200 last:border-b-0">
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span className="text-sm font-semibold text-blue-700">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 text-lg">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{user.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${
                        user.role === 'admin' ? 'bg-purple-500' : 
                        user.role === 'owner' ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}></div>
                      <span className={`font-medium px-3 py-1 rounded-full text-sm ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                        user.role === 'owner' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
