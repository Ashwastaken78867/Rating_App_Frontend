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
  average_rating: number;
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
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Users List</h1>

      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div className="flex flex-wrap gap-4">
          <input
            name="name"
            value={filters.name}
            onChange={handleChange}
            placeholder="Filter by Name"
            className="border p-2 rounded"
          />
          <input
            name="email"
            value={filters.email}
            onChange={handleChange}
            placeholder="Filter by Email"
            className="border p-2 rounded"
          />
          <input
            name="address"
            value={filters.address}
            onChange={handleChange}
            placeholder="Filter by Address"
            className="border p-2 rounded"
          />
          <select
            name="role"
            value={filters.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">All Roles</option>
            <option value="user">Normal User</option>
            <option value="admin">Admin</option>
            <option value="owner">Store Owner</option>
          </select>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Rating (Store Owners)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {user.role === "owner"
                    ? user.average_rating?.toFixed(2)
                    : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
