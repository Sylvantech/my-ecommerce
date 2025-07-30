const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const Asset = require("../models/Asset.model");

router.post("/", async (req, res) => {
  const {
    title,
    description,
    category_id,
    price,
    color,
    size,
    in_stock,
    stock,
    weight_in_gr,
    is_promo,
    is_new,
    assetsData,
  } = req.body;
  const assetsId = [];

  const category = await Category.findById(category_id);
  if (!category) {
    return res.status(400).json({
      error: "La catégorie n'existe pas",
    });
  }
  try {
    for (const asset of assetsData) {
      const createdAsset = await Asset.create(asset);
      assetsId.push(createdAsset._id);
    }
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de l'insertion des assets ",
      details: error.message,
    });
  }

  try {
    const newProduct = new Product({
      title,
      description,
      category_id,
      price,
      color,
      size,
      in_stock,
      stock,
      weight_in_gr,
      is_promo,
      is_new,
      assets: assetsId,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Produit crée avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création d'un produit.",
      details: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const allProduct = await Product.find()
      .populate("assets")
      .populate("category_id");
    if (!allProduct || allProduct.length === 0) {
      return res.status(404).json({
        error: "Il n'y a pas de produit",
      });
    }
    return res.status(200).json({
      products: allProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des produits",
      details: error.message,
    });
  }
});

module.exports = router;
