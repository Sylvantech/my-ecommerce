const mongoose = require("mongoose");
const Counter = require("./Counter.model");

const productSizeSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            unique: true,
        },
        size: {
            type: String,
            required: true,
            unique: true,
            maxlength: 20,
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
