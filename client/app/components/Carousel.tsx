import ProductCard from "./ProductCard";
import { useState } from "react";


export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const data = [
        <ProductCard key={0} />,
        <ProductCard key={1} name={"Chausette"} />,
        <ProductCard key={2} name={"Socket"} />,
    ];

    const handleNext = () => {
        if (currentIndex === data.length - 1) {
            setCurrentIndex(0)
        }
        if (data[currentIndex + 1]) {
            data[currentIndex] = data[currentIndex + 1]
        }
        else {
            data[0] = data[currentIndex];
        }

    }

    const handlePrev = () => {
        if (currentIndex === 0) {
            setCurrentIndex(data.length - 1)
        }
    }


    return (
        <div className="flex justify-center mt-32">
            <button onClick={handlePrev}>Précédent</button>
            {data}
            <button onClick={handleNext}>Suivant</button>
        </div>
    )
}