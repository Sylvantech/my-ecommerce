const express = require("express");
const router = express.Router();
const userUtils = require("../utils/userApiUtils");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwtUtils = require("../utils/jwtUtils");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const isValid = userUtils.checkInputRegister(req);
  const isValidEmail = userUtils.isValidEmail(email);
  const isValidPassword = userUtils.isValidPassword(password);

  if (!isValid) {
    return res.status(400).json({
      error: "Données invalides",
    });
  }

  if (!isValidEmail) {
    return res.status(400).json({
      error: "L'email est invalide",
    });
  }

  if (!isValidPassword) {
    return res.status(400).json({
      error: "Le mot de passe est invalide",
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

router.get("/", async (req, res) => {
  const { email, password } = req.body;

  const isValid = userUtils.checkInputLogin(req);

  if (!isValid) {
    return res.status(400).json({
      error: "Données invalides",
    });
  }

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Mot de passe incorrect",
      });
    }

    const tokenData = jwtUtils.generateJWTToken(existingUser);

    res.status(200).json({
      message: "Utilisateur authentifié avec succès",
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        role: existingUser.role,
        reduction: existingUser.reduction,
        is_active: existingUser.is_active,
        updated_at: existingUser.updated_at,
      },
      token: tokenData.JWTToken,
      expiresAt: tokenData.ExpirationDate,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de l'authentification",
      details: error.message,
    });
  }
});

router.put("/", async (req, res) => {
  const { id, username, email, password, role, reduction, is_active } =
    req.body;

  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({
      error: "ID utilisateur requis et valide",
    });
  }

  try {
    const existingUser = await User.findOne({ id: id });
    if (!existingUser) {
      return res.status(404).json({
        error: "Utilisateur non trouvé",
      });
    }

    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;
    if (role && ["user", "admin"].includes(role)) updateData.role = role;
    if (reduction !== undefined)
      updateData.reduction = Math.max(0, Number(reduction));
    if (is_active !== undefined) updateData.is_active = Boolean(is_active);

    const updatedUser = await User.findOneAndUpdate({ id: id }, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Utilisateur mis à jour avec succès",
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        reduction: updatedUser.reduction,
        is_active: updatedUser.is_active,
        updated_at: updatedUser.updated_at,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        error: "Email ou nom d'utilisateur déjà utilisé",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        error: "Données invalides",
        details: Object.values(error.errors).map(err => err.message),
      });
    }

    return res.status(500).json({
      error: "Erreur lors de la mise à jour",
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
  } catch (error) {
    return res.status(500).json({
      error: "Erreur lors de la suppression de l'utilisateur ",
      details: error.message,
    });
  }
  res.status(200).json({
    message: "Utilisateur supprimé avec succès",
  });
});

module.exports = router;
