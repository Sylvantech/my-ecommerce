import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { authService } from "~/services/authService";
import { CookieHelper } from "../utils/cookieHelper";

export function meta() {
  return [
    { title: "Login - E-commerce" },
    { name: "description", content: "Login" },
  ];
}

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await authService.login(formData);

    if (result.success && result.data) {
      CookieHelper.setToken(result.data.accessToken, "AccesToken");
      CookieHelper.setToken(result.data.refreshToken, "RefreshToken");
      setMessageSuccess("Connexion réussie !");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessageError(result.error ?? "Une erreur est survenue");
      setMessageSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête avec emoji et titre */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">👋</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Bon Retour !
          </h1>
          <p className="text-gray-600 text-lg">
            Connectez-vous pour accéder à votre univers créatif
          </p>
        </div>

        {/* Messages d'erreur et de succès */}
        {messageError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            {messageError}
          </div>
        )}
        {messageSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-center">
            {messageSuccess}
          </div>
        )}

        {/* Formulaire principal */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-pink-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Champ Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-3 text-lg"
              >
                Adresse Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="votre@email.com"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-3 text-lg"
              >
                Mot de Passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700 placeholder-gray-400"
                  minLength={6}
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  value={formData.password}
                  placeholder="········"
                  required
                />
              </div>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
