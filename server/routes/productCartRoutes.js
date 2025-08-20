const express = require("express");
const router = express.Router();
const ProductCart = require("../models/ProductCart.model");
const Cart = require("../models/Cart.model");
const ProductVariant = require("../models/ProductVariant.model");

router.post("/", async (req, res) => {
  const { cart_id, variant_id, quantity = 1 } = req.body;

  const qty = Math.max(1, Number(quantity) || 1);

  if (!cart_id || !variant_id) {
    return res.status(400).json({
      error: "cart_id et variant_id sont requis !",
    });
  }

  try {
    const [cart, variant] = await Promise.all([
      Cart.findById(cart_id),
      ProductVariant.findById(variant_id),
    ]);

    if (!cart) {
      return res.status(400).json({
        error: "l'id du panier est incorrect !",
      });
    }

    if (!variant) {
      return res.status(400).json({
        error: "l'id de la variante est incorrect !",
      });
    }

    const productObjectId = variant.product_id;

    let productCart = await ProductCart.findOne({
      cart_id,
      variant_id: variant._id,
    });

    if (productCart) {
      productCart.quantity += qty;
      await productCart.save();
      return res.status(200).json({
        message: "Quantité de la variante augmentée dans le panier",
        cart_product: productCart,
      });
    } else {
      productCart = new ProductCart({
        cart_id,
        product_id: productObjectId,
        variant_id: variant._id,
        quantity: qty,
      });
      await productCart.save();
      return res.status(201).json({
        message: "Variante ajoutée au panier avec succès",
        cart_product: productCart,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de l'ajout de la variante au panier",
      details: error.message,
    });
  }
});

router.post("/getByCartId", async (req, res) => {
  const { cart_id } = req.body;
  if (!cart_id) {
    return res.status(400).json({
      error: "cart_id requis",
    });
  }
  try {
    const productCarts = await ProductCart.find({ cart_id: cart_id }).populate([
      { path: "product_id" },
      {
        path: "variant_id",
        populate: [{ path: "color_id" }, { path: "size_id" }],
      },
    ]);

    if (productCarts.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun produit trouvé pour ce panier" });
    }
    res.status(200).json({ cart_products: productCarts });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des produits du panier",
      details: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  const { id, quantity } = req.body;

  const qty = Math.max(1, Number(quantity) || 1);

  if (!id || quantity === undefined) {
    return res.status(400).json({
      error: "id et quantity sont requis",
    });
  }

  try {
    const productCart = await ProductCart.findByIdAndUpdate(
      id,
      { quantity: qty },
      { new: true }
    );
    if (!productCart) {
      return res
        .status(404)
        .json({ error: "Produit non trouvé dans le panier" });
    }
    res.status(200).json({
      message: "Quantité mise à jour avec succès",
      cart_product: productCart,
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du produit du panier",
      details: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({
      error: "id requis",
    });
  }
  try {
    const productCart = await ProductCart.findByIdAndDelete(id);
    if (!productCart) {
      return res
        .status(404)
        .json({ error: "Produit non trouvé dans le panier" });
    }
    res.status(200).json({ message: "Produit supprimé du panier avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du produit du panier",
      details: error.message,
    });
  }
});

module.exports = router;
