interface RatingData {
  reviews: Array<any>;
  count: number;
  average: number;
}

export const fetchRating = async (productId: number): Promise<RatingData> => {
  try {
    const res = await fetch(`http://localhost:3000/api/product/getReview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: productId }),
    });

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
