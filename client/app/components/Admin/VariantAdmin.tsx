import { useEffect, useState } from "react";
import { adminService } from "~/services/admin/adminService";
import { productSizeService } from "~/services/productSizeService";
import type { ProductSize } from "~/types/productSize";
import { productColorService } from "~/services/productColorService";
import type { ProductColor } from "~/types/productColor";
interface VariantAdminProps {
  searchVariant?: string;
  refresh: number;
}

interface ProductVariant {
  _id: string;
  id: number;
  product_id: {
    _id: string;
    title: string;
  };
  color_id: {
    _id: string;
    name: string;
  };
  size_id: {
    _id: string;
    eu_size: string;
  };
  src: string;
  stock: number;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export default function VariantAdmin({
  searchVariant,
  refresh,
}: VariantAdminProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [productId, setProductId] = useState("");
  const [colorId, setColorId] = useState("");
  const [sizeId, setSizeId] = useState("");
  const [src, setSrc] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [available, setAvailable] = useState<boolean>(true);
  const [id, setId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sizeList, setSizeList] = useState<ProductSize[]>([]);
  const [productColorList, setproductColorList] = useState<ProductColor[]>([]);

  const handleChange = (variant: ProductVariant) => {
    setIsModalOpen(true);
    setId(variant.id);
    setProductId(variant.product_id._id);
    setColorId(variant.color_id._id);
    setSizeId(variant.size_id._id);
    setSrc(variant.src);
    setStock(variant.stock);
    setAvailable(variant.available);
  };

  async function getVariants() {
    const res = await adminService.getProductVariants();

    if (res.success) {
      setVariants(res.data);
    } else {
      console.error(res.error);
    }
  }

  const fetchSizes = async () => {
    try {
      const response = await productSizeService.getAll();
      if (response?.success && response.data) {
        setSizeList(response.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const fetchColors = async () => {
    try {
      const response = await productColorService.getAll();
      if (response?.success && response.data && Array.isArray(response.data)) {
        setproductColorList(response.data);
      } else {
        console.error("Response structure is incorrect:", response);
        setproductColorList([]);
      }
    } catch (error) {
      console.error("Error fetching colors:", error);
      setproductColorList([]);
    }
  };

  const handleSubmit = async () => {
    if (productId && colorId && sizeId && src && id) {
      const res = await adminService.modifyProductVariant(
        id,
        colorId,
        sizeId,
        src,
        stock,
        available
      );
      if (res?.success) {
        setIsModalOpen(false);
        await getVariants();
      } else {
        return res;
      }
    }
  };

  useEffect(() => {
    getVariants();
    fetchSizes();
    fetchColors();
  }, []);

  useEffect(() => {
    getVariants();
  }, [refresh]);

  if (variants.length < 1) {
    return "Chargement";
  }

  const handleDelete = (id: number) => {
    async function deleteVariant() {
      const res = await adminService.deleteProductVariant(id);
      if (res.success) {
        getVariants();
      } else {
        console.error(res.error);
      }
    }
    deleteVariant();
  };
  const filtered = variants.filter(
    variant =>
      variant.product_id?.title
        ?.toLowerCase()
        .includes((searchVariant || "").toLowerCase()) ||
      variant.color_id?.name
        ?.toLowerCase()
        .includes((searchVariant || "").toLowerCase()) ||
      variant.size_id?.eu_size
        ?.toLowerCase()
        .includes((searchVariant || "").toLowerCase())
  );

  return (
    <div className="w-full">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Modifier la Variante
                </h2>
                <p className="text-gray-600 mt-1">
                  Modifiez les propriétés de la variante #{id}.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="editColor"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Couleur
                </label>
                <div className="relative">
                  <select
                    id="editColor"
                    value={colorId}
                    onChange={e => setColorId(e.target.value)}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Sélectionner une couleur</option>
                    {Array.isArray(productColorList) &&
                      productColorList.map(color => (
                        <option key={color._id} value={color._id}>
                          {color.name}
                        </option>
                      ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                {colorId && Array.isArray(productColorList) && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    {(() => {
                      const selectedColor = productColorList.find(
                        c => c._id === colorId
                      );
                      return selectedColor ? (
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-8 h-8 rounded-full border-2 border-gray-200 shadow-sm"
                            style={{ backgroundColor: selectedColor.hex_code }}
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-900">
                              {selectedColor.name}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              {selectedColor.hex_code}
                            </span>
                          </div>
                        </div>
                      ) : null;
                    })()}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="editSize"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Taille
                </label>
                <div className="relative">
                  <select
                    id="editSize"
                    value={sizeId}
                    onChange={e => setSizeId(e.target.value)}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Sélectionner une taille</option>
                    {sizeList.map(size => (
                      <option key={size._id} value={size._id}>
                        EU {size.eu_size}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="editStock"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="editStock"
                  min="0"
                  value={stock}
                  onChange={e => setStock(parseInt(e.target.value) || 0)}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Quantité en stock"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Disponibilité
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={available === true}
                      onChange={() => setAvailable(true)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center px-4 py-3 rounded-xl border-2 transition-all ${
                        available === true
                          ? "border-green-500 bg-green-50 text-green-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center border-2 ${
                          available === true
                            ? "border-green-500 bg-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {available === true && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="font-medium">Disponible</span>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      checked={available === false}
                      onChange={() => setAvailable(false)}
                      className="sr-only"
                    />
                    <div
                      className={`flex items-center px-4 py-3 rounded-xl border-2 transition-all ${
                        available === false
                          ? "border-red-500 bg-red-50 text-red-700"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full mr-3 flex items-center justify-center border-2 ${
                          available === false
                            ? "border-red-500 bg-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        {available === false && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="font-medium">Indisponible</span>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="editSrc"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Image de la variante
                </label>
                <input
                  type="url"
                  id="editSrc"
                  value={src}
                  onChange={e => setSrc(e.target.value)}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://exemple.com/image.jpg"
                />
                {src && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <img
                        src={src}
                        alt="Aperçu variante"
                        className="w-16 h-16 rounded-lg object-cover"
                        onError={e => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <span className="text-sm text-gray-600">
                        Aperçu de l&apos;image
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                disabled={!colorId || !sizeId || !src}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-around gap-4 mb-6">
        <div className="px-6 py-4 flex flex-col justify-center bg-white border border-gray-200 rounded-xl w-full shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            Total Variantes
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {variants.length}
          </p>
        </div>
      </div>
      {filtered.length > 0
        ? filtered.map(variant => (
            <div
              key={variant.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-4 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm bg-gray-100">
                    {variant.src ? (
                      <img
                        src={variant.src}
                        alt={`${variant.product_id.title} - ${variant.color_id.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-black w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M16.5 9.4 7.55 4.24"></path>
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.29,7 12,12 20.71,7"></polyline>
                          <line x1="12" x2="12" y1="22" y2="12"></line>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Produit lié : {variant.product_id.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          variant.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {variant.available ? "Disponible" : "Indisponible"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      ID: {variant.id}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Couleur
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {variant.color_id.name}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Taille
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {variant.size_id.eu_size}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Stock
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {variant.stock}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <span>
                        Créée:{" "}
                        {new Date(variant.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                      <span>•</span>
                      <span>
                        Modifiée:{" "}
                        {new Date(variant.updated_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChange(variant)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    title="Modifier"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(variant.id)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        : variants.map(variant => (
            <div
              key={variant.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-4 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm bg-gray-100">
                    {variant.src ? (
                      <img
                        src={variant.src}
                        alt={`${variant.product_id.title} - ${variant.color_id.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-blue-400 w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M16.5 9.4 7.55 4.24"></path>
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                          <polyline points="3.29,7 12,12 20.71,7"></polyline>
                          <line x1="12" x2="12" y1="22" y2="12"></line>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {variant.product_id.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          variant.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {variant.available ? "Disponible" : "Indisponible"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      ID: {variant.id}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Couleur
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {variant.color_id.name}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Taille
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {variant.size_id.eu_size}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Stock
                        </p>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {variant.stock}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>
                        Créée:{" "}
                        {new Date(variant.created_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                      <span>•</span>
                      <span>
                        Modifiée:{" "}
                        {new Date(variant.updated_at).toLocaleDateString(
                          "fr-FR"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChange(variant)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    title="Modifier"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(variant.id)}
                    className="inline-flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    title="Supprimer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
