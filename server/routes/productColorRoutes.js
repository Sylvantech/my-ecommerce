const express = require("express");
const router = express.Router();
const ProductColor = require("../models/ProductColor.model");

const { verifyAdmin } = require("../middleware/authMiddleware");
const ProductVariant = require("../models/ProductVariant.model");

router.post("/", verifyAdmin, async (req, res) => {
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


router.delete("/", verifyAdmin, async (req, res) => {
  const id = req.body.id;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({
      error: "Veuillez fournir un ID valide",
    });
  }
  const colorExists = await ProductColor.findOne({ id: id });
  if (!colorExists) {
    return res.status(500).json({
      error: "Cette couleur n'existe pas",
    });
  }

  const products = await ProductVariant.findOne({ color_id: colorExists._id });

  if (products) {
    return res.status(409).json({
      error: "Cette couleur est reliée a un produit ! ",
    });
  }

  try {
    await ProductColor.findOneAndDelete({ id: id });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression de la couleur",
      details: error.message,
    });
  }
  res.status(200).json({
    message: "Couleur supprimée avec succès",
  });
});



router.put("/", async (req, res) => {
  const { id, name, hex } = req.body;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({
      error: "Veuillez fournir un ID valide",
    });
  }

  const colorExists = await ProductColor.findOne({ id: id });
  if (!colorExists) {
    return res.status(500).json({
      error: "Cette couleur n'existe pas",
    });
  }

  const products = await ProductVariant.findOne({ color_id: colorExists._id });

  if (products) {
    return res.status(409).json({
      error: "Cette couleur est reliée a un produit ! ",
    });
  }

  const updateData = {};
  if (name && hex) {
    updateData.name = name;
    updateData.hex_code = hex;
  }

  if (await ProductVariant.findOne({ name: name })) {
    return res.status(400).json({
      error: "Ce nom de couleur est déjà pris",
    });
  }

  if (await ProductVariant.findOne({ hex_code: hex })) {
    return res.status(400).json({
      error: "Ce hex_code de couleur est déjà pris",
    });
  }

  try {
    const updatedProductColor = await ProductColor.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true }
    );
    if (!updatedProductColor) {
      return res.status(404).json({
        error: "La couleur n'a pas été trouvée",
      });
    }
    return res.status(200).json({
      message: "Couleur mise à jour avec succès",
      ProductVariant: updatedProductColor,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la mise à jour de la couleur",
      details: error.message,
    });
  }
});

module.exports = router;
