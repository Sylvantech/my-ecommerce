import { useEffect, useState } from "react";
import VariantAdmin from "~/components/Admin/VariantAdmin";
import { productSizeService } from "~/services/productSizeService";
import type { ProductSize } from "~/types/productSize";
import { productService } from "~/services/productService";
import type { Product } from "~/types/product";
import { productColorService } from "~/services/productColorService";
import type { ProductColor } from "~/types/productColor";
import { adminService } from "~/services/admin/adminService";

export default function Variants() {
  const [searchVariant, setSearchVariant] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [sizeList, setSizeList] = useState<ProductSize[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [productColorList, setproductColorList] = useState<ProductColor[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedSizeId, setSelectedSizeId] = useState("");
  const [selectedColorId, setSelectedColorId] = useState("");
  const [stock, setStock] = useState<number>(0);
  const [variantSrc, setVariantSrc] = useState("");

  const handleSubmit = async () => {
    if (
      selectedProductId &&
      selectedSizeId &&
      selectedColorId &&
      stock >= 0 &&
      variantSrc
    ) {
      const res = await adminService.createProductVariant(
        selectedProductId,
        selectedSizeId,
        selectedColorId,
        variantSrc,
        stock,
        true
      );
      if (res?.success) {
        setIsModalOpen(false);
        setSelectedProductId("");
        setSelectedSizeId("");
        setSelectedColorId("");
        setStock(0);
        setVariantSrc("");
        setRefresh(r => r + 1);
      } else {
        console.error("Erreur lors de la création:", res?.error);
      }
    }
  };

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

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      if (response?.success && response.data) {
        setProductList(response.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  useEffect(() => {
    fetchSizes();
    fetchProducts();
    fetchColors();
  }, []);

  const handleVariant = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVariant(e.target.value);
  };

  return (
    <div className="sm:ml-80 min-h-screen bg-gray-50 p-6">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Nouvelle Variante
                </h2>
                <p className="text-gray-600 mt-1">
                  Créez une nouvelle variante pour vos produits.
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
                  htmlFor="product"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Produit Master
                </label>
                <div className="relative">
                  <select
                    id="product"
                    value={selectedProductId}
                    onChange={e => setSelectedProductId(e.target.value)}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Sélectionner un produit</option>
                    {productList.map(product => (
                      <option key={product._id} value={product._id}>
                        {product.title}
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
                {selectedProductId && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    {(() => {
                      const selectedProduct = productList.find(
                        p => p._id === selectedProductId
                      );
                      return selectedProduct?.src ? (
                        <div className="flex items-center space-x-3">
                          <img
                            src={selectedProduct.src}
                            alt={selectedProduct.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <span className="text-sm text-gray-600">
                            Image du produit
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          Aucune image disponible
                        </span>
                      );
                    })()}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Taille
                </label>
                <div className="relative">
                  <select
                    id="size"
                    value={selectedSizeId}
                    onChange={e => setSelectedSizeId(e.target.value)}
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
                  htmlFor="color"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Couleur
                </label>
                <div className="relative">
                  <select
                    id="color"
                    value={selectedColorId}
                    onChange={e => setSelectedColorId(e.target.value)}
                    className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Sélectionner une couleur</option>
                    {productColorList.map(color => (
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
                {selectedColorId && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    {(() => {
                      const selectedColor = productColorList.find(
                        c => c._id === selectedColorId
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
                  htmlFor="stock"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  min="0"
                  value={stock}
                  onChange={e => setStock(parseInt(e.target.value))}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Quantité en stock"
                />
              </div>

              <div>
                <label
                  htmlFor="variantSrc"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Image de la variante
                </label>
                <input
                  type="url"
                  id="variantSrc"
                  value={variantSrc}
                  onChange={e => setVariantSrc(e.target.value)}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="https://exemple.com/image.jpg"
                />
                {variantSrc && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={variantSrc}
                      alt="Aperçu variante"
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={e => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
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
                disabled={
                  !selectedProductId ||
                  !selectedSizeId ||
                  !selectedColorId ||
                  stock < 0 ||
                  !variantSrc
                }
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                Créer la variante
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Gestion des Variantes
            </h1>
            <p className="text-gray-600 text-lg">
              Gérez les variantes de vos produits (tailles, couleurs, etc.)
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-gray-500">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full sm:max-w-md">
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
                type="text"
                id="search"
                value={searchVariant}
                onChange={handleVariant}
                className="text-black block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Rechercher une variante..."
              />
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
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
            Ajouter une variante
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 min-h-96">
        <VariantAdmin searchVariant={searchVariant} refresh={refresh} />
      </div>
    </div>
  );
}
