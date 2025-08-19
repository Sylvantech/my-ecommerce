import { useEffect, useState } from "react";
import ColorsAdmin from "~/components/Admin/ColorsAdmin";

export default function Categories() {
  const [searchColor, setSearchColor] = useState("");

  const [description, setDescription] = useState("");

  const [name, setNameColor] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [color, setColor] = useState("");

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchColor(e.target.value);
  };

  return (
    <div className="sm:ml-80 mr-3 ml-3 flex flex-col gap-3 text-black">
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end items-center p-4 bg-black/50 w-full">
          <div className="bg-white w-full max-w-sm p-6 flex flex-col gap-4 rounded-lg">
            <div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm text-gray-700"
                >
                  X
                </button>
              </div>
              <div className="gap-3 flex flex-col">
                <h1 className="text-xl">Ajouter une nouvelle couleur</h1>
                <hr className="text-gray-300" />
                <p className="text-gray-500 text-sm">
                  Créez une nouvelle couleur pour vos chaussettes.
                </p>
              </div>
            </div>
            <div>
              <h3>Nom de la couleur</h3>
              <input
                className="shadow border border-gray-300 w-full rounded-lg p-1.5"
                type="text"
                name="name"
                id="name"
                placeholder="Ex: Rouge Passion"
                onChange={e => setNameColor(e.target.value)}
              />
            </div>
            <h3>Code couleur (Hex)</h3>
            <div className="flex gap-2 items-center">
              <div className="border border-gray-300 p-2 w-20 bg-white flex justify-center items-center rounded-sm">
                <div
                  className="px-7 py-3 border border-gray-500 "
                  style={{ backgroundColor: color }}
                ></div>
              </div>
              <input
                name={color}
                id={color}
                className="border border-gray-300 p-1.5 rounded-lg"
                type="text"
                value={color}
                onChange={e => setColor(e.target.value)}
              />
            </div>
            <div>
              <h3>Description</h3>
              <textarea
                className="shadow p-2 border border-gray-300 w-full rounded-lg"
                name="description"
                id="description"
                placeholder="Description de la couleur..."
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
              <button className="bg-gray-400 hover:bg-black text-white p-2 rounded-lg text-sm">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-3xl">Gestion des Couleurs</h1>
      <p className="text-gray-700 mb-6">
        Gérez la palette de couleurs de vos chaussettes
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
              placeholder="Rechercher une couleur..."
              className="w-full"
              onChange={handleColor}
              value={searchColor}
            />
          </form>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-black text-white text-sm p-1 rounded-lg flex justify-center items-center gap-1"
        >
          <span className="text-xl">+</span> Ajouter une couleur
        </button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ColorsAdmin searchColor={searchColor} />
      </div>
    </div>
  );
}
