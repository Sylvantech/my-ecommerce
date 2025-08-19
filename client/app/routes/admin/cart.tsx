import { useState } from "react";
import CartAdmin from "~/components/Admin/CartAdmin";

export default function Cart() {
  const [search, setSearch] = useState("");
  const [ownerType, setOwnerType] = useState<"all" | "user" | "anonymous">(
    "all"
  );
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="sm:ml-80 min-h-screen bg-gray-50 p-6 text-black">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Gestion des Paniers
            </h1>
            <p className="text-gray-600 text-lg">
              Visualisez les paniers des utilisateurs (connectés et anonymes).
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
          <div className="w-full lg:max-w-md">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rechercher (ID, ObjectId, username, email, anonyme ID)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Rechercher un panier..."
              />
            </div>
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
            <div className="flex-1">
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Propriétaire
              </label>
              <select
                id="owner"
                value={ownerType}
                onChange={e =>
                  setOwnerType(e.target.value as "all" | "user" | "anonymous")
                }
                className="w-full lg:w-48 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous</option>
                <option value="user">Utilisateur</option>
                <option value="anonymous">Anonyme</option>
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="from"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mis à jour du
              </label>
              <input
                id="from"
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="w-full lg:w-44 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="to"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                au
              </label>
              <input
                id="to"
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="w-full lg:w-44 px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={() => setRefresh(r => r + 1)}
              className="inline-flex items-center px-5 py-3 bg-black text-white font-medium rounded-xl hover:bg-gray-900 transition-colors shadow-sm"
            >
              Rafraîchir
            </button>
            <button
              className="inline-flex items-center px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              onClick={() => {
                setSearch("");
                setOwnerType("all");
                setDateFrom("");
                setDateTo("");
                setRefresh(r => r + 1);
              }}
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <CartAdmin
          search={search}
          ownerType={ownerType}
          dateFrom={dateFrom}
          dateTo={dateTo}
          refresh={refresh}
        />
      </div>
    </div>
  );
}
