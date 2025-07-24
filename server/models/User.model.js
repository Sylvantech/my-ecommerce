const mongoose = require("mongoose");
const crypto = require("crypto");
const Counter = require("./Counter.model");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 255,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    reduction: {
      type: Number,
      default: 0,
      min: 0,
    },
    is_active: {
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
      { _id: "userId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.sequence_value;
  }

  if (this.isModified("password")) {
    this.password = crypto
      .createHash("sha1")
      .update(this.password)
      .digest("hex");
  }

  next();
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ is_active: 1 });

const User = mongoose.model("User", userSchema);
module.exports = User;
