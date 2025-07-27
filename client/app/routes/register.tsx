import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
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
    <div className="">
      <h1 className="flex justify-center p-10 text-2xl">Inscription</h1>
      {messageError && (
        <div className="text-red-500 text-center mb-4">{messageError}</div>
      )}
      {messageSuccess && (
        <div className="text-green-500 text-center mb-4">{messageSuccess}</div>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5"
      >
        <label htmlFor="username">Nom d&apos;utilisateur</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={handleChange}
          className="border-gray-300 border p-3 rounded-sm  w-sm"
          name="username"
          placeholder="utilisateur123"
        />
        <label htmlFor="email">Email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          className="border-gray-300 border p-3 rounded-sm  w-sm"
          type="email"
          name="email"
          id="email"
          placeholder="votre@email.com"
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          className="border-gray-300 border p-3 rounded-sm  w-sm"
          type="password"
          name="password"
          id="password"
          placeholder="....."
        />
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <input
          minLength={6}
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="border-gray-300 border p-3 rounded-sm  w-sm"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="....."
        />
        <button className="border bg-black text-white w-sm p-3 font-bold rounded-lg">
          S&apos;inscrire
        </button>
      </form>
    </div>
  );
}
