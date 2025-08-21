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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <Header username="Ash" />

        {loading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center space-x-3 text-gray-600">
              <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xl font-medium">Loading dashboard...</span>
            </div>
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">No Stores Found</h3>
            <p className="text-gray-600 text-lg">You haven't registered any stores yet.</p>
          </div>
        ) : (
          <>
            {stores.map((store) => (
              <section
                key={store.id}
                className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-emerald-200/50"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-800">{store.name}</h2>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 mb-4">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-lg">{store.address}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-lg font-semibold text-gray-700">Average Rating:</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(Math.round(store.avg_rating))].map((_, i) => (
                            <Star key={i} size={24} fill="gold" stroke="gold" />
                          ))}
                        </div>
                        <span className="text-xl font-bold text-gray-800 ml-2">
                          {typeof store.avg_rating === "number" &&
                          !isNaN(store.avg_rating)
                            ? store.avg_rating.toFixed(2)
                            : "No rating"}
                        </span>
                        <span className="text-gray-500 text-sm">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Customer Ratings</span>
                  </h3>
                  
                  {store.ratings.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 text-lg">No ratings submitted yet.</p>
                      <p className="text-gray-500 text-sm">Be the first to receive customer feedback!</p>
                    </div>
                  ) : (
                    <div className="overflow-hidden bg-white rounded-xl border border-emerald-200">
                      <table className="w-full text-left">
                        <thead className="bg-gradient-to-r from-emerald-100 to-green-100">
                          <tr>
                            <th className="p-4 text-emerald-700 font-semibold text-lg border-b border-emerald-200">Customer Name</th>
                            <th className="p-4 text-emerald-700 font-semibold text-lg border-b border-emerald-200">Email</th>
                            <th className="p-4 text-emerald-700 font-semibold text-lg border-b border-emerald-200">Rating</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.ratings.map((rater) => (
                            <tr
                              key={rater.user_id}
                              className="hover:bg-emerald-50/50 transition-all duration-200 border-b border-emerald-100 last:border-b-0"
                            >
                              <td className="p-4 font-medium text-gray-900">
                                <div className="flex items-center space-x-2">
                                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-emerald-700">
                                      {rater.user_name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <span>{rater.user_name}</span>
                                </div>
                              </td>
                              <td className="p-4 text-gray-700">
                                <div className="flex items-center space-x-2">
                                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span>{rater.user_email}</span>
                                </div>
                              </td>
                              <td className="p-4">
                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1 text-yellow-500">
                                    {[...Array(rater.rating_value)].map((_, i) => (
                                      <Star
                                        key={i}
                                        size={20}
                                        fill="gold"
                                        stroke="gold"
                                      />
                                    ))}
                                  </div>
                                  <span className="text-sm font-medium text-gray-600 ml-2">
                                    ({rater.rating_value}/5)
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </section>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
