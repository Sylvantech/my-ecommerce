const express = require("express");
const router = express.Router();
const ProductColor = require("../models/ProductColor.model");

router.post("/", async (req, res) => {
  const { name, hex_code } = req.body;

  if (typeof name !== "string" || name.length < 1 || name.length > 100) {
    return res.status(400).json({
      error: "Format du nom de couleur incompatible",
    });
  }
  if (hex_code && (typeof hex_code !== "string" || hex_code.length > 7)) {
    return res.status(400).json({
      error: "Format du code hexadécimal incompatible",
    });
  }

  try {
    const newProductColor = new ProductColor({
      name: name.trim(),
      hex_code: hex_code ? hex_code.trim() : "",
    });
    const productColor = await newProductColor.save();

    res.status(201).json({
      message: "Couleur de produit créée avec succès",
      productColor: {
        id: productColor.id,
        name: productColor.name,
        hex_code: productColor.hex_code,
        created_at: productColor.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de la couleur du produit",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const productColors = await ProductColor.find();
    res.status(200).json({
      productColors: productColors,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des couleurs de produit",
      details: error.message,
    });
  }
});

router.get("/:productColorId", async (req, res) => {
  const productColorId = Number(req.params.productColorId);

  try {
    const foundProductColor = await ProductColor.findOne({
      id: productColorId,
    });
    if (!foundProductColor) {
      return res.status(404).json({
        error: "La couleur de produit n'a pas été trouvée",
      });
    }

    return res.status(200).json({
      productColor: foundProductColor,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération de la couleur du produit",
      details: error.message,
    });
  }
});

module.exports = router;
