import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
//import { authService } from "~/services/authService";
//import { setToken } from "../utils/cookieHelper";

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
  //const [messageError, setMessageError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /*const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await authService.login(formData);

    if (result.success && result.data) {
      setToken(result.data.token);
    } else {
      setMessageError(result.error);
      setMessageSuccess("");    
    }
  };*/

  return (
    <div>
      <h1 className="flex justify-center p-10 text-2xl">Connexion</h1>
      <form
        className="flex flex-col items-center gap-5"
        //onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input
          className="border-gray-300 border p-3 rounded-sm  w-sm"
          onChange={handleChange}
          value={formData.email}
          type="email"
          name="email"
          id="email"
          placeholder="votre@email.com"
          required
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          className="border-gray-300 border p-3 rounded-sm  w-sm"
          minLength={6}
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="....."
          required
        />
        <button className="mt-10 border bg-black text-white w-sm p-3 font-bold rounded-lg">
          Se connecter
        </button>
      </form>
    </div>
  );
}
