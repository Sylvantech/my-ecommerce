const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const productSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        title: {
            type: String,
            required: true,
            maxlength: 255,
            trim: true,
        },
        description: {
            type: String,
            maxlength: 200,
            default: "",
        },
        // category_id: {
        //     type: Number,
        // },
        price: {
            type: mongoose.Types.Decimal128,
            required: true,
            min: 0,
        },
        color: {
            type: String,
            maxlength: 50,
            default: "",
        },
        size: {
            type: String,
            maxlength: 50,
            default: "",
        },
        in_stock: {
            type: Boolean,
            default: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        weight_in_gr: {
            type: Number,
            min: 20,
        },
        is_promo: {
            type: Boolean,
            default: false,
        },
        is_new: {
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

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
