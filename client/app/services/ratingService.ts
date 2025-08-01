export const fetchAverageRating = async (
  productId: number
): Promise<number> => {
  try {
    const res = await fetch(`http://localhost:3000/api/review/${productId}`);
    if (!res.ok) {
      throw new Error("Échec du fetch des reviews");
    }
    const data = await res.json();
    return data.average;
  } catch (error) {
    console.error("Erreur fetchAverageRating:", error);
    return 0;
  }
};
