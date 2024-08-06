const {
  registerUserService,
  loginUserService,
  findUserService,
  getUserService,
} = require("../services/useServices");

const registerUser = (req, res) => {
  registerUserService(req, res);
};

const loginUser = (req, res) => {
  loginUserService(req, res);
};

const findUser = (req, res) => {
  findUserService(req, res);
};

const getUser = (req, res) => {
  getUserService(req, res);
};

module.exports = { registerUser, loginUser, findUser, getUser };
