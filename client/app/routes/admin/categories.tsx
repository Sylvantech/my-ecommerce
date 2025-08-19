import { useState } from "react";
import CategoryAdmin from "~/components/Admin/CategoryAdmin";
import { adminService } from "~/services/adminService";

export default function Categories() {
  const [searchCategory, setSearchCategory] = useState("");

  const [description, setDescription] = useState("");

  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [refresh, setRefresh] = useState(0);

  const handleSubmit = async () => {
    if (name && description) {
      const res = await adminService.createCategory(name, description);
      if (res?.success) {
        setIsModalOpen(false);
        setRefresh(r => r + 1);
      } else {
        return res;
      }
    }
  };

  const handleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(e.target.value);
  };

  return (
    <div className="sm:ml-80 mr-3 flex flex-col gap-3">
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end items-center p-4 bg-black/50 w-full">
          <div className="bg-white w-sm lg:w-3xl p-6 flex flex-col gap-4 rounded-lg">
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm text-gray-700"
                >
                  X
                </button>
              </div>
              <h1 className="text-xl">Ajouter une nouvelle catégorie</h1>
              <p className="text-gray-500 text-sm">
                Créez une nouvelle catégorie pour organiser vos produits.
              </p>
            </div>
            <div>
              <h3>Nom de la catégorie</h3>
              <input
                className="shadow border border-gray-300 w-full rounded-lg p-1.5"
                type="text"
                name="name"
                id="name"
                placeholder="Ex: Chaussettes..."
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              <h3>Description</h3>
              <textarea
                className="shadow p-2 border border-gray-300 w-full rounded-lg"
                name="description"
                id="description"
                placeholder="Description de la catégorie..."
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-gray-200 p-2 rounded-lg text-sm"
              >
                Annuler
              </button>
              <button
                onClick={handleSubmit}
                className="bg-gray-400 hover:bg-black text-white p-2 rounded-lg text-sm"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white text-sm p-1 rounded-lg flex justify-center items-center gap-1"
        >
          <span className="text-xl">+</span> Ajouter une catégorie
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <CategoryAdmin searchCategory={searchCategory} refresh={refresh} />
      </div>
    </div>
  );
}
