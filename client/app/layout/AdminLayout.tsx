import { Outlet } from "react-router";
import useAdminHook from "~/hooks/useAdminHook";

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
    <main>
      <Outlet />
    </main>
  );
}
