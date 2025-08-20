import { useEffect, useState } from "react";
import { fetchAllRating } from "~/services/ratingService";
import type { Review } from "~/types/review";

interface PopulatedReview extends Omit<Review, "user_id" | "product_id"> {
  user_id:
    | string
    | {
        _id: string;
        username: string;
        email: string;
        role: string;
        reduction: number;
        is_active: boolean;
        created_at: string;
        updated_at: string;
        id: string;
        __v: number;
      };
  product_id:
    | string
    | {
        _id: string;
        title: string;
        src: string;
        [key: string]: any;
      };
}

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className || ""}`}
  >
    {children}
  </div>
);

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-6 ${className || ""}`}>{children}</div>;

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${className || ""}`}
  >
    {children}
  </span>
);

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
      clipRule="evenodd"
    />
  </svg>
);

export default function HomeRating() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewsData, setReviewsData] = useState<{
    reviews: PopulatedReview[];
    averageRating: number;
    totalReviews: number;
  }>({
    reviews: [],
    averageRating: 0,
    totalReviews: 0,
  });

  useEffect(() => {
    const loadReviewsData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllRating();
        setReviewsData(data);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des avis");
        console.error("Erreur lors du chargement des reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviewsData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="relative z-10 py-16 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-200 rounded mx-auto w-64 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mx-auto w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mx-auto w-48"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || reviewsData.totalReviews === 0) {
    return (
      <section className="relative z-10 py-16 px-6 bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-black bg-gradient-to-r from-gray-600 to-gray-600 bg-clip-text text-transparent mb-4">
            Avis de nos clients
          </h3>
          <p className="text-gray-600">
            {error || "Aucun avis disponible pour le moment"}
          </p>
        </div>
      </section>
    );
  }

  const gradients = [
    "from-pink-100 to-rose-100 border-pink-200",
    "from-purple-100 to-violet-100 border-purple-200",
    "from-blue-100 to-cyan-100 border-blue-200",
    "from-green-100 to-emerald-100 border-green-200",
    "from-yellow-100 to-orange-100 border-yellow-200",
    "from-indigo-100 to-purple-100 border-indigo-200",
  ];

  return (
    <section className="relative z-10 py-16 px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Avis de nos clients
          </h3>
          <div className="flex items-center justify-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${i < Math.floor(reviewsData.averageRating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
            <span className="ml-2 text-xl font-bold text-gray-800">
              {reviewsData.averageRating.toFixed(1)}/5
            </span>
          </div>
          <p className="text-gray-600">
            Basé sur {reviewsData.totalReviews} avis vérifiés
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsData.reviews.slice(0, 6).map((review, index) => {
            const gradient = gradients[index % gradients.length];

            return (
              <Card
                key={review.id}
                className={`bg-gradient-to-br ${gradient} border-2 hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative">
                      {(() => {
                        if (
                          typeof review.product_id === "object" &&
                          review.product_id?.src
                        ) {
                          return (
                            <a href={`/product/${review.product_id.id}`}>
                              <img
                                src={review.product_id.src}
                                alt={review.product_id.title || "Produit"}
                                className="w-15 h-15 rounded-xl shadow-md object-cover"
                                onError={e => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = "none";
                                  const fallback =
                                    target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = "flex";
                                }}
                              />
                            </a>
                          );
                        }
                        return null;
                      })()}

                      <div
                        className="w-15 h-15 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-md flex items-center justify-center"
                        style={{
                          display:
                            typeof review.product_id === "object" &&
                            review.product_id?.src
                              ? "none"
                              : "flex",
                        }}
                      >
                        <span className="text-white font-bold text-lg">
                          {(() => {
                            if (
                              typeof review.user_id === "object" &&
                              review.user_id?.username
                            ) {
                              return review.user_id.username
                                .charAt(0)
                                .toUpperCase();
                            }
                            return typeof review.user_id === "string"
                              ? review.user_id.charAt(0).toUpperCase()
                              : "?";
                          })()}
                        </span>
                      </div>

                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="font-bold text-gray-800 text-sm">
                        {(() => {
                          if (
                            typeof review.user_id === "object" &&
                            review.user_id?.username
                          ) {
                            return review.user_id.username;
                          }
                          return `Client #${typeof review.user_id === "string" ? review.user_id : "Anonyme"}`;
                        })()}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3 font-medium">
                    "{review.content}"
                  </p>
                  <Badge className="bg-white/80 text-gray-700 border border-gray-200 text-xs font-medium">
                    {(() => {
                      if (
                        typeof review.product_id === "object" &&
                        review.product_id?.title
                      ) {
                        return review.product_id.title;
                      }
                      return `Produit #${typeof review.product_id === "string" ? review.product_id : "Inconnu"}`;
                    })()}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
