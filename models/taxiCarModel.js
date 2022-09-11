const mongoose = require("mongoose");

const taxiCarSchema = mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    multiplier: {
      type: Number,
      required: true,
    },
    carImg: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "SUSPENDED"],
    },
    DriverId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TaxiCar", taxiCarSchema);
