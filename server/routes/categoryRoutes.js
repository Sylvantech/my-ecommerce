const express = require("express");
const router = express.Router();
const categoryUtils = require("../utils/categoryApiUtils");
const Category = require("../models/Category.model");

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  const isValid = categoryUtils.checkInput(req);
  if (!isValid) {
    return res.status(400).json({
      error: "Données invalides",
    });
  }
  try {
    const newCategory = new Category({
      name,
      description,
    });
    const category = await newCategory.save();

    res.status(201).json({
      message: "Catégorie crée avec succès",
      category: {
        id: category.id,
        name: category.name,
        description: category.description,
        created_at: category.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de la catégorie ",
      details: error.message,
    });
  }
});

router.delete("/", async (req, res) => {
  const id = req.body.id;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({
      error: "Veuillez fournir un ID valide",
    });
  }
  const categoryExists = await Category.findOne({ id: id });
  if (!categoryExists) {
    return res.status(500).json({
      error: "Cette catégorie n'exite pas",
    });
  }
  try {
    await Category.findOneAndDelete({ id: id });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression de la catégorie ",
      details: error.message,
    });
  }
  res.status(200).json({
    message: "Catégorie supprimé avec succès",
  });
});

module.exports = router;
