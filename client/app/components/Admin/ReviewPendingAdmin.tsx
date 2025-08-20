import { useEffect, useState } from "react";
import { reviewServiceAdmin } from "~/services/admin/reviewService";

interface ReviewPendingAdminProps {
  searchReview?: string;
  refresh: number;
}

interface Review {
  _id: string;
  id: number;
  user_id: {
    _id: string;
    username: string;
  };
  product_id: {
    _id: string;
    title: string;
  };
  rating: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function ReviewPendingAdmin({
  searchReview,
  refresh,
}: ReviewPendingAdminProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const getReviews = async () => {
    try {
      setLoading(true);
      const res = await reviewServiceAdmin.getPendingReview();
      if (res.success) {
        setReviews(res.data);
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: number) => {
    try {
      const res = await reviewServiceAdmin.verifyReview(id);
      if (res.success) {
        await getReviews();
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error("Error verifying review:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await reviewServiceAdmin.deleteReview(id);
      if (res.success) {
        await getReviews();
      } else {
        console.error(res.error);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    getReviews();
  }, [refresh]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  const filtered = (reviews || []).filter(
    review =>
      review.product_id?.title
        ?.toLowerCase()
        .includes((searchReview || "").toLowerCase()) ||
      review.user_id?.username
        ?.toLowerCase()
        .includes((searchReview || "").toLowerCase()) ||
      review.content?.toLowerCase().includes((searchReview || "").toLowerCase())
  );

  const displayedReviews = searchReview ? filtered : reviews || [];

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-around gap-4 mb-6">
        <div className="px-6 py-4 flex flex-col justify-center bg-white border border-gray-200 rounded-xl w-full shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-gray-600 text-sm font-medium uppercase tracking-wide">
            Total Reviews en attente
          </h2>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {(reviews || []).length}
          </p>
        </div>
      </div>

      {(reviews || []).length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucune review en attente
          </h3>
          <p className="text-gray-500">
            Il n&apos;y a actuellement aucune review en attente de validation.
          </p>
        </div>
      ) : displayedReviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-400"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M21 21l-4.35-4.35"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Aucun résultat trouvé
          </h3>
          <p className="text-gray-500">
            Aucune review ne correspond à votre recherche "{searchReview}".
          </p>
        </div>
      ) : (
        displayedReviews.map(review => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 mb-4 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Produit : {review.product_id.title}
                    </h3>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          viewBox="0 0 24 24"
                        >
                          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                        </svg>
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-600">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Par : {review.user_id.username}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      Créée :{" "}
                      {new Date(review.created_at).toLocaleDateString("fr-FR")}
                    </span>
                    <span>•</span>
                    <span>ID: {review.id}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => handleVerify(review.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20,6 9,17 4,12"></polyline>
                  </svg>
                  Valider
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" x2="6" y1="6" y2="18"></line>
                    <line x1="6" x2="18" y1="6" y2="18"></line>
                  </svg>
                  Refuser
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
