const Navbar = () => {
  return (
    <nav className="bg-white top-0 w-full z-10">
      <div className="container mx-auto flex justify-around items-center p-4">
        <a
          className="text-[#141313c0] bg-white text-3xl font-bold hover:text-[#615e5ec0]"
          href="#index"
        >
          My Socket
        </a>
        <button
          id="navbar-toggler-button"
          className="lg:hidden text-[#eeeeee87] focus:outline-none"
          type="button"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
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
        <div className="hidden lg:flex space-x-5" id="navbarNav">
          <a
            className="text-[#615e5ec0] text-xl hover:text-[#141313c0]"
            href="#collection"
          >
            Collection
          </a>
          <a
            className="text-[#615e5ec0] text-xl hover:text-[#141313c0]"
            href="#personnalisation"
          >
            Personnalisation
          </a>
          <a
            className="text-[#615e5ec0] text-xl hover:text-[#141313c0]"
            href="#catalogue"
          >
            Catalogue
          </a>
        </div>
        <div className="hidden lg:flex space-x-5" id="navbarRegister">
          <a
            className="text-[#615e5ec0] text-xl hover:text-[#141313c0]"
            href="#login"
          >
            Connexion
          </a>
          <a
            className="text-[#615e5ec0] text-xl hover:text-[#141313c0]"
            href="/register"
          >
            Inscription
          </a>
          <a
            className="text-[#615e5ec0] text-xl hover:text-[#141313c0]"
            href="#panier"
          >
            🧺
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
