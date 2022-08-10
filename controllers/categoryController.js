const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Category = require("../models/categoryModel");
const getCategories = asyncHandler(async (req, res) => {
  const hotels = await Category.find({ hotel: req.body.hotel_id });
  res.status(200).json(hotels);
});
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ hotel: req.params.id });
  res.status(200).json(categories);
});
const createCategory = asyncHandler(async (req, res) => {
  const { categoryName, price, maxPersons, features, description, hotel } =
    req.body;

  if (!categoryName || !price || !maxPersons) {
    res.status(400);
    throw new Error("All Fields Must be fill");
  }
  const category = await Category.create({
    hotel,
    categoryName,
    price,
    maxPersons,
    features,
    description,
  });
  res.status(200).json(category);
});
module.exports = {
  getCategories,
  createCategory,
  getAllCategories,
};
