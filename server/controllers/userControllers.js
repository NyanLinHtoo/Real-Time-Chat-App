const {
  registerUserService,
  loginUserService,
} = require("../services/useServices");

const registerUser = (req, res) => {
  registerUserService(req, res);
};

const loginUser = (req, res) => {
  loginUserService(req, res);
};

module.exports = { registerUser, loginUser };
