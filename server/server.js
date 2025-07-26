const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./config/database");
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/userRoutes");
const swaggerRoute = require("./routes/swaggerRoute");

app.use("/api/user", userRoutes);
app.use("/api-docs", swaggerRoute);

app.get("/", (req, res) => {
  res.send("Root de l'api qui ne renvoi rien !");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on http://localhost:${port}`);
});
