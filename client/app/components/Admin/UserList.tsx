import React, { useEffect, useState } from "react";
import { CookieHelper } from "../../utils/cookieHelper";
import type { User } from "../../types/userlist";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des utilisateurs");
        }

        const usersData = await response.json();
        setUsers(usersData);
      } catch (err: any) {
        setError(err.message || "Une erreur inconnue s’est produite");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <tbody>
      {users.map(user => (
        <tr key={user.id} className="text-center text-gray-600">
          <td className="p-2 border border-gray-300">{user.id}</td>
          <td className="p-2 border border-gray-300">{user.username}</td>
          <td className="p-2 border border-gray-300">{user.email}</td>
          <td className="p-2 border border-gray-300">
            {user.is_active ? "Actif" : "Inactif"}
          </td>
          <td className="p-2 border border-gray-300">{user.role}</td>
          <td className="p-2 border border-gray-300">
            {new Date(user.created_at).toLocaleDateString()}
          </td>
          <td className="p-2 border border-gray-300">
            {new Date(user.updated_at).toLocaleDateString()}
          </td>
          <td className="p-2 border border-gray-300">{user.reduction}%</td>
          <td className="p-2 border border-gray-300">
            <button className="px-2 py-1 bg-blue-500 text-white rounded mr-1">
              Éditer
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded">
              Supprimer
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
