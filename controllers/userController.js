const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const UserOtherInfo = require("../models/userOtherInfo");
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    phoneNumber,
    userRole,
    userStatus,
    profileImg,
  } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    !phoneNumber ||
    !userRole ||
    !profileImg ||
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
    profileImg,
  });
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profileImg: user.profileImg,
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
      profileImg: user.profileImg,
      userRole: user.userRole,
      userStatus: user.userStatus,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password");
  }
});

const createUserOtherInfo = asyncHandler(async (req, res) => {
  const { gender, address, state, town, zipCode } = req.body;

  if (!gender || !address || !state || !town) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const userInfoExist = await UserOtherInfo.findOne({ user: req.user.id });
  if (userInfoExist) {
    res.status(400);
    throw new Error("User Info Already Exist");
  }
  // Create User Info
  const userInfo = await UserOtherInfo.create({
    user: req.user.id,
    gender,
    address,
    state,
    town,
    zipCode,
  });
  if (userInfo) {
    res.status(201).send("User Information added Successfully");
  } else {
    res.status(400);
    throw new Error("User Info Couldn't be added");
  }
});
// UPdating Personal Info
const onUpdatePersonalInfo = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, userId } = req.body;

  if (!name || !email || !phoneNumber || !userId) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { name, email, phoneNumber },
    {
      new: true,
    }
  );
  res.status(201).send(user);
});
// UPdating User Info
const onUpdateUserInfo = asyncHandler(async (req, res) => {
  const { gender, address, state, town, zipCode, otherInfoID } = req.body;

  if (!gender || !address || !state || !town) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const userInfo = await UserOtherInfo.findByIdAndUpdate(
    otherInfoID,
    { gender, address, state, town, zipCode },
    {
      new: true,
    }
  );
  res.status(201).send(userInfo);
});
// Upating Profile Image
const onUpdateProfileImg = asyncHandler(async (req, res) => {
  const { userId, profileImg } = req.body;

  if (!userId || !profileImg) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { profileImg },
    {
      new: true,
    }
  );
  res.status(201).send(user);
});
const getOtherInfo = asyncHandler(async (req, res) => {
  const userInfo = await UserOtherInfo.findOne({ user: req.user.id });
  res.status(200).json(userInfo);
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
// Get User Info
const getUserInfo = asyncHandler(async (req, res) => {
  const userInfo = await User.findById(req.params.id);
  res.status(200).json(userInfo);
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
  createUserOtherInfo,
  getOtherInfo,
  getUserInfo,
  onUpdatePersonalInfo,
  onUpdateProfileImg,
  onUpdateUserInfo,
};
