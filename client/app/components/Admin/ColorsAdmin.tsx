import { useEffect, useState } from "react";
import { productColor } from "~/services/admin/productColor";

interface Color {
  id: number;
  name: string;
  hex_code: string;
  created_at: string;
  updated_at: string;
}

interface ColorsAdminProps {
  searchColor: string;
}

export default function ColorsAdmin({ searchColor }: ColorsAdminProps) {
  const [fetchColors, setFetchColors] = useState<Color[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nameColor, setNameColor] = useState("");

  const [color, setColor] = useState("");

  async function getColors() {
    const res = await productColor.getColors();
    if (res?.success) {
      setFetchColors(res.data.productColors);
    }
  }

  useEffect(() => {
    getColors();
  }, []);

  const handleChange = (getColor: string, getHex: string) => {
    setIsModalOpen(true);
    setNameColor(getColor);
    setColor(getHex);
  };

  const filteredColors = fetchColors.filter(color =>
    color.name.toLowerCase().includes(searchColor.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="pl-3 flex flex-col justify-around bg-white border-2 border-gray-200 rounded-xl h-30">
        <h2 className="text-gray-700">Total Couleurs</h2>
        <p className="text-2xl">{2}</p>
      </div>
      <div className="flex flex-col gap-3 mb-3">
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-end items-center p-4 bg-black/50 w-full">
            <div className="bg-white lg:w-3xl w-sm p-6 flex flex-col gap-4 rounded-lg">
              <div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-sm text-gray-700"
                  >
                    X
                  </button>
                </div>
                <h1 className="text-xl">Modifier la couleur</h1>
                <p className="text-gray-500 text-sm">
                  Modifiez les informations de la couleur.
                </p>
              </div>
              <div>
                <h3>Nom de la couleur</h3>
                <input
                  className="shadow border border-gray-300 w-full rounded-lg p-1.5"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Ex: Rouge Passion"
                  value={nameColor}
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
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border border-gray-200 p-2 rounded-lg text-sm"
                >
                  Annuler
                </button>
                <button className="bg-gray-400 hover:bg-black text-white p-2 rounded-lg text-sm">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        )}
        {filteredColors.length > 0 &&
          filteredColors.map(color => (
            <div
              key={color.id}
              className="bg-white flex flex-col p-3 h-55 rounded-xl text-gray-700 gap-2 w-full mb-3 shadow"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border-2 border-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <div
                    className="h-7 w-7 rounded-full"
                    style={{ backgroundColor: color.hex_code }}
                  ></div>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-black">{color.name}</h3>
                  <div className="flex justify-center items-center gap-3">
                    <p>{color.hex_code}</p>
                    <p>ID: {color.id}</p>
                  </div>
                </div>
              </div>
              <div className="flex text-sm">
                <p>
                  Créée:{" "}
                  {new Date(color.created_at).toLocaleDateString("fr-FR")}
                  <span className="mx-2.5">•</span>
                </p>
                <p>
                  Modifiée:{" "}
                  {new Date(color.updated_at).toLocaleDateString("fr-FR")}
                </p>
              </div>
              <hr className="text-gray-100" />
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleChange(color.name, color.hex_code)}
                    className="border border-gray-200 p-1.5 rounded-lg w-10 flex justify-center items-center hover:bg-red-200"
                  >
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
                      className="lucide lucide-square-pen h-4 w-4"
                    >
                      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"></path>
                    </svg>
                  </button>
                  <button className="border border-gray-200 p-1.5 rounded-lg w-10 flex justify-center items-center hover:bg-red-200">
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
                      className="lucide lucide-trash2 h-4 w-4"
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
    </div>
  );
}
