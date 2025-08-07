const mongoose = require("mongoose");

const productColorSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      maxlength: 100,
      trim: true,
    },
    hex_code: {
      type: String,
      maxlength: 7,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

productColorSchema.pre("save", async function (next) {
  if (this.isNew) {
    const Counter = require("./Counter.model");
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productColorId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const ProductColor = mongoose.model("ProductColor", productColorSchema);
module.exports = ProductColor;
