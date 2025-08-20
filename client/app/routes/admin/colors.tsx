import { useEffect, useState } from "react";
import ColorsAdmin from "~/components/Admin/ColorsAdmin";
import { productColor } from "~/services/admin/productColorService";

export default function Categories() {
  const [searchColor, setSearchColor] = useState("");

  const [nameColor, setNameColor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hexColor, setHexColor] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchColor(e.target.value);
  };

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    setHexColor(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, error]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    if (!nameColor.trim() || !hexColor.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    try {
      const res = await productColor.createColor(nameColor, hexColor);
      if (res.success) {
        setIsModalOpen(false);
        setNameColor("");
        setHexColor("");
        setSuccess("Couleur ajoutée !");
      } else {
        setError("Erreur inattendue.");
      }
    } catch (err) {
      return `A rencontré un problème de type ${err}`;
    }
  };
  return (
    <div className="sm:ml-80 mr-3 ml-3 flex flex-col gap-3 text-black">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-2xl transform transition-all max-h-[90vh] overflow-y-auto">
            <div className="flex flex-col justify-between items-start mb-6">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-bold text-gray-900">
                  Ajouter une nouvelle couleur
                </h2>
                <hr className="text-gray-300" />
                <p className="text-gray-600 mt-1">
                  Créez une nouvelle couleur pour vos chaussettes.
                </p>
                <div className="flex flex-col gap-2">
                  <h3>Nom de la couleur</h3>
                  <input
                    className="w-full border border-gray-300 p-1.5 rounded-lg"
                    type="text"
                    name="nameColor"
                    id="nameColor"
                    placeholder="Ex: Rouge Passion"
                    value={nameColor}
                    onChange={e => setNameColor(e.target.value)}
                  />
                  <h3>Code couleur (Hex)</h3>
                  <div className="w-full border border-gray-300 rounded-lg flex justify-center items-center p-0.5">
                    <input
                      className="w-full h-10"
                      type="color"
                      name="hexColor"
                      id="hexColor"
                      value={hexColor}
                      onChange={handleColor}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5"></div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Annuler
              </button>
              <button
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                onClick={handleSubmit}
              >
                Valider
              </button>
            </div>
            <p className="text-red-600 flex justify-center items-center pt-5">
              {error}
            </p>
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
              onChange={handleSearchColor}
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
      <p className="text-red-500 block">{success}</p>
      <div className="flex flex-col items-center justify-center">
        <ColorsAdmin searchColor={searchColor} />
      </div>
    </div>
  );
}
