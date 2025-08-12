import Header from "./Header";
import StoresListNormal from "./StoresList";

export default function UserDashboard() {
  const username = "Ash"; // Later fetch from API / token

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Header username={username} />
      <StoresListNormal />
    </div>
  );
}
