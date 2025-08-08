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
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const productSizeRoutes = require("./routes/productSizeRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerRoute = require("./routes/swaggerRoute");
const reviewRoute = require("./routes/reviewRoutes");
const cartRoute = require("./routes/cartRoutes");
const productCartRoute = require("./routes/productCartRoutes");
const productColorRoute = require("./routes/productColorRoutes");
const productVariantRoute = require("./routes/productVariantRoutes");

app.use("/docs", swaggerRoute);
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/productSize", productSizeRoutes);
app.use("/api/review", reviewRoute);
app.use("/api/cart", cartRoute);
app.use("/api/productCart", productCartRoute);
app.use("/api/productColor", productColorRoute);
app.use("/api/productVariant", productVariantRoute);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(
    `La documentation de l'API est disponible sur http://localhost:${port}/docs`
  );
});
