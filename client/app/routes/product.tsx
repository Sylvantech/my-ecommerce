import { useState } from "react";




export function meta() {
    return [
        { title: "Login - E-commerce" },
        { name: "product", content: "Product" },
    ];
}

export default function Product() {
    const [quantity, setQuantity] = useState(1);

    const handleSoustraction = (e) => {
        console.log(e.target.value)
    }

    const handleAddition = (e) => {
        console.log(e.target.value)
    }
    
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="flex flex-row mb-8">
                <button className="bg-gray-100 w-35 h-10 text-gray-400">Produit</button>
                <button className="bg-gray-100 w-35 h-10 text-gray-400">Avis ({ })</button>
            </div>
            <div className="space-y-4">
                <p className="flex items-center justify-center absolute left-4 top-40 text-xs bg-yellow-400 rounded-full w-22 h-6 font-extrabold border-none">✨ Bestseller</p>
                <img src="" alt="" height={500} width={500} className="bg-gray-100 rounded-4xl shadow-lg" />
                <div className="flex space-x-3 justify-center">
                    <img src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg" />
                    <img src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg" />
                    <img src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg" />
                    <img src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg" />
                </div>
            </div>
            <div className="space-y-6 flex flex-col items-center">
                <h1 className="text-3xl mt-7 mb-4 self-start ml-5">Chaussettes Arc-en-ciel Prenium</h1>
                {/* REMPLACER PAR LE composant des étoiles */}
                <div className="flex flex-row self-start ml-5">
                    <p className="text-purple-700 text-3xl mt-4 mb-4">12.99€</p>
                    {/* REMPLACER PAR LE COMPOSANT "AJOUTER UN AVIS" */}
                </div>
                <section className="w-90 bg-pink-50 p-5 space-y-4 border border-pink-200 rounded-lg">
                    <h2 className="text-purple-700 text-lg">À Propos de ce Produit</h2>
                    <p className="text-gray-700 leading-relaxed">Cette collection exclusive a été développée par notre équipe de designers pour offrir un parfait équilibre entre style, confort et durabilité. Chaque paire est soigneusement confectionnée pour vous accompagner dans votre quotidien.</p>
                </section>
                <div className="self-start ml-5 space-y-6">
                    <h3>Caractéristiques :</h3>
                    <div className="flex flex-row text-sm text-gray-700">
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-sm">🌈 Design coloré unique</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-sm">✨ Matière ultra-douce en coton bio</span>
                        </div>
                    </div>
                    <div className="flex flex-row text-sm text-gray-700">
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-sm">🧵 Coutures renforcées</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-700">
                            <span className="text-sm">🎨 Création exclusive SockLand</span>
                        </div>
                    </div>
                </div>
                <div className="self-start ml-5 space-y-4 ">
                    <h3>Couleur :</h3>
                    <div className="flex flex-row items-center space-x-3">
                        <div className="w-12 h-12 border border-white rounded-lg shadow-lg"></div>
                        <p className="text-gray-700">Arc-en-Ciel Classique</p>
                    </div>
                </div>
                <div className="self-start ml-5 space-y-4 ">
                    <h3>Taille :</h3>
                    <select className="bg-white p-2 w-90 rounded-lg border-2 border-gray-200 text-sm" name="" id="">
                        <option value="">Choisissez votre taille</option>
                    </select>
                </div>
                <div className="self-start ml-5 space-y-4">
                    <h3>Quantité :</h3>
                    <div className="space-x-5 flex flex-row items-center">
                        <button className="bg-white h-10 w-10 rounded-full" onClick={handleSoustraction}>-</button>
                        <p>{quantity}</p> 
                        <button className="bg-white h-10 w-10 rounded-full" onClick={handleAddition}>+</button>
                    </div>
                </div>
            </div>
        </div>

    )
}