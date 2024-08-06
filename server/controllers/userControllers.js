const { registerUserService } = require("../services/useServices");

const registerUser = (req, res) => {
  registerUserService(req, res);
};

module.exports = { registerUser };
