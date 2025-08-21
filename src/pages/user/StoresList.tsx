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
    <div className="p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen rounded-2xl max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-indigo-700 bg-clip-text text-transparent">
          Browse Stores
        </h1>
        <p className="text-gray-600 text-lg">Discover and rate your favorite stores</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-8 flex flex-wrap gap-4 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200/50"
      >
        <div className="flex-1 min-w-[280px]">
          <input
            type="text"
            name="name"
            placeholder="Search by store name..."
            value={filters.name}
            onChange={handleChange}
            className="w-full h-12 border border-gray-200 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          />
        </div>
        <div className="flex-1 min-w-[280px]">
          <input
            type="text"
            name="address"
            placeholder="Search by address..."
            value={filters.address}
            onChange={handleChange}
            className="w-full h-12 border border-gray-200 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-gray-50"
          />
        </div>
        <button
          type="submit"
          className="h-12 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 rounded-xl hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200 font-semibold shadow-lg shadow-indigo-500/25 transform hover:scale-105 active:scale-95"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-lg">Loading stores...</span>
          </div>
        </div>
      ) : stores.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No stores found.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl border border-gray-200/50">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-200">
                <th className="p-6 text-indigo-700 font-semibold text-lg">Store Name</th>
                <th className="p-6 text-indigo-700 font-semibold text-lg">Address</th>
                <th className="p-6 text-indigo-700 font-semibold text-lg">Your Rating</th>
                <th className="p-6 text-indigo-700 font-semibold text-lg">Rate Store</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-all duration-200">
                  <td className="p-6">
                    <div className="font-semibold text-gray-900 text-lg">{store.name}</div>
                  </td>
                  <td className="p-6">
                    <div className="text-gray-700 flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{store.address}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    {store.user_rating ? (
                      <div className="flex items-center gap-1 text-yellow-500" aria-label={`${store.user_rating} stars`}>
                        {[...Array(store.user_rating)].map((_, i) => (
                          <Star key={i} size={20} fill="gold" stroke="gold" />
                        ))}
                        <span className="ml-2 text-sm text-gray-600 font-medium">({store.user_rating}/5)</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic text-sm">Not rated yet</span>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => submitRating(store.id, rating)}
                          disabled={submitting === store.id}
                          className={`p-2.5 rounded-lg transition-all duration-200 ${
                            store.user_rating === rating
                              ? "bg-yellow-100 ring-2 ring-yellow-300"
                              : "hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          }`}
                          aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}
                        >
                          <Star
                            size={24}
                            className={
                              rating <= (store.user_rating || 0)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-400 hover:text-yellow-400"
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
