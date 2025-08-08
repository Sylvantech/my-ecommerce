import { useState } from "react";
import CategoryAdmin from "~/components/Admin/CategoryAdmin";

export default function Categories() {
  const [searchCategory, setSearchCategory] = useState("");

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(e.target.value);
  };

  return (
    <div className="sm:ml-80 mr-3 flex flex-col gap-3">
      <h1 className="text-3xl">Gestion des Catégories</h1>
      <p className="text-gray-700 mb-6">
        Organisez vos produits par catégories
      </p>
      <div className="flex justify-between gap-2">
        <div className="flex-1 flex flex-row items-center border rounded-xl border-gray-200 gap-4 p-1">
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
            className="text-gray-400 h-4 w-4"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <form action="" className="text-sm w-full">
            <label htmlFor=""></label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Rechercher une catégorie..."
              className="w-full"
              onChange={handleCategory}
              value={searchCategory}
            />
          </form>
        </div>
        <button className="bg-black text-white text-sm p-1 rounded-lg flex justify-center items-center gap-1">
          <span className="text-xl">+</span> Ajouter une catégorie
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <CategoryAdmin searchCategory={searchCategory} />
      </div>
    </div>
  );
}
