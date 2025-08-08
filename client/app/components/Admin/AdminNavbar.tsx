import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    if (isAccountMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountMenuOpen]);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 text-white bg-gray-800 rounded"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-gray-50 dark:bg-gray-800`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          {/* Optional close button for mobile */}
          <div className="flex justify-end sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-200 text-xl"
            >
              ✕
            </button>
          </div>

          <ul className="space-y-2 font-medium">
            {/* Utilisateurs */}
            <li>
              <button
                type="button"
                className="flex items-center space-x-4 w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  👥 Utilisateurs
                </span>
              </button>
              <ul id="users-menu" className="py-2 space-y-2">
                <li>
                  <a
                    href="/admin/user"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Liste des utilisateurs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Jetons d’authentification
                  </a>
                </li>
              </ul>
            </li>

            {/* Produits */}
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  🛍️ Catalogue
                </span>
              </button>
              <ul id="products-menu" className="py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Produits
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Catégories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Tailles
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Assets
                  </a>
                </li>
              </ul>
            </li>

            {/* Commandes */}
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  🛒 Commandes
                </span>
              </button>
              <ul id="orders-menu" className="py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Paniers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Produits du panier
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Compteur
                  </a>
                </li>
              </ul>
            </li>

            {/* Avis clients */}
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 text-left whitespace-nowrap">
                  ⭐ Avis clients
                </span>
              </button>
              <ul id="review-menu" className="py-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="block pl-11 pr-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
