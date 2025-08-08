const express = require("express");
const router = express.Router();
const ProductSize = require("../models/ProductSize.model");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, async (req, res) => {
  const { eu_size, label } = req.body;

  if (
    typeof eu_size !== "string" ||
    eu_size.length > 10 ||
    eu_size.length < 2
  ) {
    return res.status(400).json({
      error: "Format de la taille EU incompatible",
    });
  }
  if (label && (typeof label !== "string" || label.length > 10)) {
    return res.status(400).json({
      error: "Format du label incompatible",
    });
  }

  try {
    const newProductSize = new ProductSize({
      eu_size,
      label: label || null,
    });
    const productSize = await newProductSize.save();

    res.status(201).json({
      message: "Taille de produit créée avec succès",
      productSize: {
        id: productSize.id,
        eu_size: productSize.eu_size,
        label: productSize.label,
        created_at: productSize.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de la taille du produit",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const productSizes = await ProductSize.find();
    res.status(200).json({
      productSizes: productSizes,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des tailles de produit",
      details: error.message,
    });
  }
});

router.get("/:productSizeId", async (req, res) => {
  const productSizeId = Number(req.params.productSizeId);

  try {
    const foundProductSize = await ProductSize.findOne({ id: productSizeId });
    if (!foundProductSize) {
      return res.status(404).json({
        error: "La taille de produit n'a pas été trouvée",
      });
    }

    return res.status(200).json({
      productSize: foundProductSize,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération de la taille du produit",
      details: error.message,
    });
  }
});

module.exports = router;
