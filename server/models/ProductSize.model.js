const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const productSizeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    eu_size: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
    },
    label: {
      type: String,
      maxlength: 10,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

productSizeSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productSizeId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const ProductSize = mongoose.model("ProductSize", productSizeSchema);
module.exports = ProductSize;
