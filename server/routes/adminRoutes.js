const express = require("express");
const router = express.Router();
const { verifyAdmin } = require("../middleware/authMiddleware");

router.use(verifyAdmin);

router.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Authentifié en tant qu'administrateur",
    user: req.user,
  });
});

module.exports = router;
