const mongoose = require("mongoose");

const productVariantSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    color_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductColor",
    },
    size_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ProductSize",
    },
    stock: {
      type: Number,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

productVariantSchema.index(
  { product_id: 1, color_id: 1, size_id: 1 },
  { unique: true }
);

productVariantSchema.pre("save", async function (next) {
  if (this.isNew) {
    const Counter = require("./Counter.model");
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productVariantId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const ProductVariant = mongoose.model("ProductVariant", productVariantSchema);
module.exports = ProductVariant;
