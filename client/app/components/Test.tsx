import React from "react";
import StarRating from "./StarRating";

const product = {
  id: "p1",
  name: "Produit 1",
  reviews: [
    { rating: 1 },
    { rating: 4 },
    { rating: 3 },
    { rating: 4 },
  ],
};

export default function Test() {
  return <StarRating reviews={product.reviews} />;
}