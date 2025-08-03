const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const Category = require("../models/Category.model");
const ProductSize = require("../models/ProductSize.model");
const Asset = require("../models/Asset.model");
const Review = require("../models/Review.model");

const { verifyAdmin, verifyToken } = require("../middleware/authMiddleware");

router.post("/getReview", async (req, res) => {
  const productId = req.body.id;
  try {
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({
        error: "Le produit n'a pas été trouvé",
      });
    }

    const reviews = await Review.find({ product_id: product._id });
    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        reviews: [],
        count: 0,
        average: 0,
      });
    }

    let totalRating = 0;
    for (let i = 0; i < reviews.length; i++) {
      totalRating += reviews[i].rating;
    }
    const average = totalRating / reviews.length;

    return res.status(200).json({
      reviews: reviews,
      count: reviews.length,
      average: Math.round(average * 10) / 10,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération des avis du produit",
      details: error.message,
    });
  }
});

router.post("/", verifyAdmin, async (req, res) => {
  const {
    title,
    description,
    category_id,
    price,
    color,
    composition,
    size,
    in_stock,
    stock,
    weight_in_gr,
    is_promo,
    is_new,
    assetsData,
    productSizes,
  } = req.body;
  const assetsId = [];

  for (const productSize of productSizes) {
    const category = await ProductSize.findById(productSize);
    if (!category) {
      return res.status(400).json({
        error: "La taille n'existe pas",
      });
    }
  }

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
      category_id: category._id,
      price,
      color,
      composition,
      size,
      in_stock,
      stock,
      weight_in_gr,
      is_promo,
      is_new,
      assets: assetsId,
      productSizes,
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
  const { limit } = req.body;

  try {
    const query = Product.find().populate("assets").populate("category_id");
    if (limit && limit > 0) {
      query.limit(limit);
    }
    const allProduct = await query.exec();
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

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findOne({ id: id })
      .populate("assets")
      .populate("category_id");
    if (!product) {
      return res.status(404).json({
        error: "La produt n'a pas été trouvée",
      });
    }
    return res.status(200).json({
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la récupération d'un produit",
      details: error.message,
    });
  }
});

router.patch("/", verifyAdmin, async (req, res) => {
  const {
    id,
    title,
    description,
    category_id,
    price,
    color,
    composition,
    size,
    in_stock,
    stock,
    weight_in_gr,
    is_promo,
    is_new,
    assetsData,
    productSizes,
  } = req.body;

  try {
    const product = await Product.findOne({ id: id });
    if (!product) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }

    if (Array.isArray(assetsData)) {
      await Asset.deleteMany({ _id: { $in: product.assets } });
      const newAssets = [];
      for (const asset of assetsData) {
        const createdAsset = await Asset.create(asset);
        newAssets.push(createdAsset._id);
      }
      product.assets = newAssets;
    }

    if (Array.isArray(productSizes)) {
      for (const sizeId of productSizes) {
        const sizeExists = await ProductSize.findById(sizeId);
        if (!sizeExists) {
          return res
            .status(400)
            .json({ error: `La taille ${sizeId} n'existe pas` });
        }
      }
      product.productSizes = productSizes;
    }

    if (title !== undefined) product.title = title;
    if (description !== undefined) product.description = description;
    if (category_id !== undefined) product.category_id = category_id;
    if (price !== undefined) product.price = price;
    if (color !== undefined) product.color = color;
    if (composition !== undefined) product.comosition = composition;
    if (size !== undefined) product.size = size;
    if (in_stock !== undefined) product.in_stock = in_stock;
    if (stock !== undefined) product.stock = stock;
    if (weight_in_gr !== undefined) product.weight_in_gr = weight_in_gr;
    if (is_promo !== undefined) product.is_promo = is_promo;
    if (is_new !== undefined) product.is_new = is_new;

    await product.save();
    res.status(200).json({ message: "Produit mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de la mise à jour du produit",
      details: error.message,
    });
  }
});

router.delete("/", verifyAdmin, async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({
      error: "Veuillez fournir un ID de produit valide",
    });
  }
  const productExists = await Product.findOne({ id: id });
  if (!productExists) {
    return res.status(404).json({
      error: "Ce produit n'existe pas",
    });
  }
  try {
    await Asset.deleteMany({ _id: { $in: productExists.assets } });
    await Product.findOneAndDelete({ id: id });
    res.status(200).json({
      message: "Produit supprimé avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression du produit",
      details: error.message,
    });
  }
});

module.exports = router;
