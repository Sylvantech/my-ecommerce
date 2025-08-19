const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  const { user_id = null, anonymous_user_id = null } = req.body;

  if (!user_id && !anonymous_user_id) {
    return res.status(400).json({
      error:
        "user_id et anonymous_user_id ne peuvent pas être tous les deux null",
    });
  }

  if (user_id) {
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({
        error: "Format d'ID utilisateur invalide",
      });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }
  }

  const searchConditions = [];

  if (user_id) {
    searchConditions.push({ user_id: user_id });
  }

  if (anonymous_user_id) {
    searchConditions.push({ anonymous_user_id: anonymous_user_id });
  }

  const cart = await Cart.findOne({
    $or: searchConditions,
  });

  if (cart) {
    return res.status(400).json({
      error:
        "Un panier existe déjà pour cet utilisateur ou cet utilisateur anonyme",
      cart: cart,
    });
  }

  try {
    const newCart = new Cart({
      user_id,
      anonymous_user_id,
    });
    const savedCart = await newCart.save();

    res.status(201).json({
      message: "Panier créé avec succès",
      cart: {
        _id: savedCart._id,
        id: savedCart.id,
        user_id: savedCart.user_id,
        anonymous_user_id: savedCart.anonymous_user_id,
        created_at: savedCart.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création du panier",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allCarts = await Cart.find().populate({
      path: "user_id",
    });
    if (!allCarts || allCarts.length === 0) {
      return res.status(404).json({
        error: "Il n'y a pas de paniers",
        carts: [],
      });
    }
    return res.status(200).json({
      carts: allCarts,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des paniers",
      details: error.message,
    });
  }
});

router.post("/getById", async (req, res) => {
  const id = req.body.id;
  try {
    const cart = await Cart.findOne({ _id: id });
    if (!cart) {
      return res.status(404).json({
        error: "Le panier n'a pas été trouvé",
      });
    }
    return res.status(200).json({
      cart: cart,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération du panier",
      details: error.message,
    });
  }
});

router.put("/", verifyAdmin, async (req, res) => {
  const { id, user_id, anonymous_user_id } = req.body;
  if (!id) {
    return res.status(400).json({
      error: "Veuillez fournir un ID de panier valide",
    });
  }

  const updateData = {};
  if (user_id !== undefined) {
    updateData.user_id = user_id;
  }
  if (anonymous_user_id !== undefined) {
    updateData.anonymous_user_id = anonymous_user_id;
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });
    if (!updatedCart) {
      return res.status(404).json({
        error: "Le panier n'a pas été trouvé",
      });
    }
    return res.status(200).json({
      message: "Panier mis à jour avec succès",
      cart: updatedCart,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la mise à jour du panier",
      details: error.message,
    });
  }
});

router.delete("/", verifyAdmin, async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({
      error: "Veuillez fournir un ID de panier valide",
    });
  }
  const cartExists = await Cart.findOne({ _id: id });
  if (!cartExists) {
    return res.status(404).json({
      error: "Ce panier n'existe pas",
    });
  }
  try {
    await Cart.findOneAndDelete({ _id: id });
    res.status(200).json({
      message: "Panier supprimé avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression du panier",
      details: error.message,
    });
  }
});

module.exports = router;
