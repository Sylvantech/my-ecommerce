import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { authService } from "~/services/authService";

export function meta() {
  return [
    { title: "Register - E-commerce" },
    { name: "description", content: "Register" },
  ];
}

interface FormData {
  username: string;
  email: string;
  password: string;
}

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setMessageError("Les mots de passe ne correspondent pas");
      setMessageSuccess("");
      return;
    }

    const result = await authService.register(formData);

    if (result.success) {
      setMessageError("");
      setMessageSuccess("Inscription réussie !");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setMessageError(result.error || "Une erreur est survenue");
      setMessageSuccess("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const copyFormData = { ...formData };
    copyFormData[e.target.name as keyof FormData] = e.target.value;
    setFormData(copyFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* En-tête avec emoji et titre */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Rejoignez l&#39;Aventure !
          </h1>
          <p className="text-gray-600 text-lg">
            Créez votre compte et commencez à personnaliser vos chaussettes
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
            {/* Champ Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 font-semibold mb-3 text-base"
              >
                Pseudo
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700 text-sm placeholder-gray-400"
                  onChange={handleChange}
                  value={formData.username}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="jeanDupont"
                  required
                />
              </div>
            </div>
            {/* Champ Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-3 text-base"
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
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700 text-sm placeholder-gray-400"
                  onChange={handleChange}
                  value={formData.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="jean.dupont@email.com"
                  required
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-3 text-base"
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
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700 text-sm placeholder-gray-400"
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

            {/* Champ Confirmer Mot de passe */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-semibold mb-3 text-base"
              >
                Confirmer le Mot de Passe
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
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-colors text-gray-700 text-sm placeholder-gray-400"
                  minLength={6}
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="········"
                  required
                />
              </div>
            </div>

            {/* Bouton d'inscription */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
            >
              Créer mon Compte
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Vous avez déjà un compte ?{' '}
              <a
                href="/login"
                className="text-purple-600 hover:text-purple-700 font-semibold underline transition-colors"
              >
                Connectez-vous ici
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
