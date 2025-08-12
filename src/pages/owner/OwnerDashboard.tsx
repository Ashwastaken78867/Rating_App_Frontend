import { useState, useEffect } from "react";
import api from "@/utils/api";
import { Star } from "lucide-react";
import Header from "./Header";

type Rater = {
  user_id: number;
  user_name: string;
  user_email: string;
  rating_value: number;
};

type Store = {
  id: number;
  name: string;
  address: string;
  avg_rating: number;
  ratings: Rater[];
};

export default function OwnerDashboard() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/owner/dashboard");
      setStores(res.data.stores);
    } catch {
      alert("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 max-w-6xl mx-auto rounded-lg shadow-md">
      <Header username="Ash" />

      {loading ? (
        <p className="text-gray-600">Loading dashboard...</p>
      ) : stores.length === 0 ? (
        <p className="text-gray-600">You have no stores registered.</p>
      ) : (
        <>
          {stores.map((store) => (
            <section
              key={store.id}
              className="mb-10 bg-white p-6 rounded-lg shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-1">{store.name}</h2>
              <p className="text-gray-700 mb-2">{store.address}</p>
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold">Average Rating:</span>
                <span className="text-yellow-500 flex items-center gap-1">
                  {[...Array(Math.round(store.avg_rating))].map((_, i) => (
                    <Star key={i} size={20} fill="gold" stroke="gold" />
                  ))}
                  <span className="ml-2 text-gray-700 font-semibold">
                    {typeof store.avg_rating === "number" &&
                    !isNaN(store.avg_rating)
                      ? store.avg_rating.toFixed(2)
                      : "No rating"}
                  </span>
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                Users Who Rated This Store
              </h3>
              {store.ratings.length === 0 ? (
                <p className="text-gray-600">No ratings submitted yet.</p>
              ) : (
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-3 border border-gray-200">Name</th>
                      <th className="p-3 border border-gray-200">Email</th>
                      <th className="p-3 border border-gray-200">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.ratings.map((rater) => (
                      <tr
                        key={rater.user_id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="p-3 border border-gray-200 font-medium">
                          {rater.user_name}
                        </td>
                        <td className="p-3 border border-gray-200">
                          {rater.user_email}
                        </td>
                        <td className="p-3 border border-gray-200 text-yellow-500 flex items-center gap-1">
                          {[...Array(rater.rating_value)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              fill="gold"
                              stroke="gold"
                            />
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>
          ))}
        </>
      )}
    </div>
  );
}
