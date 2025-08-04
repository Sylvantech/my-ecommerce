import { useState } from "react";

export default function CartProduct({ name = "Chaussettes Arc-en-ciel Magique",
    color = "Blue",
    size = "38-40",
    stock = 6,
    price = "20€" })
    {
        const [quantity, setQuantity] = useState(1)

        const handleAddition = () => {
            if (quantity !== stock) {
                setQuantity(quantity +1);
            }
        }

        const handleSoustraction = () => {
            if (quantity !== 0) {
                setQuantity(quantity -1);
            }
        }

    return (
        <div className="bg-black h-full flex justify-center">

            <div className="bg-white w-85 h-100 sm:w-220 rounded-3xl flex flex-col justify-evenly">
                <div className="flex flex-col justify-center sm:flex-row sm:justify-around">

                    <div className="flex flex-col items-center sm:flex-row gap-3 mb-5">
                        <img src="" alt="Image du produit ajouté au panier" width={100} height={100} className="bg-gray-100 rounded-2xl" />
                        <div className="sm:flex sm:flex-col space-y-2">
                            <p className="text-lg">{name}</p>
                            <div className="sm:flex sm:flex-row gap-5 sm:items-center">
                                <p className="text-gray-600 text-sm">Couleur:<span className="text-gray-900 ml-2">{color}</span></p>
                                <p className="flex justify-center items-center"><span className="text-gray-600 text-sm">Taille: </span> <span className="ml-2 px-2 py-1 border border-gray-200 rounded-full text-xs">{size}</span></p>
                            </div>
                            <p className="text-purple-700 text-xl sm:text-2xl">{price}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5 ml-5">
                        <button className="bg-white rounded-full border border-gray-300 w-10 h-10" onClick={handleSoustraction}>-</button>
                        <p className="text-xl">{quantity}</p>
                        <button className="bg-white rounded-full border border-gray-300 w-10 h-10" onClick={handleAddition}>+</button>
                        <button><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-4 h-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
                    </div>

                </div>

                <div className="flex flex-col">
                    <hr className="text-gray-200" />
                    <div className="flex justify-around items-center mt-5">
                        <p className="text-gray-600 text-sm">Sous-total pour cet article:</p>
                        <p className="text-purple-700 text-xl sm:text-3xl">{price}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}