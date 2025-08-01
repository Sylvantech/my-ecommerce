import ProductsCard from "~/components/Products/ProductsCard";




export function meta() {
    return [
        { title: "Login - E-commerce" },
        { name: "product", content: "Product" },
    ];
}

export default function Product() {
    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="flex flex-row mb-8">
                <button className="bg-gray-100 w-35 h-10 text-gray-400">Produit</button>
                <button className="bg-gray-100 w-35 h-10 text-gray-400">Avis ({})</button>
            </div>
            <div className="space-y-4">
                <p className="flex items-center justify-center absolute left-4 top-40 text-xs bg-yellow-400 rounded-full w-22 h-6 font-extrabold border-none">✨ Bestseller</p>
                <img src="" alt="" height={500} width={500} className="bg-gray-100 rounded-4xl shadow-lg" />
                <div className="flex space-x-3 justify-center">
                <img  src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg"/>
                <img  src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg"/>
                <img  src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg"/>
                <img  src="" alt="" height={80} width={80} className="bg-gray-100 rounded-xl shadow-lg"/>
                </div>
            </div>
            <div className="space-y-6">
            <h1 className="text-3xl mt-7 mb-4">Chaussettes Arc-en-ciel Prenium</h1>
            </div>
        </div>

    )
}