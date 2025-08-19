import { useEffect, useState } from "react";
import { adminService } from "~/services/adminService";

interface VariantAdminProps {
  searchVariant?: string;
  refresh: number;
}

interface ProductVariant {
  _id: string;
  id: number;
  product_id: {
    _id: string;
    name: string;
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

  // const handleSubmit = async () => {
  //     if (productId && colorId && sizeId && src && id) {
  //         const res = await adminService.modifyProductVariant(
  //             id,
  //             productId,
  //             colorId,
  //             sizeId,
  //             src,
  //             stock,
  //             available
  //         );
  //         if (res?.success) {
  //             setIsModalOpen(false);
  //             await getVariants();
  //         } else {
  //             return res;
  //         }
  //     }
  // };

  useEffect(() => {
    getVariants();
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
      variant.product_id?.name
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
        ? filtered.map((variant, index) => (
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
                        alt={`${variant.product_id.name} - ${variant.color_id.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
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
                        {variant.product_id.name}
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
        : variants.map((variant, index) => (
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
                        alt={`${variant.product_id.name} - ${variant.color_id.name}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
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
                        {variant.product_id.name}
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
