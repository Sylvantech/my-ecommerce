import type { Review } from "../types/review";

interface RatingData {
  reviews: Review[];
  count: number;
  average: number;
}

export const fetchRating = async (productId: number): Promise<RatingData> => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/review/productReview/${productId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("Échec du fetch des reviews");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erreur fetchRating:", error);
    return {
      reviews: [],
      count: 0,
      average: 0,
    };
  }
};

export const fetchAllRating = async (): Promise<{
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}> => {
  try {
    const res = await fetch(`http://localhost:3000/api/review/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Échec du fetch des reviews");
    }
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Erreur fetchAllRating:", error);
    return {
      reviews: [],
      averageRating: 0,
      totalReviews: 0,
    };
  }
};
