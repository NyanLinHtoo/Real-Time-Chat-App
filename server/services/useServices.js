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
      res.status(400);
      throw new Error("All Field are required");
    }

    let user = await userModel.findOne({ email });

    if (user) {
      res.status(400);
      throw new Error("Email is already taken");
    }

    if (!validator.isEmail(email)) {
      res.status(400);
      throw new Error("Email must be vaild email");
    }

    if (!validator.isStrongPassword(password)) {
      res.status(400);
      throw new Error("Password must be a strong password");
    }

    user = new userModel({ name, email, password });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
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
      res.status(400);
      throw new Error("Invalid email");
    }

    const isValudPassword = await bcrypt.compare(password, user.password);
    if (!isValudPassword) {
      res.status(400);
      throw new Error("Invalid password");
    }

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { registerUserService, loginUserService };
