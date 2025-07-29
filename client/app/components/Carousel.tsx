import ProductCard from "./ProductCard";

export default function Carousel() {
    
    return (
        <div className="flex justify-center mt-32">
            <button>Précédent</button>
            <ProductCard />
            <ProductCard name={"Chausette"} />
            <ProductCard name={"Socket"} />
            <button>Suivant</button>
            
        </div>
    )
}