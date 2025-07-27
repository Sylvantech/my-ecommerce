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

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Root de l'api qui ne renvoi rien !");
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on http://localhost:${port}`);
});
