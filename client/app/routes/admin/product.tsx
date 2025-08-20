import { useState } from "react";

export default function Product() {
  const [search, setSearch] = useState("");
  const [categoryIdFilter, setCategoryIdFilter] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [isPromoOnly, setIsPromoOnly] = useState(false);

  const handleResetFilters = () => {
    setSearch("");
    setCategoryIdFilter("");
    setPriceMin("");
    setPriceMax("");
    setIsNewOnly(false);
    setIsPromoOnly(false);
  };


  return (
    <div className="sm:ml-80 min-h-screen bg-gray-50 p-6 text-black">

      {/* En-tête */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des Produits</h1>
            <p className="text-gray-600 text-lg">Gérez les fiches produits de votre catalogue.</p>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
          <div className="w-full lg:max-w-md">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="search"
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Rechercher (ID, ObjectId, titre, description)"
              />
            </div>
          </div>

          <div className="flex flex-1 gap-4 w-full">
            <div className="flex-1 min-w-[160px]">
              <label htmlFor="filter-category" className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
              <select
                id="filter-category"
                value={categoryIdFilter}
                onChange={e => setCategoryIdFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes (à connecter)</option>
                {/* Options à remplir via service plus tard */}
              </select>
            </div>

            <div className="flex-1">
              <label htmlFor="price-min" className="block text-sm font-medium text-gray-700 mb-2">Prix min</label>
              <input
                id="price-min"
                type="number"
                min="0"
                step="0.01"
                value={priceMin}
                onChange={e => setPriceMin(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex-1">
              <label htmlFor="price-max" className="block text-sm font-medium text-gray-700 mb-2">Prix max</label>
              <input
                id="price-max"
                type="number"
                min="0"
                step="0.01"
                value={priceMax}
                onChange={e => setPriceMax(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center gap-4 pt-7">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={isNewOnly} onChange={e => setIsNewOnly(e.target.checked)} />
                Nouveautés
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={isPromoOnly} onChange={e => setIsPromoOnly(e.target.checked)} />
                Promotions
              </label>
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            <button
              className="inline-flex items-center px-5 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              onClick={handleResetFilters}
            >
              Réinitialiser
            </button>
            <button
              className="inline-flex items-center px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter un produit
            </button>
          </div>
        </div>
      </div>

      {/* Liste (placeholder) */}
      <div className="bg-white rounded-2xl shadow-sm border border-dashed border-gray-300 min-h-96 flex items-center justify-center text-gray-500">
        Ici s&apos;affichera la liste des produits.
      </div>
    </div>
  );
}