import React, { useEffect, useState } from "react";
import { Star, StarHalf, Star as StarEmpty } from "lucide-react";
import { fetchAverageRating } from "../services/ratingService";
import type { StarRatingProps } from "../types/star";

const StarRating = ({ productId, size = 24 }: StarRatingProps) => {
  const [average, setAverage] = useState<number>(0);

  useEffect(() => {
    fetchAverageRating(productId).then(setAverage);
  }, [productId]);

  const fullStars = Math.floor(average);
  const decimalPart = average - fullStars;
  const hasHalfStar = decimalPart >= 0.25;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
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
  );
};

export default StarRating;
