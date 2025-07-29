const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");


// GET /api/admin - Vérifier l'authentification administrateur
router.get("/", verifyAdmin, async (req, res) => {
  return res.status(200).json({
    message: "Authentifié en tant qu'administrateur",
    user: req.user,
  });
});

module.exports = router;
