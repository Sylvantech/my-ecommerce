import { useMemo } from "react";
import useProductListHook from "~/hooks/useProductListHook";
import type { Product } from "~/types/product";

interface ProductAdminProps {
  search?: string;
  categoryId?: string;
  priceMin?: string;
  priceMax?: string;
  isNewOnly?: boolean;
  isPromoOnly?: boolean;
}

export default function ProductAdmin({
  search = "",
  categoryId = "",
  priceMin = "",
  priceMax = "",
  isNewOnly = false,
  isPromoOnly = false,
}: ProductAdminProps) {
  const { products, loading, error } = useProductListHook();

  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    const min = priceMin ? Number(priceMin) : undefined;
    const max = priceMax ? Number(priceMax) : undefined;

    return (products || []).filter((p: Product) => {
      const matchesQuery =
        !q ||
        String(p.id).includes(q) ||
        (p._id || "").toLowerCase().includes(q) ||
        (p.title || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q);

      const matchesCategory = !categoryId || String(p.category?.id || "") === categoryId;

      const priceOkMin = min === undefined || (typeof p.price === "number" && p.price >= min);
      const priceOkMax = max === undefined || (typeof p.price === "number" && p.price <= max);

      const newOk = !isNewOnly || !!p.is_new;
      const promoOk = !isPromoOnly || !!p.is_promo;

      return matchesQuery && matchesCategory && priceOkMin && priceOkMax && newOk && promoOk;
    });
  }, [products, search, categoryId, priceMin, priceMax, isNewOnly, isPromoOnly]);

  if (loading) return <div className="p-6">Chargement...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  if (!filtered.length) {
    return (
      <div className="p-10 text-center text-gray-500">Aucun produit trouvé.</div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">ID Produit</th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">Titre</th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">Catégorie</th>
                <th className="p-3 text-right text-sm font-semibold border-b border-gray-200">Prix</th>
                <th className="p-3 text-center text-sm font-semibold border-b border-gray-200">Étiquettes</th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">Créé</th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">MAJ</th>
                <th className="p-3 text-center text-sm font-semibold border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b border-gray-100 font-medium text-gray-900">
                    <div className="flex flex-col">
                      <span>{String(p.id)}</span>
                      <span className="text-xs text-gray-500">{p._id}</span>
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-100 text-gray-900">
                    <div className="flex items-center gap-3">
                      {p.src ? (
                        <img src={p.src} alt={p.title} className="w-10 h-10 rounded object-cover border" />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-200" />
                      )}
                      <div className="flex flex-col">
                        <span className="font-medium">{p.title}</span>
                        {p.description ? (
                          <span className="text-xs text-gray-500 line-clamp-1 max-w-[360px]">{p.description}</span>
                        ) : null}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-gray-900">{p.category?.name ?? "-"}</span>
                      {p.category?.id !== undefined && (
                        <span className="text-xs text-gray-500">ID: {p.category.id}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-100 text-right text-gray-900">
                    {typeof p.price === "number"
                      ? p.price.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })
                      : "-"}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2">
                      {p.is_new ? (
                        <span className="px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-700 border border-blue-200">Nouveau</span>
                      ) : null}
                      {p.is_promo ? (
                        <span className="px-2 py-0.5 text-xs rounded bg-amber-50 text-amber-700 border border-amber-200">Promo</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="p-3 border-b border-gray-100 text-gray-600">
                    {p.created_at ? new Date(p.created_at).toLocaleString("fr-FR") : "-"}
                  </td>
                  <td className="p-3 border-b border-gray-100 text-gray-600">
                    {p.updated_at ? new Date(p.updated_at).toLocaleString("fr-FR") : "-"}
                  </td>
                  <td className="p-3 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-2">
                      <button className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                        Modifier
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
