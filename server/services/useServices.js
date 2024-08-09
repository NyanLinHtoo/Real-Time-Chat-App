const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

// @desc Register user
// @route Post /api/users/register
// @access public
const registerUserService = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "Email is already taken" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Email must be a valid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be a strong password" });
    }

    user = new userModel({ name, email, password });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = createToken(user._id);

    return res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc Login user
// @route Post /api/users/login
// @access public
const loginUserService = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = createToken(user._id);
    return res
      .status(200)
      .json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// @desc find user
// @route Get /api/users/find/:userId
// @access public
const findUserService = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// @desc get all users
// @route Get /api/users/
// @access public
const getUserService = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUserService,
  loginUserService,
  findUserService,
  getUserService,
};
