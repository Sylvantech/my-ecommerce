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

module.exports = router;
