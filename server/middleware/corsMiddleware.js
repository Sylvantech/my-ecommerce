const cors = require("cors");

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Headers",
    "Origin",
    "Accept",
    "X-Requested-With",
  ],
  exposedHeaders: ["Authorization"],
  preflightContinue: true,
  optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
