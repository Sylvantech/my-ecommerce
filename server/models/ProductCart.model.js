const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const cartProductSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
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

cartProductSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "cartProductId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const CartProduct = mongoose.model("CartProduct", cartProductSchema);
module.exports = CartProduct;
