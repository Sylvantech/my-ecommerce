import { useEffect, useMemo, useState } from "react";
import { adminService } from "~/services/admin/adminService";
import type {
  CartAdminProps,
  CartDoc,
  CartProductDoc,
  UserLite,
} from "~/types/admin-cart";

export default function CartAdmin({
  search = "",
  ownerType = "all",
  dateFrom = "",
  dateTo = "",
  refresh,
}: CartAdminProps) {
  const [carts, setCarts] = useState<CartDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewCart, setViewCart] = useState<CartDoc | null>(null);
  const [viewProducts, setViewProducts] = useState<CartProductDoc[]>([]);
  const [viewLoading, setViewLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await adminService.getCarts();
    if (res.success) {
      setCarts(res.data || []);
    } else {
      setError(res.error || "Erreur inconnue");
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    load();
  }, [refresh]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return (carts || []).filter(c => {
      const isUser = !!c.user_id && typeof c.user_id === "object";
      const user = isUser ? (c.user_id as UserLite) : null;
      const pseudo = user?.username ?? "";
      const email = user?.email ?? "";

      const matchesQuery =
        !q ||
        String(c.id).includes(q) ||
        c._id.toLowerCase().includes(q) ||
        pseudo.toLowerCase().includes(q) ||
        email.toLowerCase().includes(q) ||
        (c.anonymous_user_id?.toLowerCase().includes(q) ?? false);

      const matchesOwner =
        ownerType === "all" ||
        (ownerType === "user" && isUser) ||
        (ownerType === "anonymous" && !isUser);

      const upd = c.updated_at ? new Date(c.updated_at) : null;
      const fromOk = !dateFrom || (upd && upd >= new Date(dateFrom));
      const toOk = !dateTo || (upd && upd <= new Date(dateTo));

      return matchesQuery && matchesOwner && fromOk && toOk;
    });
  }, [carts, search, ownerType, dateFrom, dateTo]);

  const totalCarts = filtered.length;
  const anonymousCount = filtered.filter(
    c => !(!!c.user_id && typeof c.user_id === "object")
  ).length;

  const openView = async (cart: CartDoc) => {
    setViewCart(cart);
    setViewOpen(true);
    setViewLoading(true);
    const res = await adminService.getCartProductsByCartId(cart._id);
    if (res.success) {
      setViewProducts(res.data || []);
    } else {
      setViewProducts([]);
    }
    setViewLoading(false);
  };

  const handleDelete = async (id: string) => {
    const res = await adminService.deleteCart(id);
    if (res.success) {
      load();
    } else {
      setError(res.error || "Erreur lors de la suppression");
    }
  };

  const cartTotal = useMemo(() => {
    return viewProducts.reduce((sum, p) => {
      const price =
        typeof p.product_id === "object" && p.product_id?.price
          ? p.product_id.price
          : 0;
      return sum + price * (p.quantity || 0);
    }, 0);
  }, [viewProducts]);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!filtered.length) return <div>Aucun panier trouvé.</div>;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-around gap-4 mb-6">
        <div className="px-6 py-4 flex flex-col justify-center bg-white border border-gray-200 rounded-xl w-full shadow-sm">
          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            Total Paniers
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalCarts}</p>
        </div>
        <div className="px-6 py-4 flex flex-col justify-center bg-white border border-gray-200 rounded-xl w-full shadow-sm">
          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            Paniers Anonymes
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {anonymousCount}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">
                  ID Panier
                </th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">
                  Propriétaire
                </th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">
                  Créé le
                </th>
                <th className="p-3 text-left text-sm font-semibold border-b border-gray-200">
                  Mis à jour le
                </th>
                <th className="p-3 text-center text-sm font-semibold border-b border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const isUser = !!c.user_id && typeof c.user_id === "object";
                const user = isUser ? (c.user_id as UserLite) : null;
                const pseudo = user?.username ?? "Anonyme";
                const sub = user?.email ?? c.anonymous_user_id ?? "";
                return (
                  <tr key={c._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-100 font-medium text-gray-900">
                      <div className="flex flex-col">
                        <span>{String(c.id)}</span>
                        <span className="text-xs text-gray-500">{c._id}</span>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-100">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{pseudo}</span>
                        <span className="text-gray-500 text-sm">{sub}</span>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">
                      {c.created_at
                        ? new Date(c.created_at).toLocaleString("fr-FR")
                        : "-"}
                    </td>
                    <td className="p-3 border-b border-gray-100 text-gray-600">
                      {c.updated_at
                        ? new Date(c.updated_at).toLocaleString("fr-FR")
                        : "-"}
                    </td>
                    <td className="p-3 border-b border-gray-100">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openView(c)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => handleDelete(c._id)}
                          className="px-3 py-1.5 border border-red-200 text-red-700 rounded-lg text-sm hover:bg-red-50"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {viewOpen && viewCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-gray-200">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Détails du panier
                </h3>
                <p className="text-sm text-gray-500">{`${String(viewCart.id)} • ${viewCart._id}`}</p>
              </div>
              <button
                onClick={() => setViewOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase">
                    Propriétaire
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {typeof viewCart.user_id === "object" && viewCart.user_id
                      ? `${viewCart.user_id.username} (${viewCart.user_id.email})`
                      : `Anonyme${viewCart.anonymous_user_id ? ` • ${viewCart.anonymous_user_id}` : ""}`}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase">Dates</p>
                  <p className="text-sm text-gray-900 mt-1">
                    Créé:{" "}
                    {viewCart.created_at
                      ? new Date(viewCart.created_at).toLocaleString("fr-FR")
                      : "-"}
                    <span className="mx-2">•</span>
                    MAJ:{" "}
                    {viewCart.updated_at
                      ? new Date(viewCart.updated_at).toLocaleString("fr-FR")
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="border rounded-xl">
                <div className="px-4 py-3 bg-gray-100 border-b rounded-t-xl text-sm font-medium text-gray-700">
                  Produits
                </div>
                <div className="p-4">
                  {viewLoading ? (
                    <div>Chargement...</div>
                  ) : viewProducts.length ? (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-gray-600">
                            <th className="text-left p-2">Produit</th>
                            <th className="text-left p-2">Variante</th>
                            <th className="text-center p-2">Quantité</th>
                            <th className="text-right p-2">Prix unitaire</th>
                            <th className="text-right p-2">Sous-total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {viewProducts.map(p => {
                            const price =
                              typeof p.product_id === "object" &&
                              p.product_id?.price
                                ? p.product_id.price
                                : 0;
                            const subtotal = price * (p.quantity || 0);
                            return (
                              <tr key={p._id} className="border-t">
                                <td className="p-2">
                                  {typeof p.product_id === "object"
                                    ? p.product_id.title
                                    : p.product_id}
                                </td>
                                <td className="p-2">
                                  {typeof p.variant_id === "object" &&
                                  p.variant_id ? (
                                    <span>
                                      {p.variant_id.color_id?.name} /{" "}
                                      {p.variant_id.size_id?.eu_size}
                                    </span>
                                  ) : (
                                    String(p.variant_id)
                                  )}
                                </td>
                                <td className="text-center p-2">
                                  {p.quantity}
                                </td>
                                <td className="text-right p-2">
                                  {price.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                  })}
                                </td>
                                <td className="text-right p-2">
                                  {subtotal.toLocaleString("fr-FR", {
                                    style: "currency",
                                    currency: "EUR",
                                  })}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr className="border-t font-semibold">
                            <td colSpan={4} className="p-2 text-right">
                              Total
                            </td>
                            <td className="p-2 text-right">
                              {cartTotal.toLocaleString("fr-FR", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      Aucun produit dans ce panier.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                onClick={() => setViewOpen(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
