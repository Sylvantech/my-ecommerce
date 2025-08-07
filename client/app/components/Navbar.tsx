import { useState, useEffect, useRef } from "react";
import { AuthHelper } from "~/utils/authHelper";
import { CookieHelper } from "~/utils/cookieHelper";

const Navbar = () => {
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(AuthHelper.isLoggedIn());
    };

    checkAuthStatus();
    
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    CookieHelper.removeToken("AccesToken");
    CookieHelper.removeToken("RefreshToken");
    setIsAuthenticated(false);
    setIsAccountMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <a className="flex items-center space-x-3 group" href="/">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
            <span className="text-white font-bold text-lg">🧦</span>
          </div>
          <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-purple-700 bg-clip-text text-transparent hover:from-purple-700 hover:via-pink-600 hover:to-purple-800 transition-all duration-300">
            SockLand
          </span>
        </a>

        <button
          id="navbar-toggler-button"
          className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className={`w-6 h-6 transform transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            ></path>
          </svg>
        </button>

        <div className="hidden lg:flex items-center space-x-8" id="navbarNav">
          <a
            className="relative text-gray-700 text-base font-semibold hover:text-purple-600 transition-all duration-300 group"
            href="#produits"
          >
            Produits
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            className="relative text-gray-700 text-base font-semibold hover:text-purple-600 transition-all duration-300 group"
            href="#personnaliser"
          >
            Personnaliser
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a
            className="relative text-gray-700 text-base font-semibold hover:text-purple-600 transition-all duration-300 group"
            href="#collections"
          >
            Collections
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
          </a>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative" ref={accountMenuRef}>
            <button
              className="text-gray-700 text-base font-semibold hover:text-purple-600 transition-all duration-300 px-4 py-2 rounded-xl hover:bg-purple-50 flex items-center space-x-2 group"
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-white"
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
              </div>
              <span>Compte</span>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${isAccountMenuOpen ? "rotate-180" : ""}`}
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

            {isAccountMenuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-100 py-3 z-20">
                <div className="px-4 py-2 border-b border-gray-100 mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    Mon Compte
                  </p>
                  <p className="text-xs text-gray-500">
                    {isAuthenticated ? "Gérez votre profil" : "Accédez à votre espace"}
                  </p>
                </div>
                
                {isAuthenticated ? (
                  <>
                    <a
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300 group"
                      href="/profil"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Mon Profil</span>
                    </a>
                    <button
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50 hover:text-red-600 transition-all duration-300 group"
                      onClick={handleLogout}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-all duration-300">
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
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">Se déconnecter</span>
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300 group"
                      href="/login"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300">
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
                      </div>
                      <span className="font-medium">Se connecter</span>
                    </a>
                    <a
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600 transition-all duration-300 group"
                      href="/register"
                      onClick={() => setIsAccountMenuOpen(false)}
                    >
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300">
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
                      </div>
                      <span className="font-medium">S&apos;inscrire</span>
                    </a>
                  </>
                )}
              </div>
            )}
          </div>

          <a
            className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-2xl flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
            href="/cart"
          >
            <div className="relative">
              <svg
                className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300"
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
            </div>
            <span className="font-semibold">Panier</span>
          </a>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 px-6 py-6 shadow-lg">
          <div className="space-y-4 mb-6">
            <a
              className="block text-gray-700 text-lg font-semibold hover:text-purple-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-purple-50 group"
              href="#produits"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-between">
                Produits
                <svg
                  className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>
            <a
              className="block text-gray-700 text-lg font-semibold hover:text-purple-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-purple-50 group"
              href="#personnaliser"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-between">
                Personnaliser
                <svg
                  className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>
            <a
              className="block text-gray-700 text-lg font-semibold hover:text-purple-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-purple-50 group"
              href="#collections"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="flex items-center justify-between">
                Collections
                <svg
                  className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </a>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-4 mb-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Mon Compte
              </p>
              <p className="text-xs text-gray-500">
                {isAuthenticated ? "Gérez votre profil" : "Accédez à votre espace"}
              </p>
            </div>
            
            {isAuthenticated ? (
              <>
                <a
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-purple-50 group"
                  href="/profil"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300">
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
                  </div>
                  <span className="font-semibold">Mon Profil</span>
                </a>

                <button
                  className="w-full flex items-center space-x-4 text-gray-700 hover:text-red-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-red-50 group"
                  onClick={handleLogout}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-red-100 transition-all duration-300">
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold">Se déconnecter</span>
                </button>
              </>
            ) : (
              <>
                <a
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-purple-50 group"
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300">
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
                  </div>
                  <span className="font-semibold">Se connecter</span>
                </a>

                <a
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-all duration-300 py-3 px-4 rounded-xl hover:bg-purple-50 group"
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-purple-100 transition-all duration-300">
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
                  </div>
                  <span className="font-semibold">S&apos;inscrire</span>
                </a>
              </>
            )}

            <a
              className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 hover:from-purple-700 hover:via-pink-600 hover:to-purple-700 text-white px-6 py-4 rounded-2xl flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6 group"
              href="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="relative">
                <svg
                  className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
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
              </div>
              <span className="font-bold text-lg">Mon Panier</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
