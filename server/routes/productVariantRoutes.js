const express = require("express");
const router = express.Router();
const ProductVariant = require("../models/ProductVariant.model");
const Product = require("../models/Product.model");
const ProductColor = require("../models/ProductColor.model");
const ProductSize = require("../models/ProductSize.model");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", async (req, res) => {
  const { product_id, color_id, size_id, src, stock, available } = req.body;

  const product = await Product.findById(product_id);
  if (product === null) {
    return res.status(400).json({ error: "Produit non trouvé" });
  }

  const color = await ProductColor.findById(color_id);
  if (color === null) {
    return res.status(400).json({ error: "Couleur non trouvée" });
  }

  const size = await ProductSize.findById(size_id);
  if (size === null) {
    return res.status(400).json({ error: "Taille non trouvée" });
  }

  if (!src) {
    return res.status(400).json({ error: "Le champ src est requis" });
  }

  try {
    const newVariant = new ProductVariant({
      product_id: product._id,
      color_id: color._id,
      size_id: size._id,
      src,
      stock,
      available,
    });
    await newVariant.save();
    res.status(201).json({ message: "Variant créé avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la création du variant.",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  const { limit } = req.body;
  try {
    const query = ProductVariant.find()
      .populate("product_id")
      .populate("color_id")
      .populate("size_id");
    if (limit && limit > 0) query.limit(limit);
    const variants = await query.exec();
    if (!variants || variants.length === 0) {
      return res.status(404).json({ error: "Aucun variant trouvé" });
    }
    res.status(200).json({ variants });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des variants",
      details: error.message,
    });
  }
});

router.get("/:productId", async (req, res) => {
  const productId = req.params.productId;

  const product = await Product.findOne({ id: productId });

  try {
    const variants = await ProductVariant.find({ product_id: product._id })
      .populate("product_id")
      .populate("color_id")
      .populate("size_id");
    if (!variants || variants.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun variant trouvé pour ce produit", product });
    }
    res.status(200).json({ variants });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la récupération des variants",
      details: error.message,
    });
  }
});

router.patch("/", verifyAdmin, async (req, res) => {
  const { id, product_id, color_id, size_id, src, stock, available } = req.body;
  try {
    const variant = await ProductVariant.findOne({ id });
    if (!variant) return res.status(404).json({ error: "Variant non trouvé" });

    if (product_id !== undefined) variant.product_id = product_id;
    if (color_id !== undefined) variant.color_id = color_id;
    if (size_id !== undefined) variant.size_id = size_id;
    if (src !== undefined) variant.src = src;
    if (stock !== undefined) variant.stock = stock;
    if (available !== undefined) variant.available = available;

    await variant.save();
    res.status(200).json({ message: "Variant mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du variant",
      details: error.message,
    });
  }
});

router.delete("/", verifyAdmin, async (req, res) => {
  const id = req.body.id;
  if (!id)
    return res
      .status(400)
      .json({ error: "Veuillez fournir un ID de variant valide" });

  const variantExists = await ProductVariant.findOne({ id });
  if (!variantExists)
    return res.status(404).json({ error: "Ce variant n'existe pas" });

  try {
    await ProductVariant.findOneAndDelete({ id });
    res.status(200).json({ message: "Variant supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la suppression du variant",
      details: error.message,
    });
  }
});

module.exports = router;
