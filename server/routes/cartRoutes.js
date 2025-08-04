const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart.model");

router.post("/", async (req, res) => {
  const { user_id = null, anonymous_user_id = null } = req.body;

  if (!user_id && !anonymous_user_id) {
    return res.status(400).json({
      error:
        "user_id et anonymous_user_id ne peuvent pas être tous les deux null",
    });
  }

  try {
    const newCart = new Cart({
      user_id,
      anonymous_user_id,
    });
    const cart = await newCart.save();

    res.status(201).json({
      message: "Panier créé avec succès",
      cart: {
        id: cart.id,
        user_id: cart.user_id,
        anonymous_user_id: cart.anonymous_user_id,
        created_at: cart.created_at,
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
    const allCarts = await Cart.find();
    if (!allCarts || allCarts.length === 0) {
      return res.status(404).json({
        error: "Il n'y a pas de paniers",
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
