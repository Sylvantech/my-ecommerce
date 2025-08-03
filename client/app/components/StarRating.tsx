import React, { useEffect, useState } from "react";
import { Star, StarHalf, Star as StarEmpty } from "lucide-react";
import { fetchRating } from "../services/ratingService";
import type { StarRatingProps } from "../types/star";

interface RatingData {
  reviews: Array<any>;
  count: number;
  average: number;
}

const StarRating = ({ productId, size = 24 }: StarRatingProps) => {
  const [ratingData, setRatingData] = useState<RatingData>({
    reviews: [],
    count: 0,
    average: 0,
  });

  useEffect(() => {
    const loadRating = async () => {
      const data = await fetchRating(productId);
      setRatingData(data);
    };

    loadRating();
  }, [productId]);

  const { average, count } = ratingData;
  const fullStars = Math.floor(average);
  const decimalPart = average - fullStars;
  const hasHalfStar = decimalPart >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Étoiles */}
      <div style={{ display: "flex", gap: 4 }}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={size} fill="#facc15" stroke="#facc15" />
        ))}
        {hasHalfStar && (
          <StarHalf key="half" size={size} fill="#facc15" stroke="#facc15" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarEmpty
            key={`empty-${i}`}
            size={size}
            fill="none"
            stroke="#d1d5db"
          />
        ))}
      </div>

      {/* Nombre d'avis */}
      <span style={{ fontSize: "14px", color: "#6b7280" }}>
        ({count} {count === 1 ? "avis" : "avis"})
      </span>
    </div>
  );
};

export default StarRating;
