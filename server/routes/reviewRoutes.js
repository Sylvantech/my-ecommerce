const express = require("express");
const router = express.Router();
const Review = require("../models/Review.model");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const reviewUtils = require("../utils/reviewApiUtils");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyToken, async (req, res) => {
  const { user_id, product_id, rating, content } = req.body;
  const isValid = reviewUtils.checkInput(req);
  if (!isValid) {
    return res.status(400).json({
      error:
        "Données invalides - user_id, product_id et rating (1-5) sont obligatoires",
    });
  }

  const badWord = reviewUtils.checkObsenity(content);

  if (badWord) {
    return res.status(666).json({
      error: "Votre message contient un langague non approprié",
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
      content,
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
        content: review.content,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de la review",
      details: error.message,
    });
  }
});

router.get("/productReview/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({
        error: "le produit n'existe pas",
      });
    }

    const reviews = await Review.find({
      product_id: product._id,
      verified: true,
    })
      .populate("user_id", "-password")
      .populate("product_id");

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        error: "Aucune review trouvée pour ce produit",
      });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return res.status(200).json({
      reviews: reviews,
      average: parseFloat(averageRating.toFixed(2)),
      count: reviews.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des reviews",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ verified: true })
      .populate("user_id", "-password")
      .populate("product_id");

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        error: "Aucune review trouvée",
      });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    return res.status(200).json({
      reviews: reviews,
      averageRating: parseFloat(averageRating.toFixed(2)),
      totalReviews: reviews.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des reviews",
      details: error.message,
    });
  }
});

router.get("/pending", verifyAdmin, async (req, res) => {
  try {
    const review = await Review.find({ verified: false })
      .populate("user_id", "-password")
      .populate("product_id");

    if (!review) {
      return res.status(404).json({
        error: "Aucune review en attente",
      });
    }

    return res.status(200).json({
      review: review,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des review",
      details: error.message,
    });
  }
});

router.patch("/", verifyAdmin, async (req, res) => {
  const { id, rating, verified } = req.body;

  const isValid = reviewUtils.checkUpdateInput(req);

  if (!isValid) {
    return res.status(400).json({
      error: "Données invalides - ID et rating (1-5) sont requis",
    });
  }

  try {
    const review = await Review.findOne({ id: id });

    if (!review) {
      return res.status(404).json({
        error: "Review non trouvée",
      });
    }

    if (rating !== undefined) {
      review.rating = rating;
    }

    if (verified !== undefined) {
      review.verified = verified;
    }

    await review.save();

    res.status(200).json({
      message: "Review mise à jour avec succès",
      review: {
        id: review.id,
        user_id: review.user_id,
        product_id: review.product_id,
        rating: review.rating,
        content: review.content,
        verified: review.verified,
        updated_at: review.updated_at,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour de la review",
      details: error.message,
    });
  }
});

router.delete("/", verifyAdmin, async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "Veuillez fournir un ID de review valide",
    });
  }

  try {
    const review = await Review.findOne({ id: id });
    if (!review) {
      return res.status(404).json({
        error: "Cette review n'existe pas",
      });
    }

    await Review.findOneAndDelete({ id: id });

    res.status(200).json({
      message: "Review supprimée avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression de la review",
      details: error.message,
    });
  }
});

module.exports = router;
