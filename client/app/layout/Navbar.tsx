import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu compte quand on clique en dehors
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
    <nav className="top-0 w-full z-10 ">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <a className="flex items-center space-x-2" href="#index">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🧦</span>
          </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">SockLand</span>
        </a>

        {/* Bouton menu mobile */}
        <button
          id="navbar-toggler-button"
          className="lg:hidden text-gray-600 focus:outline-none"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Menu principal */}
        <div className="hidden lg:flex items-center space-x-8" id="navbarNav">
            <a
            className="text-gray-900 text-base font-medium hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-colors"
            href="#produits"
            >
            Produits
            </a>
            <a
            className="text-gray-900 text-base font-medium hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-colors"
            href="#personnaliser"
            >
            Personnaliser
            </a>
            <a
            className="text-gray-900 text-base font-medium hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-colors"
            href="#collections"
            >
            Collections
            </a>
        </div>

        {/* Section droite avec favoris et panier */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Menu Compte */}
          <div className="relative" ref={accountMenuRef}>
            <button
              className="text-gray-700 text-base font-medium hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-1"
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Compte</span>
              <svg
                className={`w-4 h-4 transition-transform ${isAccountMenuOpen ? "rotate-180" : ""}`}
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
            </button>

            {/* Menu déroulant */}
            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                <a
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  href="/login"
                  onClick={() => setIsAccountMenuOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Se connecter</span>
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  href="/register"
                  onClick={() => setIsAccountMenuOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <span>S&apos;inscrire</span>
                </a>
              </div>
            )}
          </div>

          {/* Panier */}
          <a
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all"
            href="#panier"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="font-medium">Panier (3)</span>
          </a>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden px-6 py-4">
          {/* Navigation mobile */}
          <div className="space-y-3 mb-4">
            <a
              className="block text-gray-700 text-base font-medium hover:text-gray-900 transition-colors py-2"
              href="#produits"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Produits
            </a>
            <a
              className="block text-gray-700 text-base font-medium hover:text-gray-900 transition-colors py-2"
              href="#personnaliser"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Personnaliser
            </a>
            <a
              className="block text-gray-700 text-base font-medium hover:text-gray-900 transition-colors py-2"
              href="#collections"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </a>
          </div>

          {/* Actions mobile */}
          <div className="space-y-3 border-t border-gray-200 pt-4">
            {/* Compte mobile */}
            <a
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Se connecter</span>
            </a>

            <a
              className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 transition-colors py-2"
              href="/register"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              <span>S&apos;inscrire</span>
            </a>

            {/* Panier mobile */}
            <a
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-full flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-600 transition-all mt-4"
              href="#panier"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="font-medium">Panier (3)</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
