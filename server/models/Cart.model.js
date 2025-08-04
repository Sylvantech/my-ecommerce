const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const cartSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    anonymous_user_id: {
      type: Number,
      default: null,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

cartSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "cartId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
