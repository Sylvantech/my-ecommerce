const express = require("express");
const router = express.Router();
const userUtils = require("../utils/userApiUtils");
const User = require("../models/User.model");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const isValid = userUtils.checkInputRegister(req);
  if (!isValid) {
    return res.status(400).json({
      error: "Données invalides",
    });
  }
  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    const user = await newUser.save();

    res.status(201).json({
      message: "Utilisateur crée avec succès",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la création de l'utilisateur ",
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
  try {
    await User.findOneAndDelete({ id: id });
    res.status(200).json({
      message: "Utilisateur supprimé avec succès",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression de l'utilisateur ",
      details: error.message,
    });
  }
});

module.exports = router;
