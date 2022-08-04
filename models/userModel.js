const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Field is Required"],
    },
    email: {
      type: String,
      required: [true, "Name Field is Required"],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number Field is Required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Name Field is Required"],
    },
    userRole: {
      type: String,
      default: "user",
      required: true,
    },
    userStatus: {
      type: String,
      default: "active",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
