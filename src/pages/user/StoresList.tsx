import { useState, useEffect } from "react";
import api from "@/utils/api";
import { Star } from "lucide-react";

type Store = {
  id: number;
  name: string;
  address: string;
  user_rating?: number;
};

export default function StoresListNormal() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [submitting, setSubmitting] = useState<number | null>(null);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const params = { ...filters };
      Object.keys(params).forEach((key) => {
        if (!params[key as keyof typeof params]) delete params[key as keyof typeof params];
      });
      const res = await api.get("/stores", { params });
      setStores(res.data.stores);
    } catch {
      alert("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const submitRating = async (storeId: number, rating: number) => {
    setSubmitting(storeId);
    try {
      await api.post(`/stores/${storeId}/rate`, { rating });
      await fetchStores();
    } catch {
      alert("Failed to submit rating");
    } finally {
      setSubmitting(null);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStores();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen rounded-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-900">Browse Stores</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-wrap gap-4 bg-white p-5 rounded-lg shadow-md"
      >
        <input
          type="text"
          name="name"
          placeholder="Search by Name"
          value={filters.name}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg flex-1 min-w-[220px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <input
          type="text"
          name="address"
          placeholder="Search by Address"
          value={filters.address}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded-lg flex-1 min-w-[220px] focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition font-semibold"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 text-center">Loading stores...</p>
      ) : stores.length === 0 ? (
        <p className="text-gray-500 text-center">No stores found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-indigo-50 border-b border-indigo-200">
                <th className="p-4 text-indigo-700 font-semibold">Store Name</th>
                <th className="p-4 text-indigo-700 font-semibold">Address</th>
                <th className="p-4 text-indigo-700 font-semibold">Your Rating</th>
                <th className="p-4 text-indigo-700 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-900">{store.name}</td>
                  <td className="p-4 text-gray-700">{store.address}</td>
                  <td className="p-4">
                    {store.user_rating ? (
                      <div className="flex items-center gap-1 text-yellow-500" aria-label={`${store.user_rating} stars`}>
                        {[...Array(store.user_rating)].map((_, i) => (
                          <Star key={i} size={18} fill="gold" stroke="gold" />
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Not rated</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => submitRating(store.id, rating)}
                          disabled={submitting === store.id}
                          className={`p-2 rounded-md transition ${
                            store.user_rating === rating
                              ? "bg-yellow-100"
                              : "hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
                          }`}
                          aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}
                        >
                          <Star
                            size={22}
                            className={
                              rating <= (store.user_rating || 0)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-400"
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
