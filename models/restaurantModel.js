const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    restaurantName: {
      type: String,
      required: [true, "Name Field is Required"],
    },
    fImg: {
      type: String,
      required: [true, "Image Field is Required"],
    },
    images: {
      type: [String],
    },
    address: {
      type: String,
      required: [true, "Address Field is Required"],
    },
    state: {
      type: String,
      required: [true, "State Field is Required"],
    },
    town: {
      type: String,
      required: [true, "Town Field is Required"],
    },
    openDaysStart: {
      type: String,
      required: [true, "Open Days Field is Required"],
    },
    openDaysEnd: {
      type: String,
      required: [true, "Open Days Field is Required"],
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "About the Restaurant is Required"],
    },
    facilities: {
      type: [String],
    },
    terms: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
