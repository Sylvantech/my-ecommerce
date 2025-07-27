const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");

router.use(verifyAdmin);

/**
 * @swagger
 * /api/admin:
 *   get:
 *     summary: Vérifier l'authentification administrateur
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authentifié en tant qu'administrateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentifié en tant qu'administrateur"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: "admin"
 *                     email:
 *                       type: string
 *                       example: "admin@example.com"
 *                     role:
 *                       type: string
 *                       example: "admin"
 *       401:
 *         description: Non autorisé - Token manquant ou invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Accès refusé"
 *       403:
 *         description: Interdit - Privilèges administrateur requis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Privilèges administrateur requis"
 */
router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Authentifié en tant qu'administrateur",
    user: req.user,
  });
});

module.exports = router;
