import React, { useEffect, useState } from "react";
import type { User } from "../../types/userlist";
import { adminService } from "../../services/admin/adminService";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //state pour modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await adminService.getUsers();
        if (result.success && result.data) {
          setUsers(result.data);
        } else {
          setError(
            result.error || "Erreur lors de la récupération des utilisateurs"
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue s'est produite");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await adminService.deleteUser(id);
    if (result.success) {
      setUsers(prev => prev.filter(u => u.id !== id));
    } else {
      alert(result.error);
    }
  };

  const openCreateModal = () => {
    setEditingUser(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setRole("user");
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setPassword("");
    setRole(user.role);
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    if (editingUser) {
      const result = await adminService.updateUser({
        ...editingUser,
        username,
        email,
        role,
      });
      if (result.success && result.data?.user) {
        setUsers(prev =>
          prev.map(u => (u.id === editingUser.id ? result.data.user : u))
        );
        setIsModalOpen(false);
      } else {
        alert(result.error || "Erreur lors de la mise à jour");
      }
    } else {
      const result = await adminService.createUser(
        username,
        email,
        password,
        role
      );
      if (result.success && result.data?.user) {
        setUsers(prev => [...prev, result.data.user]);
        setIsModalOpen(false);
      } else {
        alert(result.error || "Erreur lors de la création");
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-600">Erreur : {error}</p>;

  return (
    <div>
      <button
        onClick={openCreateModal}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Créer un utilisateur
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="text-center bg-gray-100">
            <th className="p-2 border border-gray-300">ID</th>
            <th className="p-2 border border-gray-300">Nom</th>
            <th className="p-2 border border-gray-300">Email</th>
            <th className="p-2 border border-gray-300">Actif</th>
            <th className="p-2 border border-gray-300">Role</th>
            <th className="p-2 border border-gray-300">Créé le</th>
            <th className="p-2 border border-gray-300">Mis à jour le</th>
            <th className="p-2 border border-gray-300">Réduction</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
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
                <button
                  className="px-2 py-1 bg-blue-500 text-white rounded mr-1"
                  onClick={() => openEditModal(user)}
                >
                  Éditer
                </button>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <h2 className="text-xl text-black font-bold mb-4">
              {editingUser ? "Modifier l'utilisateur" : "Créer un utilisateur"}
            </h2>
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="w-full mb-2 p-2 border rounded"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full mb-2 p-2 border rounded"
              placeholder="Mot de passe"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <select
              className="w-full mb-4 p-2 border rounded"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSubmit}
              >
                {editingUser ? "Modifier" : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
