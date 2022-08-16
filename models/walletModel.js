const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: [true, "Zip Code Field is Required"],
    },
    desc: {
      type: String,
      required: [true, "Description Field is Required"],
    },
    transType: {
      type: String,
      required: [true, "transaction detail Field is Required"],
      enum: ["CREDIT", "DEBIT"],
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallet", walletSchema);
