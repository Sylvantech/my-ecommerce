import { useEffect, useState } from "react";
import { fetchRating } from "~/services/ratingService";
import type { Review } from "~/types/review";
import type { Product } from "~/types/product";
import type { User } from "~/types/userlist";

interface PopulatedReview extends Omit<Review, "user_id" | "product_id"> {
  user_id: string | User;
  product_id: string | Product;
}

interface RatingData {
  reviews: PopulatedReview[];
  count: number;
  average: number;
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

const Star = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M10 15.27L16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z"
      clipRule="evenodd"
    />
  </svg>
);

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ratingData, setRatingData] = useState<RatingData>({
    reviews: [],
    count: 0,
    average: 0,
  });

  useEffect(() => {
    const loadReviews = async () => {
      if (!productId) return;

      try {
        setLoading(true);
        const data = await fetchRating(productId);

        setRatingData(data as RatingData);
        setError(null);
      } catch (err) {
        setError("Erreur lors du chargement des avis");
        console.error("Erreur lors du chargement des reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [productId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const calculateRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

    ratingData.reviews.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating as keyof typeof distribution]++;
      }
    });

    return distribution;
  };

  const ratingDistribution = calculateRatingDistribution();

  if (loading) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || ratingData.count === 0) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Avis sur ce produit
          </h3>
          <p className="text-gray-600">
            {error || "Aucun avis disponible pour ce produit"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Avis sur ce produit
          </h3>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-purple-200 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-5xl font-black text-purple-600 mb-2">
                  {ratingData.average.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(ratingData.average) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 font-medium">
                  {ratingData.count} avis
                </p>
              </div>

              <div className="flex-1 max-w-md">
                {[5, 4, 3, 2, 1].map(stars => (
                  <div key={stars} className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500"
                        style={{
                          width: `${ratingData.count > 0 ? (ratingDistribution[stars as keyof typeof ratingDistribution] / ratingData.count) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8 text-right">
                      {
                        ratingDistribution[
                          stars as keyof typeof ratingDistribution
                        ]
                      }
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {ratingData.reviews.map(review => (
            <Card
              key={review.id}
              className="bg-white/70 backdrop-blur-sm border-purple-200 hover:shadow-lg hover:bg-white/90 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
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
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-800">
                          {(() => {
                            if (
                              typeof review.user_id === "object" &&
                              review.user_id?.username
                            ) {
                              return review.user_id.username;
                            }
                            return `Client #${typeof review.user_id === "string" ? review.user_id : "Anonyme"}`;
                          })()}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {formatDate(review.created_at)}
                          </span>
                        </div>
                      </div>

                      {review.verified && (
                        <div className="flex items-center gap-1 text-green-600 text-sm font-medium mt-2 sm:mt-0">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Achat vérifié
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 leading-relaxed">
                      {review.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
