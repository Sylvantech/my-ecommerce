const express = require("express");
const router = express.Router();
const ProductSize = require("../models/ProductSize.model");
const { verifyAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyAdmin, async (req, res) => {
  const { size } = req.body;

  if (typeof size !== "string" || size.length > 10 || size.length < 2) {
    return res.status(400).json({
      error: "Format de la taille incompatible ",
    });
  }

  try {
    const newProductSize = new ProductSize({
      size,
    });
    const productSize = await newProductSize.save();

    res.status(201).json({
      message: "Taille de produit créée avec succès",
      productSize: {
        id: productSize.id,
        size: productSize.size,
        created_at: productSize.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de la taille du produit ",
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
      error: "Erreur lors de la récupération des produits ",
      details: error.message,
    });
  }
});

router.get("/:productSize", async (req, res) => {
  const productSize = req.params.productSize;
  
  try {
    const foundProductSize = await ProductSize.findOne({ id: productSize });
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
})

module.exports = router;
