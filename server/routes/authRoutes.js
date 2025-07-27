const express = require("express");
const RefreshToken = require("../models/refreshToken.model");
const User = require("../models/User.model");
const { generateJWTToken } = require("../utils/jwtUtils");
const router = express.Router();

router.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      error: "Accès refusé - Aucun token fourni",
    });
  }

  try {
    const validRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
      expires_at: { $gt: new Date() },
    });

    if (!validRefreshToken) {
      return res.status(403).json({
        message: "Le token n'existe pas ou a expiré",
      });
    }

    const user = await User.findOne({ id: validRefreshToken.user_id });

    if (!user) {
      return res.status(404).json({
        message: "Utilisateur non trouvé",
      });
    }

    const newTokenData = generateJWTToken(user);

    return res.status(200).json({
      message: "Token renouvelé avec succès",
      token: newTokenData.JWTToken,
      expiresAt: newTokenData.ExpirationDate,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erreur serveur lors du renouvellement du token",
      error: error.message,
    });
  }
});

module.exports = router;
