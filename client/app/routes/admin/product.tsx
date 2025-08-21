import { useState, useEffect } from "react";
import ProductAdmin from "~/components/Admin/ProductAdmin";
import { adminService } from "~/services/admin/adminService";
import { productServiceAdmin } from "~/services/admin/productServiceAdmin";

export default function Product() {
  const [search, setSearch] = useState("");
  const [categoryIdFilter, setCategoryIdFilter] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [isNewOnly, setIsNewOnly] = useState(false);
  const [isPromoOnly, setIsPromoOnly] = useState(false);
  const [categories, setCategories] = useState<Array<{ _id: string; id: number; name: string }>>([]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);

  const [pTitle, setPTitle] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pCategoryObjectId, setPCategoryObjectId] = useState("");
  const [pComposition, setPComposition] = useState("");
  const [pWeight, setPWeight] = useState("");
  const [pIsPromo, setPIsPromo] = useState(false);
  const [pIsNew, setPIsNew] = useState(false);
  const [pSrc, setPSrc] = useState("");

  const handleResetFilters = () => {
    setSearch("");
    setCategoryIdFilter("");
    setPriceMin("");
    setPriceMax("");
    setIsNewOnly(false);
    setIsPromoOnly(false);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await adminService.getCategories();
      if (mounted && res.success && res.data) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = (res.data as any[]).map(c => ({ _id: c._id, id: c.id, name: c.name }));
        setCategories(mapped);
        if (!pCategoryObjectId && mapped.length) {
          setPCategoryObjectId(mapped[0]._id);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [pCategoryObjectId]);

  const openCreate = () => {
    setCreateError(null);
    setIsCreateOpen(true);
  };
  const closeCreate = () => {
    setIsCreateOpen(false);
  };

  const submitCreate = async () => {
    setCreateError(null);
    if (!pTitle.trim()) {
      setCreateError("Le titre est requis");
      return;
    }
    if (!pPrice || Number.isNaN(Number(pPrice))) {
      setCreateError("Le prix est requis et doit être un nombre");
      return;
    }
    if (!pCategoryObjectId) {
      setCreateError("La catégorie est requise");
      return;
    }

    setCreateLoading(true);
    const payload = {
      title: pTitle.trim(),
      description: pDescription.trim() || undefined,
      price: Number(pPrice),
      category_id: pCategoryObjectId,
      composition: pComposition.trim() || undefined,
      weight_in_gr: pWeight ? Number(pWeight) : undefined,
      is_promo: pIsPromo || undefined,
      is_new: pIsNew || undefined,
      src: pSrc.trim() || undefined,
    } as const;

    const res = await productServiceAdmin.createProduct(payload);
    setCreateLoading(false);
    if (!res.success) {
      setCreateError(res.error || "Erreur lors de la création");
      return;
    }

    setPTitle("");
    setPDescription("");
    setPPrice("");
    setPComposition("");
    setPWeight("");
    setPIsPromo(false);
    setPIsNew(false);
    setPSrc("");

    setRefresh(r => r + 1);
    setIsCreateOpen(false);
  };

  return (
    <div className="sm:ml-80 min-h-screen bg-gray-50 p-6 text-black">
      {/* En-tête */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Gestion des Produits
            </h1>
            <p className="text-gray-600 text-lg">
              Gérez les fiches produits de votre catalogue.
            </p>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end justify-between">
          <div className="w-full lg:max-w-md">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Rechercher
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
                placeholder="Rechercher (ID, ObjectId, titre, description)"
              />
            </div>
          </div>

          <div className="flex flex-1 gap-4 w-full">
            <div className="flex-1 min-w-[160px]">
              <label
                htmlFor="filter-category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Catégorie
              </label>
              <select
                id="filter-category"
                value={categoryIdFilter}
                onChange={e => setCategoryIdFilter(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Toutes les catégories</option>
                {categories.map(categorie => (
                  <option key={categorie.id} value={String(categorie.id)}>
                    {categorie.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="price-min"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Prix min
              </label>
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
              <label
                htmlFor="price-max"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Prix max
              </label>
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
                <input
                  type="checkbox"
                  checked={isNewOnly}
                  onChange={e => setIsNewOnly(e.target.checked)}
                />
                Nouveautés
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={isPromoOnly}
                  onChange={e => setIsPromoOnly(e.target.checked)}
                />
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
              onClick={openCreate}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Ajouter un produit
            </button>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <ProductAdmin
          key={refresh}
          search={search}
          categoryId={categoryIdFilter}
          priceMin={priceMin}
          priceMax={priceMax}
          isNewOnly={isNewOnly}
          isPromoOnly={isPromoOnly}
          onDeleted={() => setRefresh(r => r + 1)}
        />
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un produit</h3>
              <button onClick={closeCreate} className="p-2 rounded-lg hover:bg-gray-100">✕</button>
            </div>

            <div className="p-5 space-y-4">
              {createError && (
                <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg">
                  {createError}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    value={pTitle}
                    onChange={e => setPTitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="Nom du produit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prix (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={pPrice}
                    onChange={e => setPPrice(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="19.99"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={pDescription}
                    onChange={e => setPDescription(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Description courte..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <select
                    value={pCategoryObjectId}
                    onChange={e => setPCategoryObjectId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Sélectionner...</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Composition</label>
                  <input
                    value={pComposition}
                    onChange={e => setPComposition(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="100% coton"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Poids (g)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={pWeight}
                    onChange={e => setPWeight(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image (URL)</label>
                  <input
                    value={pSrc}
                    onChange={e => setPSrc(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="https://.../image.jpg"
                  />
                </div>
                <div className="flex items-center gap-6 sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={pIsNew} onChange={e => setPIsNew(e.target.checked)} />
                    Nouveau
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={pIsPromo} onChange={e => setPIsPromo(e.target.checked)} />
                    En promo
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end gap-2">
              <button onClick={closeCreate} className="px-4 py-2 border rounded-lg">Annuler</button>
              <button
                onClick={submitCreate}
                disabled={createLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
              >
                {createLoading ? "En cours..." : "Créer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
