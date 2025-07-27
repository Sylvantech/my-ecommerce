const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/database");
const corsMiddleware = require("./middleware/corsMiddleware");
connectDB();
app.use(corsMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerRoute = require("./routes/swaggerRoute");

app.use("/docs", swaggerRoute);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Routes protégées avec vérification du rôle admin
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Root de l'api qui ne renvoi rien !");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `La documentation de l'API est disponible sur http://localhost:${port}/docs`
  );
});
