const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const reviewUtils = require("../utils/reviewApiUtils");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  const { user_id, product_id, rating } = req.body;
  const isValid = reviewUtils.checkInput(req);
  if (!isValid) {
    return res.status(400).json({
      error:
        "Données invalides - user_id, product_id et rating (1-5) sont obligatoires",
    });
  }

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(400).json({
        error: "L'utilisateur n'existe pas",
      });
    }

    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(400).json({
        error: "Le produit n'existe pas",
      });
    }

    const existingReview = await Review.findOne({ user_id, product_id });
    if (existingReview) {
      return res.status(400).json({
        error: "Vous avez déjà laissé une review pour ce produit",
      });
    }

    const newReview = new Review({
      user_id,
      product_id,
      rating,
    });
    const review = await newReview.save();

    res.status(201).json({
      message: "Review créée avec succès",
      review: {
        id: review.id,
        user_id: review.user_id,
        product_id: review.product_id,
        rating: review.rating,
        created_at: review.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de la review",
      details: error.message,
    });
  }
});

module.exports = router;
