const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("../utils/swagger");

const router = express.Router();

const swaggerOptions = {
  explorer: true,
  customCss: ".swagger-ui .topbar { display: none }",
  customSiteTitle: "E-commerce API Documentation",
};

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(swaggerSpecs, swaggerOptions));

// Route pour obtenir le JSON de spécification
router.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});

module.exports = router;
