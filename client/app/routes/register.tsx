import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export function meta() {
  return [
    { title: "Register - E-commerce" },
    { name: "description", content: "Register" },
  ];
}

interface FormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const [formData, setFormData] = useState<FormData>({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData)
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const copyFormData = {...formData}
        copyFormData[e.target.name as keyof FormData] = e.target.value
        setFormData(copyFormData)
    }

    return (
        <div className="">
            <h1 className="flex justify-center p-10 text-2xl">Inscription</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
                <label htmlFor="userName">Nom d&apos;utilisateur</label>
                <input type="text" id="userName" value={formData.userName} onChange={handleChange} className="border-gray-300 border p-3 rounded-sm  w-sm" name="userName" placeholder="utilisateur123"/>
                <label htmlFor="email">Email</label>
                <input value={formData.email} onChange={handleChange} className="border-gray-300 border p-3 rounded-sm  w-sm" type="email" name="email" id="email" placeholder="votre@email.com"/>
                <label htmlFor="password">Mot de passe</label>
                <input minLength={6} value={formData.password} onChange={handleChange} className="border-gray-300 border p-3 rounded-sm  w-sm" type="password" name="password" id="password" placeholder="....."/>
                <label  htmlFor="confirmPassword">Confirmer le mot de passe</label>
                <input minLength={6} value={formData.confirmPassword} onChange={handleChange} className="border-gray-300 border p-3 rounded-sm  w-sm" type="password" name="confirmPassword" id="confirmPassword" placeholder="....."/>
                <button className="border bg-black text-white w-sm p-3 font-bold rounded-lg">S&apos;inscrire</button>
            </form>
        </div>
    )
}