const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Hotel = require("../models/hotelModel");
const getHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.find({ user: req.user.id });
  res.status(200).json(hotel);
});
const createHotel = asyncHandler(async (req, res) => {
  const {
    hotelName,
    fImg,
    images,
    address,
    state,
    town,
    lat,
    lng,
    description,
    facilities,
    terms,
  } = req.body;

  if (!hotelName || !fImg || !town || !state || !description || !facilities) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const hotelExist = await Hotel.findOne({ user: req.user.id });
  if (hotelExist) {
    res.status(400);
    throw new Error("Hotel Already Exist");
  }
  const hotel = await Hotel.create({
    user: req.user.id,
    hotelName,
    fImg,
    images,
    address,
    state,
    town,
    lat,
    lng,
    description,
    facilities,
    terms,
  });
  if (hotel) {
    await User.findByIdAndUpdate(
      req.user.id,
      { userStatus: "activeHotelAdmin" },
      {
        new: true,
      }
    );
  }
  res.status(200).json(hotel);
});
// const updateGoal = asyncHandler(async (req, res) => {
//   const goal = await Goal.findById(req.params.id);
//   if (!goal) {
//     res.status(400);
//     throw new Error("Goal Not Found");
//   }
//   if (!req.user) {
//     res.status(401);
//     throw new Error("User Not Found now");
//   }

//   // Make Sure the Logged inUser matches the Goal User
//   if (goal.user.toString() !== req.user.id) {
//     res.status(401);
//     throw new Error("User Not Authorized");
//   }

//   const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updatedGoal);
// });

module.exports = {
  getHotel,
  createHotel,
};
