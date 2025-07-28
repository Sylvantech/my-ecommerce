export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex justify-center items-center bg-gradient-to-r from-pink-400 to bg-purple-500 rounded-full w-10 h-10">
              <span className="text-xl">🧦</span>
            </div>
            <h3 className="text-2xl font-black bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              SockLand
            </h3>
          </div>
          <p className="text-gray-400 leading-relaxed lg:text-center">
            Créateur de chaussettes personnalisées depuis 2020. Exprimez votre
            style unique avec nos créations originales et confortables.
          </p>
          <div className="flex space-x-4">
            <span className="text-xl">🐦</span>
            <span className="text-xl">📘</span>
            <span className="text-xl">📷</span>
          </div>

          <div className="sm:flex sm:flex-row sm:justify-evenly">
            <div className="space-y-4 flex flex-col">
              <h4 className="text-lg font-bold">Boutique</h4>
              <ul className="space-y-2 text-gray-400 ">
                <li>
                  <a
                    href="/collections"
                    className="hover:text-white transition-colors"
                  >
                    Toutes les Collections
                  </a>
                </li>
                <li>
                  <a
                    href="/personnaliser"
                    className="hover:text-white transition-colors"
                  >
                    Personnaliser
                  </a>
                </li>
                <li>
                  <a
                    href="/nouveautes"
                    className="hover:text-white transition-colors"
                  >
                    Nouveautés
                  </a>
                </li>
                <li>
                  <a
                    href="/promotions"
                    className="hover:text-white transition-colors"
                  >
                    Promotions
                  </a>
                </li>
                <li>
                  <a
                    href="/carte-cadeau"
                    className="hover:text-white transition-colors"
                  >
                    Carte Cadeau
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Nous Contacter
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/guide-tailles"
                    className="hover:text-white transition-colors"
                  >
                    Guide des Tailles
                  </a>
                </li>
                <li>
                  <a
                    href="/livraison"
                    className="hover:text-white transition-colors"
                  >
                    Livraison &amp; Retours
                  </a>
                </li>
                <li>
                  <a
                    href="/garantie"
                    className="hover:text-white transition-colors"
                  >
                    Garantie Qualité
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Newsletter</h4>
            <p className="text-gray-400">
              Recevez nos dernières créations et offres exclusives
            </p>
            <div className="flex space-x-2">
              <input
                placeholder="Votre email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                type="email"
              ></input>
              <button className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground hover:bg-primary/90 h-10 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 px-6 rounded-lg">
                OK
              </button>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <label htmlFor="newsletter-consent">
                J&apos;accepte de recevoir des communications marketing
              </label>
              <input
                id="newsletter-consent"
                className="rounded"
                type="checkbox"
              ></input>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col justify-between items-center space-y-4">
              <div className="flex space-x-6 text-sm text-gray-400">
                <a
                  href="/mentions-legales"
                  className="hover:text-white transition-colors"
                >
                  Mentions Légales
                </a>
                <a
                  href="/confidentialite"
                  className="hover:text-white transition-colors"
                >
                  Confidentialité
                </a>
                <a
                  href="/cookies"
                  className="hover:text-white transition-colors"
                >
                  Cookies
                </a>
                <a href="/cgv" className="hover:text-white transition-colors">
                  CGV
                </a>
              </div>
              <div className="text-sm text-gray-400">
                © 2024 SockLand. Tous droits réservés.
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8">
                <div className="flex flex-col items-center text-gray-400 sm:flex-row gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">🔒</span>
                    <span className="text-sm">Paiement Sécurisé</span>
                    <span className="text-2xl">🚚</span>
                    <span className="text-sm">Livraison 24-48h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">↩️</span>
                    <span className="text-sm">Retour 30 jours</span>
                    <span className="text-2xl">🇫🇷</span>
                    <span className="text-sm">Fabriqué en France</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
