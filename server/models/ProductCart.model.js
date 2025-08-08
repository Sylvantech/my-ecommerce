const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const productCartSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    variant_id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductVariant" },
    quantity: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

productCartSchema.index({ cart_id: 1, variant_id: 1 }, { unique: true });

productCartSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productCartId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const ProductCart = mongoose.model("ProductCart", productCartSchema);
module.exports = ProductCart;
