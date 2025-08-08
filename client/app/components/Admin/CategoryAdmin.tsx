import { useEffect, useState } from "react";
import { adminService } from "~/services/adminService";

interface CategoryAdminProps {
  searchCategory: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function CategoryAdmin({ searchCategory }: CategoryAdminProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  console.log(categories);

  useEffect(() => {
    async function getCategories() {
      const res = await adminService.getCategories();
      if (res.success) {
        setCategories(res.data);
      } else {
        console.error(res.error);
      }
    }
    getCategories();
  }, []);

  if (categories.length < 1) {
    return "Chargement";
  }

  const filtered = categories.filter(category =>
    category.name.toLowerCase().includes(searchCategory.toLowerCase())
  );

  return (
    <div className="sm:w-full">
      {filtered.length > 0
        ? filtered.map((category, index) => (
            <div
              key={index}
              className="bg-white flex flex-col p-3 w-90 h-55 rounded-xl text-gray-700 gap-2 sm:w-full mb-3 shadow"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                    className="lucide lucide-tag h-4 w-4 text-blue-600"
                  >
                    <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                    <circle
                      cx="7.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </svg>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between">
                    <h3 className="text-black">{category.name}</h3>
                    <p className="text-xs sm:text-base bg-gray-100 p-2 rounded-lg">
                      <span className="border-b-1">{12}</span>
                    </p>
                  </div>
                  <p className="text-sm">ID: {category.id}</p>
                </div>
              </div>
              <p className="text-sm">{category.description}</p>
              <div className="flex text-sm">
                <p>
                  Créée: 08/01/2024<span className="mx-2.5">•</span>
                </p>
                <p>Modifiée: 12/01/2024</p>
              </div>
              <hr className="text-gray-100" />
              <div className="flex justify-between">
                <button className="border border-gray-200 p-1.5 rounded-lg w-20 flex justify-center items-center">
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
                    className="lucide lucide-eye mr-2 h-4 w-4"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <span className="text-sm">Voir</span>
                </button>
                <div className="flex gap-2">
                  <button className="border border-gray-200 p-1.5 rounded-lg w-10 flex justify-center items-center">
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
                  <button className="border border-gray-200 p-1.5 rounded-lg w-10 flex justify-center items-center">
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
          ))
        : Array.isArray(categories) &&
          categories.map((category, index) => {
            return (
              <div
                key={index}
                className="bg-white flex flex-col p-3 w-90 h-55 rounded-xl text-gray-700 gap-2 sm:w-full mb-3 shadow"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
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
                      className="lucide lucide-tag h-4 w-4 text-blue-600"
                    >
                      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"></path>
                      <circle
                        cx="7.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </svg>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between">
                      <h3 className="text-black">{category.name}</h3>
                      <p className="text-xs sm:text-base bg-gray-100 p-2 rounded-lg">
                        <span className="border-b-1">{12}</span>
                      </p>
                    </div>
                    <p className="text-sm">ID: {category.id}</p>
                  </div>
                </div>
                <p className="text-sm">{category.description}</p>
                <div className="flex text-sm">
                  <p>
                    Créée: 08/01/2024<span className="mx-2.5">•</span>
                  </p>
                  <p>Modifiée: 12/01/2024</p>
                </div>
                <hr className="text-gray-100" />
                <div className="flex justify-between">
                  <button className="border border-gray-200 p-1.5 rounded-lg w-20 flex justify-center items-center">
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
                      className="lucide lucide-eye mr-2 h-4 w-4"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <span className="text-sm">Voir</span>
                  </button>
                  <div className="flex gap-2">
                    <button className="border border-gray-200 p-1.5 rounded-lg w-10 flex justify-center items-center">
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
                    <button className="border border-gray-200 p-1.5 rounded-lg w-10 flex justify-center items-center">
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
            );
          })}
    </div>
  );
}
