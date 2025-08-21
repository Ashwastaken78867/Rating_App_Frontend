import { useEffect, useState } from "react";
import api from "@/utils/api"; // your axios instance
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Store = {
  id: number;
  name: string;
  email: string;
  address: string;
  avg_rating: number | string | null;
};

export default function StoresList() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get("/admin/stores")
      .then((res) => setStores(res.data.stores))
      .catch(() => alert("Failed to fetch stores"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Stores Management</h2>
        <p className="text-gray-600 text-lg">Monitor and manage all registered stores in the system</p>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center space-x-3 text-gray-600">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xl font-medium">Loading stores...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-200/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-200">
                <TableHead className="p-6 text-emerald-700 font-semibold text-lg">Store Name</TableHead>
                <TableHead className="p-6 text-emerald-700 font-semibold text-lg">Owner Email</TableHead>
                <TableHead className="p-6 text-emerald-700 font-semibold text-lg">Address</TableHead>
                <TableHead className="p-6 text-emerald-700 font-semibold text-lg">Average Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stores.map((store) => (
                <TableRow key={store.id} className="border-b border-emerald-100 hover:bg-emerald-50/50 transition-all duration-200 last:border-b-0">
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <span className="font-semibold text-gray-900 text-lg">{store.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{store.email}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{store.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-6">
                    <div className="flex items-center space-x-2">
                      {store.avg_rating !== null && !isNaN(Number(store.avg_rating)) ? (
                        <>
                          <div className="flex items-center gap-1 text-yellow-500">
                            {[...Array(Math.round(Number(store.avg_rating)))].map((_, i) => (
                              <svg key={i} className="w-5 h-5" fill="gold" stroke="gold" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-lg font-semibold text-gray-800">
                            {Number(store.avg_rating).toFixed(2)}
                          </span>
                          <span className="text-gray-500 text-sm">/ 5.0</span>
                        </>
                      ) : (
                        <span className="text-gray-400 italic text-sm">No rating</span>
                      )}
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
