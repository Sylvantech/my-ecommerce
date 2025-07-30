const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const assetSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

assetSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "assetId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const Asset = mongoose.model("Asset", assetSchema);
module.exports = Asset;
