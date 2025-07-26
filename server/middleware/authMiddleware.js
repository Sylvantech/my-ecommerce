const jwtUtils = require("../utils/jwtUtils");

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      message: "Accès refusé - Aucun token fourni",
    });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message:
        "Accès refusé - Format de token invalide. Utilisez 'Bearer <token>'",
    });
  }

  const token = authHeader.substring(7);

  if (!token) {
    return res.status(401).json({
      message: "Accès refusé - Aucun token fourni",
    });
  }

  try {
    const verified = jwtUtils.verifyJWTToken(token);

    if (!verified.valid) {
      return res.status(401).json({
        message: "Token invalide",
        error: verified.error,
      });
    }

    req.user = verified.decoded;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Token invalide",
      error: error.message,
    });
  }
};

module.exports = {
  verifyToken,
};
