const mongoose = require("mongoose");

const taxiBookingnSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    carId: {
      type: String,
      required: [true, "Transaction Id is Field is Required"],
    },
    transactionId: {
      type: String,
      required: true,
    },
    transactionRef: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    pickpDate: {
      type: String,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    originLat: {
      type: Number,
      required: true,
    },
    originLng: {
      type: Number,
      required: true,
    },
    originDesc: {
      type: String,
      required: true,
    },
    destLat: {
      type: Number,
      required: true,
    },
    destLng: {
      type: Number,
      required: true,
    },
    destDesc: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      enum: ["BOOKED", "CONFIRMED", "CHECKEDIN", "CHECKEDOUT", "CANCEL"],
    },
    assignedDriverId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxiBooking", taxiBookingnSchema);
