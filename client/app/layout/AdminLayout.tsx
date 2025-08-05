import { Outlet } from "react-router";
import useAdminHook from "~/hooks/useAdminHook";
import Navbar from "../components/AdminNavbar"

export function meta() {
  return [
    { title: "E-commerce - Admin" },
    { name: "description", content: "Site d'e-commerce de chaussette" },
  ];
}

export default function AdminLayout() {
  const { isLoading, isAuthorized } = useAdminHook();

  if (isLoading) {
    return (
      <div>
        <p>Vérification des droits d&apos;accès...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return (
    <main className="min-h-screen font-nunito bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 relative overflow-hidden">
      <Navbar />;
      <Outlet />
    </main>
  );
}
