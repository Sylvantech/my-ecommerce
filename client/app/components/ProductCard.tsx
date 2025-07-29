import chaussetteImg from "../assets/mockup/test.webp";

const ProductCard = () => {
  return (
    <section id="catalogue" className="p-5">
      <div className="bg-white w-90 hover:bg-violet-100 transition duration-300 rounded-lg p-1 shadow-lg cursor-pointer">
        <div
          id="image"
          className="relative w-88 h-85 bg-center rounded-t-lg bg-cover"
          style={{ backgroundImage: `url(${chaussetteImg})` }}
        >
          <div className="absolute top-2 left-2 bg-white px-2 py-1 ring-2 ring-gray-300 rounded-xl text-xs font-baloo font-semibold text-black shadow-sm">
            ✨Les Originales
          </div>
        </div>
        <div className="ml-3 mr-3">
          <h2 className="text-purple-800 text-xl font-baloo font-bold mt-3 truncate">
            Poutou en Gants
          </h2>
          <h3 className="text-black text-sm font-baloo mt-2 line-clamp-2">
            Car même vos pieds méritent d&aposêtre au chaud, adoptez les gants
            pour pied !
          </h3>
          <div className="flex justify-between mb10 items-center mb-3 -mt-3 pt-4">
            <div className="flex flex-col">
              <span className="text-purple-800 font-extrabold text-xl font-baloo">
                15€99
              </span>
            </div>
            <button className="text-white font-semibold text-sm px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 shadow-md hover:scale-105 transition-transform">
              Voir
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
