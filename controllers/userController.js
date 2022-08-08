const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber, userRole, userStatus } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phoneNumber ||
    !userRole ||
    !userStatus
  ) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  //   Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);
  // Create User
  const user = await User.create({
    name,
    email,
    phoneNumber,
    userRole,
    userStatus,
    password: hashedpassword,
    profileImg:
      "https://stockphoto.com/samples/OTM0ODMxNjUwMDAxMWY1YmNmYjBlZA==/MjIxMWY1YmNmYjBlZA==/male-profile-icon-white-on-the-blue-background.jpg",
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userRole: user.userRole,
      userStatus: user.userStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User Couldn't be created");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   User Check
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userRole: user.userRole,
      userStatus: user.userStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});
const getMe = asyncHandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    email,
  });
  res.send("meUser");
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
