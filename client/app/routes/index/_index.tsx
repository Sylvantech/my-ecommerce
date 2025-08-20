import Carousel from "~/components/Carousel";
import Header from "~/components/Header";
import HomeRating from "~/components/HomeRating";

export default function Index() {
  return (
    <div>
      <Header />
      <Carousel />

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Ce que disent nos clients
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Découvrez les avis de nos clients satisfaits et la qualité de nos
            produits
          </p>
        </div>
        <HomeRating />
      </section>
    </div>
  );
}
