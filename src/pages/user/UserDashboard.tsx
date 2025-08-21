import Header from "./Header";
import StoresListNormal from "./StoresList";

export default function UserDashboard() {
  const username = "Ash"; // Later fetch from API / token

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header username={username} />
        <StoresListNormal />
      </div>
    </div>
  );
}
