const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const reviewSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    content: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

reviewSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "reviewId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
